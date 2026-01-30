import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './App.css';
import App from './app';
import { ToastProvider } from './context/toast-context';
import { AppThemeProvider } from './theme/theme-provider';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AppThemeProvider>
      <ToastProvider>
        <App />
      </ToastProvider>
    </AppThemeProvider>
  </StrictMode>
);