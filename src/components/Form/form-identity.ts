import { appStore } from '../../app.state';
import { fieldset } from '../helpers/createFieldset';
import { label } from '../helpers/createLable';
import { input } from '../helpers/createInput';
import { error } from '../helpers/createError';
import { validateField } from '../../App-logic/field';

export function renderIdentityDetails(form: HTMLFormElement) {
  const fs = fieldset('Identity Details', form);
  const formState = appStore.get('form');

  // PAN
  const pan = input('text', formState.pan);
  const panErr = error();
  pan.placeholder = 'ABCDE1234F';

  fs.append(label('PAN Number *'), pan, panErr);

  pan.addEventListener('input', () => {
    pan.value = pan.value.toUpperCase().slice(0, 10);

    const updatedForm = {
      ...appStore.get('form'),
      pan: pan.value,
    };

    appStore.set('form', updatedForm);
    panErr.textContent = validateField('pan', pan.value, updatedForm);
  });

  // Aadhaar
  const aadhaar = input('tel', formState.aadhaar);
  const aadhaarErr = error();

  fs.append(label('Aadhaar Number *'), aadhaar, aadhaarErr);

  aadhaar.addEventListener('input', () => {
    aadhaar.value = aadhaar.value.replace(/\D/g, '').slice(0, 12);

    const updatedForm = {
      ...appStore.get('form'),
      aadhaar: aadhaar.value,
    };

    appStore.set('form', updatedForm);
    aadhaarErr.textContent = validateField('aadhaar', aadhaar.value, updatedForm);
  });

  return {
    pan: panErr,
    aadhaar: aadhaarErr,
  };
}
