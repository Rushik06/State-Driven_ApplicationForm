import { useMemo } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { useThemeStore } from './theme';

export function AppThemeProvider({ children }: { children: React.ReactNode }) {
  const themeMode = useThemeStore((s) => s.theme);

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: themeMode,
          primary: {
            main: '#2563eb'
          },
          background: {
            default: themeMode === 'dark' ? '#020617' : '#f8fafc',
            paper: themeMode === 'dark' ? '#020617' : '#ffffff'
          }
        }
      }),
    [themeMode]
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}