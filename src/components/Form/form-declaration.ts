import { appStore } from '../../app.state';
import { input } from '../helpers/createInput';
import { error } from '../helpers/createError';
import { validateField } from '../../App-logic/field';

export function renderDeclarations(form: HTMLFormElement) {
  const formState = appStore.get('form');

  // Information Accurate
  const infoLabel = document.createElement('label');
  const infoChk = input('checkbox');
  infoChk.checked = formState.infoAccurate;

  const infoErr = error();

  infoChk.addEventListener('change', () => {
    const updatedForm = {
      ...appStore.get('form'),
      infoAccurate: infoChk.checked,
    };

    appStore.set('form', updatedForm);
    infoErr.textContent = validateField('infoAccurate', infoChk.checked, updatedForm);
  });

  infoLabel.append(infoChk, document.createTextNode(' Information provided is accurate *'));

  form.append(infoLabel, infoErr);

  // Terms & Conditions
  const termsLabel = document.createElement('label');
  const termsChk = input('checkbox');
  termsChk.checked = formState.termsAccepted;

  const termsErr = error();

  termsChk.addEventListener('change', () => {
    const updatedForm = {
      ...appStore.get('form'),
      termsAccepted: termsChk.checked,
    };

    appStore.set('form', updatedForm);
    termsErr.textContent = validateField('termsAccepted', termsChk.checked, updatedForm);
  });

  termsLabel.append(termsChk, document.createTextNode(' I accept terms & conditions *'));

  form.append(termsLabel, termsErr);

  // Submit / Update Button
  const btnWrap = document.createElement('div');
  btnWrap.className = 'submit-wrapper';

  const btn = document.createElement('button');
  btn.type = 'submit';
  btn.textContent = formState.editId ? 'Update' : 'Submit Application';

  btnWrap.appendChild(btn);
  form.appendChild(btnWrap);

  return {
    infoAccurate: infoErr,
    termsAccepted: termsErr,
  };
}
