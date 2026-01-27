import { appStore } from '../../app.state';
import { calculateAge } from '../../App-logic/age';
import type { Gender } from '../../types/gender.type';
import { fieldset } from '../helpers/createFieldset';
import { label } from '../helpers/createLable';
import { input } from '../helpers/createInput';
import { error } from '../helpers/createError';
import { validateField } from '../../App-logic/field';
/*import { renderApp } from '../app';*/

export function renderPersonalDetails(form: HTMLFormElement) {
  const fs = fieldset('Personal Details', form);
  const formState = appStore.get('form');

  // Full Name
  const fullNameLbl = label('Full Name *');
  const fullName = input('text', formState.fullName);
  const fullNameErr = error();

  fs.append(fullNameLbl, fullName, fullNameErr);

  fullName.addEventListener('input', () => {
    const updatedForm = {
      ...appStore.get('form'),
      fullName: fullName.value,
    };

    appStore.set('form', updatedForm);

    fullNameErr.textContent = validateField('fullName', fullName.value, updatedForm);
  });

  // Date of Birth
  const dobLbl = label('Date of Birth*');
  const dob = input('date', formState.dob);
  const dobErr = error();

  fs.append(dobLbl, dob, dobErr);

  dob.addEventListener('change', () => {
    const age = calculateAge(dob.value);

    const updatedForm = {
      ...appStore.get('form'),
      dob: dob.value,
      age,
    };

    appStore.set('form', updatedForm);
    ageInput.value = age !== null ? String(age) : '';

    dobErr.textContent = validateField('dob', dob.value, updatedForm);
    /*renderApp();*/
  });

  // Age (readonly)
  const ageInput = input('number', formState.age !== null ? String(formState.age) : '');
  ageInput.id = 'age';
  ageInput.readOnly = true;

  fs.append(label('Age *'), ageInput);

  // Gender
  const genders: readonly Gender[] = ['MALE', 'FEMALE', 'OTHER'];
  const genderGroup = document.createElement('div');
  genderGroup.className = 'radio';
  const genderErr = error();

  genders.forEach((g) => {
    const item = document.createElement('label');
    item.className = 'radio-item';

    const radio = input('radio');
    radio.name = 'gender';
    radio.checked = appStore.get('form').gender === g;

    radio.addEventListener('change', () => {
      const updatedForm = {
        ...appStore.get('form'),
        gender: g,
      };

      appStore.set('form', updatedForm);
      genderErr.textContent = validateField('gender', g, updatedForm);
    });

    item.append(radio, document.createTextNode(` ${g}`));
    genderGroup.appendChild(item);
  });

  fs.append(label('Gender *'), genderGroup, genderErr);

  // Email
  const email = input('email', formState.email);
  const emailErr = error();

  fs.append(label('Email Address *'), email, emailErr);

  email.addEventListener('input', () => {
    const updatedForm = {
      ...appStore.get('form'),
      email: email.value,
    };

    appStore.set('form', updatedForm);
    emailErr.textContent = validateField('email', email.value, updatedForm);
  });

  // Mobile
  const mobile = input('tel', formState.mobile);
  const mobileErr = error();

  fs.append(label('Mobile Number *'), mobile, mobileErr);

  mobile.addEventListener('input', () => {
    mobile.value = mobile.value.replace(/\D/g, '').slice(0, 10);

    const updatedForm = {
      ...appStore.get('form'),
      mobile: mobile.value,
    };

    appStore.set('form', updatedForm);
    mobileErr.textContent = validateField('mobile', mobile.value, updatedForm);
  });

  return {
    fullName: fullNameErr,
    dob: dobErr,
    gender: genderErr,
    email: emailErr,
    mobile: mobileErr,
  };
}
