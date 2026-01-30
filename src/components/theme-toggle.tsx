import { Switch, FormControlLabel } from '@mui/material';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import { useThemeStore } from '../theme/theme';

export function ThemeToggle() {
  const theme = useThemeStore((s) => s.theme);
  const toggleTheme = useThemeStore((s) => s.toggleTheme);

  const isDark = theme === 'dark';

  return (
    <FormControlLabel
      control={
        <Switch
          checked={isDark}
          onChange={toggleTheme}
        />
      }
      label={isDark ? <DarkModeIcon /> : <LightModeIcon />}
    />
  );
}