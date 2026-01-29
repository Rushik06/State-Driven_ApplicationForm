/* eslint-disable react-refresh/only-export-components */
import { create } from 'zustand';
import type { ReactNode } from 'react';
interface ToastStore {
  message: string | null;
  showToast: (message: string) => void;
  clearToast: () => void;
}
const useToastStore = create<ToastStore>((set) => ({
  message: null,

  showToast: (message: string) => {
    set({ message });
    setTimeout(() => {
      set({ message: null });
    }, 3000);
  },

  clearToast: () => set({ message: null })
}));

export function ToastProvider({ children }: { children: ReactNode }) {
  const message = useToastStore(state => state.message);

  return (
    <>
      {children}
      {message && <Toast message={message} />}
    </>
  );
}

export function useToast() {
  const showToast = useToastStore(state => state.showToast);

  return { showToast };
}

function Toast({ message }: { message: string }) {
  return <div className="toast show">{message}</div>;
}