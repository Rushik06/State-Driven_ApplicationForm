import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './App.css';
import App from './app';
import { ToastProvider } from './context/toast-context';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ToastProvider>
      <App />
    </ToastProvider>
  </StrictMode>
);