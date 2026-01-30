import { create } from 'zustand';

export type ThemeMode = 'light' | 'dark';

interface ThemeStore {
  theme: ThemeMode;
  toggleTheme: () => void;
}

export const useThemeStore = create<ThemeStore>((set) => ({
  
  theme: (localStorage.getItem('theme') as ThemeMode) ?? 'light',

  
  toggleTheme: () =>
    set((state) => {
      const next = state.theme === 'dark' ? 'light' : 'dark';
      localStorage.setItem('theme', next);
      return { theme: next };
    })
}));