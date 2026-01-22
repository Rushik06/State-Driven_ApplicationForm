import { state } from '../../app.state';
import type { EmploymentType } from '../../types/employment.type';

import { fieldset } from '../helpers/createFieldset';
import { label } from '../helpers/createLable';
import { input } from '../helpers/createInput';
import { select } from '../helpers/createSelect';
import { error } from '../helpers/createError';

export function renderEmployment(form: HTMLFormElement) {
  const fs = fieldset('Employment & Income', form);

  //Employment Type
  const employmentTypes: readonly EmploymentType[] = [
    'SALARIED',
    'SELF_EMPLOYED'
  ];

  const empType = select(employmentTypes, state.form.employmentType);
  const empErr = error();
  fs.append(label('Employment Type *'), empType, empErr);

  empType.addEventListener('change', () => {
    if (employmentTypes.includes(empType.value as EmploymentType)) {
      state.form.employmentType = empType.value as EmploymentType;
    }
  });

  //Company Name
  const company = input('text', state.form.companyName);
  const companyErr = error();
  fs.append(label('Company Name *'), company, companyErr);

  company.addEventListener('input', () => {
    state.form.companyName = company.value;
  });

//Monthly Income
  const income = input(
    'number',
    state.form.monthlyIncome !== null
      ? String(state.form.monthlyIncome)
      : ''
  );
  const incomeErr = error();
  fs.append(label('Monthly Income *'), income, incomeErr);

 income.addEventListener('input', () => {
    state.form.monthlyIncome = income.value ? Number(income.value) : null;
  });

  //Selecct
  const years = select(
    ['0–1 year', '1–3 years', '3+ years'],
    null
  );
  const yearsErr = error();
  fs.append(label('Years in Current Job *'), years, yearsErr);

  years.addEventListener('change', () => {
    state.form.yearsInJob = years.value ? years.selectedIndex + 1 : null;
  });

  //Currently Liabilities
  const liabilities = input(
    'number',
    state.form.liabilities !== null
      ? String(state.form.liabilities)
      : ''
  );

  fs.append(
    label('Current Monthly Liabilities (Optional)'),
    liabilities
  );

  liabilities.addEventListener('input', () => {
    state.form.liabilities = liabilities.value ? Number(liabilities.value) : null;
  });
  

  return {
    employmentType: empErr,
    companyName: companyErr,
    monthlyIncome: incomeErr,
    yearsInJob: yearsErr
  };
}