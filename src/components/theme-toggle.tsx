import { useTheme } from '../utils/theme';

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  const isDark = theme === 'dark';

  return (
    <label className="theme-toggle">
      <input
        type="checkbox"
        checked={isDark}
        onChange={toggleTheme}
      />
      <span>{isDark ? 'Light Mode' : 'Dark Mode'}</span>
    </label>
  );
}