import { state } from '../../app.state';
import { fieldset } from '../helpers/createFieldset';
import { label } from '../helpers/createLable';
import { input } from '../helpers/createInput';
import { error } from '../helpers/createError';
import { validateField } from '../../App-logic/field';

export function renderIdentityDetails(form: HTMLFormElement) {
  const fs = fieldset('Identity Details', form);

  const pan = input('text', state.form.pan);
  const panErr = error();
  fs.append(label('PAN Number *'), pan, panErr);
  pan.addEventListener('input', () => {
    pan.value = pan.value.toUpperCase().slice(0, 10);
    state.form.pan = pan.value;
    panErr.textContent = validateField('pan', pan.value, state.form);
  });

  const aadhaar = input('tel', state.form.aadhaar);
  const aadhaarErr = error();
  fs.append(label('Aadhaar Number *'), aadhaar, aadhaarErr);
  aadhaar.addEventListener('input', () => {
    aadhaar.value = aadhaar.value.replace(/\D/g, '').slice(0, 12);
    state.form.aadhaar = aadhaar.value;
    aadhaarErr.textContent = validateField('aadhaar', aadhaar.value, state.form);
  });

  return {
    pan: panErr,
    aadhaar: aadhaarErr,
  };
}
