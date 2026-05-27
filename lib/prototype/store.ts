import { initialPrototypeState } from "./seed";
import type { AuditEvent, PrototypeState } from "./types";

const STORAGE_KEY = "gafferly:prototype-state";

const cloneState = (state: PrototypeState): PrototypeState => {
  if (typeof structuredClone === "function") {
    return structuredClone(state);
  }

  return JSON.parse(JSON.stringify(state)) as PrototypeState;
};

const getSeededState = (): PrototypeState => cloneState(initialPrototypeState);

const parseStoredState = (raw: string | null): PrototypeState | null => {
  if (!raw) return null;

  try {
    return JSON.parse(raw) as PrototypeState;
  } catch {
    return null;
  }
};

const writeState = (state: PrototypeState) => {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
};

export const getPrototypeState = (): PrototypeState => {
  if (typeof window === "undefined") {
    return getSeededState();
  }

  const stored = parseStoredState(window.localStorage.getItem(STORAGE_KEY));

  if (stored) {
    return stored;
  }

  const seeded = getSeededState();
  writeState(seeded);
  return seeded;
};

export const setPrototypeState = (state: PrototypeState): PrototypeState => {
  const nextState = cloneState(state);
  writeState(nextState);
  return nextState;
};

export const resetPrototype = (): PrototypeState => {
  const seeded = getSeededState();
  writeState(seeded);
  return seeded;
};

export const appendEvent = (event: AuditEvent): PrototypeState => {
  const current = getPrototypeState();
  const nextState: PrototypeState = {
    ...current,
    auditEvents: [...current.auditEvents, event],
  };

  return setPrototypeState(nextState);
};
