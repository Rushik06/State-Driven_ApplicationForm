export function input(
  type: string,
  value = ''
): HTMLInputElement {
  const el = document.createElement('input');
  el.type = type;
  el.value = value;
  return el;
}
