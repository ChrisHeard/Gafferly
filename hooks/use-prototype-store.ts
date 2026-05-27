"use client";

import { useCallback, useEffect, useSyncExternalStore } from "react";

import {
  appendEvent,
  getPrototypeClientSnapshot,
  getPrototypeServerSnapshot,
  hydratePrototypeState,
  resetPrototype,
  setPrototypeState,
  subscribePrototypeStore,
} from "@/lib/prototype/store";
import type { AuditEvent, PrototypeState } from "@/lib/prototype/types";

export const usePrototypeStore = () => {
  const snapshot = useSyncExternalStore(
    subscribePrototypeStore,
    getPrototypeClientSnapshot,
    getPrototypeServerSnapshot,
  );

  useEffect(() => {
    hydratePrototypeState();
  }, []);

  const updateState = useCallback((state: PrototypeState) => {
    setPrototypeState(state);
  }, []);

  const reset = useCallback(() => {
    resetPrototype();
  }, []);

  const appendAuditEvent = useCallback((event: AuditEvent) => {
    appendEvent(event);
  }, []);

  return {
    hasHydrated: snapshot.hasHydrated,
    state: snapshot.state,
    setPrototypeState: updateState,
    resetPrototype: reset,
    appendEvent: appendAuditEvent,
  };
};
