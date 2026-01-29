/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';

interface ToastContextValue {
  showToast: (message: string) => void;
}

const ToastContext = createContext<ToastContextValue | null>(null);

export function ToastProvider({ children }: { children: ReactNode }) {
  const [message, setMessage] = useState<string | null>(null);

  function showToast(msg: string) {
    setMessage(msg);
    setTimeout(() => setMessage(null), 3000);
  }

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {message && <Toast message={message} />}
    </ToastContext.Provider>
  );
}

export function useToast(): ToastContextValue {
  const ctxt = useContext(ToastContext);
  if (!ctxt) {
    throw new Error('useToast must be used inside ToastProvider');
  }
  return ctxt;
}

function Toast({ message }: { message: string }) {
  return <div className="toast show">{message}</div>;
}