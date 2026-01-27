import { themeUtils } from '../utils/theme';
import { renderApp } from './app';

const theme = themeUtils();

export function ThemeToggle(): HTMLLabelElement {
  const label = document.createElement('label');

  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  checkbox.checked = theme.getTheme() === 'dark';

  const text = document.createElement('span');
  text.textContent = checkbox.checked ? 'Light Mode' : 'Dark Mode';

  checkbox.addEventListener('change', () => {
    theme.toggleTheme();

    text.textContent = checkbox.checked ? 'Light Mode' : 'Dark Mode';

    renderApp();
  });

  label.append(checkbox, text);
  return label;
}
