export function themeUtils() {
  function getTheme(): 'light' | 'dark' {
    return (localStorage.getItem('theme') as 'light' | 'dark') ?? 'light';
  }

  function toggleTheme(): void {
    const next = getTheme() === 'dark' ? 'light' : 'dark';
    localStorage.setItem('theme', next);
  }

  function applyTheme(root: HTMLElement): void {
    root.className = getTheme();
  }

  return {
    getTheme,
    toggleTheme,
    applyTheme
  };
}