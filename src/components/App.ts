export function renderApp(): void {
  const root = document.getElementById('app');

  if (!root) {
    throw new Error('Root element #app not found');
  }

  root.innerHTML = ''; // Clear existing DOM

  const layout: HTMLDivElement = document.createElement('div');
  layout.className = 'app';

  
  layout.appendChild(Form());
  layout.appendChild(Table());

  root.appendChild(layout);
}
