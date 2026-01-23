export function label(text: string): HTMLLabelElement {
  const l = document.createElement('label');
  l.textContent = text;
  return l;
}