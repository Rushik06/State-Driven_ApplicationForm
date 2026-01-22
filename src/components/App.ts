import{Form}from './Form/Form'
import{Table}from './Table'

export function renderApp(): void {
  const root = document.getElementById('app');

  if (!root) {
    throw new Error('Root element #app not found');
  }

  root.innerHTML = ''; // Clear existing DOM

  const title = document.createElement('h1');
  title.className = 'main-title';
  title.textContent = 'Loan Application Form';

  const layout: HTMLDivElement = document.createElement('div');
  layout.className = 'layout';

  layout.appendChild(Form());
  layout.appendChild(Table());
  
  root.appendChild(title);
  root.appendChild(layout);
}
