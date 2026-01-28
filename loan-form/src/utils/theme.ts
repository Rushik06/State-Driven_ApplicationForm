import { useEffect, useState } from 'react';

export type Theme = 'light' | 'dark';

export function useTheme() {
  const [theme, setTheme] = useState<Theme>(() => {
    return (localStorage.getItem('theme') as Theme) ?? 'light';
  });

  function toggleTheme(): void {
    setTheme(prev => {
      const next = prev === 'dark' ? 'light' : 'dark';
      localStorage.setItem('theme', next);
      return next;
    });
  }

  useEffect(() => {
    document.documentElement.className = theme;
  }, [theme]);

  return {
    theme,
    toggleTheme
  };
}