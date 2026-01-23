export function error(): HTMLSpanElement {
  const e = document.createElement('span');
  e.className = 'error-message';
  return e;
}