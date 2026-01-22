import { state } from '../../app.state';
import { input } from '../helpers/createInput';
import { error } from '../helpers/createError';

export function renderDeclarations(form: HTMLFormElement) {
  //Information Accurate
  const infoLabel = document.createElement('label');
  const infoChk = input('checkbox');
  infoChk.checked = state.form.infoAccurate;

   infoChk.addEventListener('change', () => {
    state.form.infoAccurate = infoChk.checked;
  });

  infoLabel.append(
    infoChk,
    document.createTextNode(' Information provided is accurate *')
  );

  const infoErr = error();
  form.append(infoLabel, infoErr);

  //Terms Check
  const termsLabel = document.createElement('label');
  const termsChk = input('checkbox');
  termsChk.checked = state.form.termsAccepted;

   termsChk.addEventListener('change', () => {
    state.form.termsAccepted = termsChk.checked;
  });

  termsLabel.append(
    termsChk,
    document.createTextNode(' I accept terms & conditions *')
  );

  const termsErr = error();
  form.append(termsLabel, termsErr);

  //Submit/Update Btn
  const btnWrap = document.createElement('div');
  btnWrap.className = 'submit-wrapper';

  const btn = document.createElement('button');
  btn.type = 'submit';
  btn.textContent = state.form.editId
    ? 'Update'
    : 'Submit Application';

  btnWrap.appendChild(btn);
  form.appendChild(btnWrap);

  return {
    infoAccurate: infoErr,
    termsAccepted: termsErr
  };
}