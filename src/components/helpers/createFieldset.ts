export function fieldset(
  title: string,
  form: HTMLFormElement
): HTMLFieldSetElement {
  const fs = document.createElement('fieldset');
  const legend = document.createElement('legend');
  legend.textContent = title;
  fs.appendChild(legend);
  form.appendChild(fs);
  return fs;
}