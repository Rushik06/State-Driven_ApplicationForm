export function select(
  options: readonly string[],
  value: string | null
): HTMLSelectElement {
  const el = document.createElement('select');

  const empty = document.createElement('option');
  empty.value = '';
  empty.textContent = '-- Select --';
  el.appendChild(empty);

  options.forEach(o => {
    const opt = document.createElement('option');
    opt.value = o;
    opt.textContent = o;
    el.appendChild(opt);
  });

  el.value = value ?? '';
  return el;
}