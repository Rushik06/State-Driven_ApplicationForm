import { appStore } from '../../app.state';
import type { CreditScore } from '../../types/credit-score.type';
import type { LoanPurpose } from '../../types/loan-purpose.type';

import { fieldset } from '../helpers/createFieldset';
import { label } from '../helpers/createLable';
import { input } from '../helpers/createInput';
import { select } from '../helpers/createSelect';
import { error } from '../helpers/createError';
import { validateField } from '../../App-logic/field';

export function renderLoanRequirements(form: HTMLFormElement) {
  const fs = fieldset('Loan Requirements', form);
  const formState = appStore.get('form');

  // Loan Amount
  const loanAmount = input(
    'number',
    formState.loanAmount !== null ? String(formState.loanAmount) : ''
  );
  const loanAmountErr = error();
  fs.append(label('Loan Amount Required *'), loanAmount, loanAmountErr);

  loanAmount.addEventListener('input', () => {
    const value = loanAmount.value ? Number(loanAmount.value) : null;

    const updatedForm = {
      ...appStore.get('form'),
      loanAmount: value,
    };

    appStore.set('form', updatedForm);
    loanAmountErr.textContent = validateField('loanAmount', value, updatedForm);
  });

  // Loan Purpose
  const loanPurpose = select(['HOME', 'PERSONAL', 'EDUCATION'], formState.loanPurpose);
  const loanPurposeErr = error();
  fs.append(label('Loan Purpose *'), loanPurpose, loanPurposeErr);

  loanPurpose.addEventListener('change', () => {
    const value = loanPurpose.value ? (loanPurpose.value as LoanPurpose) : null;

    const updatedForm = {
      ...appStore.get('form'),
      loanPurpose: value,
    };

    appStore.set('form', updatedForm);
    loanPurposeErr.textContent = validateField('loanPurpose', value, updatedForm);
  });

  // Loan Tenure
  const tenure = select(
    ['12', '24', '36', '48', '60'],
    formState.loanTenure !== null ? String(formState.loanTenure) : null
  );
  const tenureErr = error();
  fs.append(label('Loan Tenure (Months)'), tenure, tenureErr);

  tenure.addEventListener('change', () => {
    const value = tenure.value ? Number(tenure.value) : null;

    const updatedForm = {
      ...appStore.get('form'),
      loanTenure: value,
    };

    appStore.set('form', updatedForm);
  });

  // Existing Loans (checkbox)
  const existingLabel = document.createElement('label');
  const existingChk = input('checkbox');
  existingChk.checked = formState.existingLoans;

  existingChk.addEventListener('change', () => {
    const updatedForm = {
      ...appStore.get('form'),
      existingLoans: existingChk.checked,
    };

    appStore.set('form', updatedForm);
  });

  existingLabel.append(existingChk, document.createTextNode(' I have existing loans'));
  fs.append(existingLabel);

  // Credit Score
  const creditScores: readonly CreditScore[] = ['Below 650', '650-750', '750+'];

  const creditGroup = document.createElement('div');
  creditGroup.className = 'radio';
  const creditErr = error();

  creditScores.forEach((score) => {
    const item = document.createElement('label');
    item.className = 'radio-item';

    const radio = input('radio');
    radio.name = 'creditScore';
    radio.checked = appStore.get('form').creditScore === score;

    radio.addEventListener('change', () => {
      const updatedForm = {
        ...appStore.get('form'),
        creditScore: score,
      };

      appStore.set('form', updatedForm);
    });

    item.append(radio, document.createTextNode(` ${score}`));
    creditGroup.appendChild(item);
  });

  fs.append(label('Credit Score (Optional)'), creditGroup, creditErr);

  return {
    loanAmount: loanAmountErr,
    loanPurpose: loanPurposeErr,
    loanTenure: tenureErr,
  };
}
