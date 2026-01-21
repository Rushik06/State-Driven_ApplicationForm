import { state } from '../app.state';
import { fieldset } from './helpers/createFieldset';
import { label } from './helpers/createLable';
import { input } from './helpers/createInput';
import { error } from './helpers/createError';


export function renderIdentityDetails(form: HTMLFormElement) {
  const fs = fieldset('Identity Details', form);

  const pan = input('text', state.form.pan);
  const panErr = error();
  fs.append(label('PAN Number *'), pan, panErr);
  pan.oninput = () => (state.form.pan = pan.value.toUpperCase());

  const aadhaar = input('tel', state.form.aadhaar);
  const aadhaarErr = error();
  fs.append(label('Aadhaar Number *'), aadhaar, aadhaarErr);
  aadhaar.oninput = () => (state.form.aadhaar = aadhaar.value);

  return { panErr, aadhaarErr };
}