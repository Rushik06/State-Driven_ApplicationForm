import { loadFromStorage } from './app.storage';
import { renderApp } from './components/app';

document.addEventListener('DOMContentLoaded', (): void => {
  loadFromStorage();
  renderApp();
});
