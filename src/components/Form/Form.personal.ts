import { state } from '../../app.state';
import { renderApp } from '../App';
import { calculateAge } from '../Validation';
import type { Gender } from '../../types/gender.type';

import { fieldset } from '../helpers/createFieldset';
import { label } from '../helpers/createLable';
import { input } from '../helpers/createInput';
import { error } from '../helpers/createError';

export function renderPersonalDetails(form: HTMLFormElement) {
  const fs = fieldset('Personal Details', form);

  //Full-Name
  
  const fullNameLbl = label('Full Name *');
  const fullName = input('text', state.form.fullName);
  const fullNameErr = error();
  fs.append(fullNameLbl, fullName, fullNameErr);
  fullName.addEventListener('input', () => {
    state.form.fullName = fullName.value;
  });

  //Date-of-Birth
  const dobLbl = label('Date of Birth*');
  const dob = input('date', state.form.dob);
  const dobErr = error();
  fs.append(dobLbl, dob, dobErr);
  dob.addEventListener('change', () => {
    state.form.dob = dob.value;
    state.form.age=calculateAge(dob.value);
    renderApp();
  });

  //AGE(readonly)
  const age = input(
    'number',
    state.form.age !== null ? String(state.form.age) : ''
  );
  age.id = 'age';
  age.readOnly = true;
  fs.append(label('age*'), age);;

  //Gender
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

  //EMAIL
  const email = input('email', state.form.email);
  const emailErr = error();
  fs.append(label('Email Address *'), email, emailErr);
  email.addEventListener('input', () => {
    state.form.email = email.value;
  });

  //Mobile number
  const mobile = input('tel', state.form.mobile);
  const mobileErr = error();
  fs.append(label('Mobile Number *'), mobile, mobileErr);
  mobile.addEventListener('input', () => {
    state.form.mobile = mobile.value;
  });

  return {
    fullName: fullNameErr,
    dob: dobErr,
    gender: genderErr,
    email: emailErr,
    mobile: mobileErr
  };
}