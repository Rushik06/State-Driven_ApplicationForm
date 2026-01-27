type Listener = () => void;
export class Store<T extends Record<string, unknown>> {
  private state: T;
  private listeners: Map<keyof T, Set<Listener>>;

  constructor(initialState: T) {
    this.state = initialState;
    this.listeners = new Map();
  }

  get<K extends keyof T>(key: K): T[K] {
    return this.state[key];
  }

  set<K extends keyof T>(key: K, value: T[K]): void {
    this.state[key] = value;
    this.notify(key);
  }
  subscribe<K extends keyof T>(key: K, listener: Listener): void {
    if (!this.listeners.has(key)) {
      this.listeners.set(key, new Set());
    }
    this.listeners.get(key)!.add(listener);
  }

  unsubscribe<K extends keyof T>(key: K, listener: Listener): void {
    this.listeners.get(key)?.delete(listener);
  }
  private notify<K extends keyof T>(key: K): void {
    this.listeners.get(key)?.forEach((listener) => listener());
  }
}
