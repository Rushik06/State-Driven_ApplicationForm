import { appStore } from '../../app.state';
import type { EmploymentType } from '../../types/employment.type';

import { fieldset } from '../helpers/createFieldset';
import { label } from '../helpers/createLable';
import { input } from '../helpers/createInput';
import { select } from '../helpers/createSelect';
import { error } from '../helpers/createError';
import { validateField } from '../../App-logic/field';

export function renderEmployment(form: HTMLFormElement) {
  const fs = fieldset('Employment & Income', form);
  const formState = appStore.get('form');

  // Employment Type
  const employmentTypes: readonly EmploymentType[] = ['SALARIED', 'SELF_EMPLOYED'];

  const empType = select(employmentTypes, formState.employmentType);
  const empErr = error();
  fs.append(label('Employment Type *'), empType, empErr);

  empType.addEventListener('change', () => {
    const updatedForm = {
      ...appStore.get('form'),
      employmentType: empType.value as EmploymentType,
    };

    appStore.set('form', updatedForm);
    empErr.textContent = validateField('employmentType', updatedForm.employmentType, updatedForm);
  });

  // Company Name
  const company = input('text', formState.companyName);
  const companyErr = error();
  fs.append(label('Company Name *'), company, companyErr);

  company.addEventListener('input', () => {
    const updatedForm = {
      ...appStore.get('form'),
      companyName: company.value.trim(),
    };

    appStore.set('form', updatedForm);
    companyErr.textContent = validateField('companyName', updatedForm.companyName, updatedForm);
  });

  // Monthly Income
  const income = input(
    'number',
    formState.monthlyIncome !== null ? String(formState.monthlyIncome) : ''
  );
  const incomeErr = error();
  fs.append(label('Monthly Income *'), income, incomeErr);

  income.addEventListener('input', () => {
    const value = income.value ? Number(income.value) : null;

    const updatedForm = {
      ...appStore.get('form'),
      monthlyIncome: value,
    };

    appStore.set('form', updatedForm);
    incomeErr.textContent = validateField('monthlyIncome', value, updatedForm);
  });

  // Years in Current Job
  const years = select(['0–1 year', '1–3 years', '3+ years'], null);
  const yearsErr = error();
  fs.append(label('Years in Current Job *'), years, yearsErr);

  years.addEventListener('change', () => {
    const value = years.value ? years.selectedIndex + 1 : null;

    const updatedForm = {
      ...appStore.get('form'),
      yearsInJob: value,
    };

    appStore.set('form', updatedForm);
    yearsErr.textContent = validateField('yearsInJob', value, updatedForm);
  });

  // Current Liabilities (optional)
  const liabilities = input(
    'number',
    formState.liabilities !== null ? String(formState.liabilities) : ''
  );

  fs.append(label('Current Monthly Liabilities (Optional)'), liabilities);

  liabilities.addEventListener('input', () => {
    const updatedForm = {
      ...appStore.get('form'),
      liabilities: liabilities.value ? Number(liabilities.value) : null,
    };

    appStore.set('form', updatedForm);
  });

  return {
    employmentType: empErr,
    companyName: companyErr,
    monthlyIncome: incomeErr,
    yearsInJob: yearsErr,
  };
}
