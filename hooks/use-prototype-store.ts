"use client";

import { useCallback, useEffect, useSyncExternalStore } from "react";

import { appendEvent, getPrototypeState, resetPrototype, setPrototypeState } from "@/lib/prototype/store";
import type { AuditEvent, PrototypeState } from "@/lib/prototype/types";
import { initialPrototypeState } from "@/lib/prototype/seed";

type PrototypeStoreSnapshot = {
  hasHydrated: boolean;
  state: PrototypeState;
};

const listeners = new Set<() => void>();
let hydratedState: PrototypeState | null = null;

const emitChange = () => {
  for (const listener of listeners) {
    listener();
  }
};

const subscribe = (listener: () => void) => {
  listeners.add(listener);
  return () => listeners.delete(listener);
};

const getServerSnapshot = (): PrototypeStoreSnapshot => ({
  hasHydrated: false,
  state: initialPrototypeState,
});

const getClientSnapshot = (): PrototypeStoreSnapshot => {
  if (!hydratedState) {
    return {
      hasHydrated: false,
      state: initialPrototypeState,
    };
  }

  return {
    hasHydrated: true,
    state: hydratedState,
  };
};

const ensureHydrated = () => {
  if (hydratedState) return;

  hydratedState = getPrototypeState();
  emitChange();
};

export const usePrototypeStore = () => {
  const snapshot = useSyncExternalStore(subscribe, getClientSnapshot, getServerSnapshot);

  useEffect(() => {
    ensureHydrated();
  }, []);

  const updateState = useCallback((state: PrototypeState) => {
    hydratedState = setPrototypeState(state);
    emitChange();
  }, []);

  const reset = useCallback(() => {
    hydratedState = resetPrototype();
    emitChange();
  }, []);

  const appendAuditEvent = useCallback((event: AuditEvent) => {
    hydratedState = appendEvent(event);
    emitChange();
  }, []);

  return {
    hasHydrated: snapshot.hasHydrated,
    state: snapshot.state,
    setPrototypeState: updateState,
    resetPrototype: reset,
    appendEvent: appendAuditEvent,
  };
};
