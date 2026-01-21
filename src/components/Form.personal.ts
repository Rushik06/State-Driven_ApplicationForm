import { state } from '../app.state';
import { renderApp } from './App';
import { calculateAge } from './Validation';
import type { Gender } from '../types/gender.type';

import { fieldset } from './helpers/createFieldset';
import { label } from './helpers/createLable';
import { input } from './helpers/createInput';
import { error } from './helpers/createError';

export function renderPersonalDetails(form: HTMLFormElement) {
  const fs = fieldset('Personal Details', form);

  /* ---------- Full Name ---------- */
  const fullName = input('text', state.form.fullName);
  const fullNameErr = error();
  fs.append(label('Full Name *'), fullName, fullNameErr);
  fullName.oninput = () => {
    state.form.fullName = fullName.value;
  };

  /* ---------- Date of Birth ---------- */
  const dob = input('date', state.form.dob);
  const dobErr = error();
  fs.append(label('Date of Birth *'), dob, dobErr);
  dob.onchange = () => {
    state.form.dob = dob.value;
    state.form.age = calculateAge(dob.value);
    renderApp();
  };

  /* ---------- Age (readonly) ---------- */
  const age = input(
    'number',
    state.form.age !== null ? String(state.form.age) : ''
  );
  age.readOnly = true;
  fs.append(label('Age'), age);

  /* ---------- Gender ---------- */
  const genders: readonly Gender[] = ['MALE', 'FEMALE', 'OTHER'];
  const genderGroup = document.createElement('div');
  genderGroup.className = 'radio';
  const genderErr = error();

  genders.forEach(g => {
    const item = document.createElement('label');
    item.className = 'radio-item';

    const radio = input('radio');
    radio.name = 'gender';
    radio.checked = state.form.gender === g;
    radio.onchange = () => {
      state.form.gender = g;
    };

    item.append(radio, document.createTextNode(` ${g}`));
    genderGroup.appendChild(item);
  });

  fs.append(label('Gender *'), genderGroup, genderErr);

  /* ---------- Email Address ---------- */
  const email = input('email', state.form.email);
  const emailErr = error();
  fs.append(label('Email Address *'), email, emailErr);
  email.oninput = () => {
    state.form.email = email.value;
  };

  /* ---------- Mobile Number ---------- */
  const mobile = input('tel', state.form.mobile);
  const mobileErr = error();
  fs.append(label('Mobile Number *'), mobile, mobileErr);
  mobile.oninput = () => {
    state.form.mobile = mobile.value;
  };

  /* ---------- return error map ---------- */
  return {
    fullName: fullNameErr,
    dob: dobErr,
    gender: genderErr,
    email: emailErr,
    mobile: mobileErr
  };
}