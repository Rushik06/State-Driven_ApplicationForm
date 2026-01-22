import { state } from '../../app.state';
import type { CreditScore } from '../../types/credit-score.type';

import { fieldset } from '../helpers/createFieldset';
import { label } from '../helpers/createLable';
import { input } from '../helpers/createInput';
import { select } from '../helpers/createSelect';
import { error } from '../helpers/createError';

export function renderLoanRequirements(form: HTMLFormElement) {
  const fs = fieldset('Loan Requirements', form);

  //LOAN AMOUNT
  const loanAmount = input(
    'number',
    state.form.loanAmount !== null ? String(state.form.loanAmount) : ''
  );
  const loanAmountErr = error();
  fs.append(label('Loan Amount Required *'), loanAmount, loanAmountErr);

  loanAmount.addEventListener('input', () => {
    state.form.loanAmount = loanAmount.value ? Number(loanAmount.value) : null;
  });

  //LOAN PURPOSE
  const loanPurpose = select(
    ['HOME', 'PERSONAL', 'EDUCATION'],
    state.form.loanPurpose
  );
  const loanPurposeErr = error();
  fs.append(label('Loan Purpose *'), loanPurpose, loanPurposeErr);

  loanPurpose.addEventListener('change', () => {
    state.form.loanPurpose = loanPurpose.value as any;
  });

  //LOAN TENURE
  const tenure = select(
    ['12', '24', '36', '48', '60'],
    state.form.loanTenure !== null
      ? String(state.form.loanTenure)
      : null
  );
  const tenureErr = error();
  fs.append(label('Loan Tenure (Months)'), tenure, tenureErr);

 tenure.addEventListener('change', () => {
  state.form.loanTenure = tenure.value ? Number(tenure.value) : null;
  });

 //Exsisting Check
  const existingLabel = document.createElement('label');
  const existingChk = input('checkbox');
  existingChk.checked = state.form.existingLoans;

  existingChk.addEventListener('change', () => {
    state.form.existingLoans = existingChk.checked;
  });

  existingLabel.append(
    existingChk,
    document.createTextNode(' I have existing loans')
  );
  fs.append(existingLabel);

  //Credit Score
  const creditScores: readonly CreditScore[] = [
    'Below 650',
    '650-750',
    '750+'
  ];

  const creditGroup = document.createElement('div');
  creditGroup.className = 'radio';
  const creditErr = error();

  creditScores.forEach(score => {
    const item = document.createElement('label');
    item.className = 'radio-item';

    const radio = input('radio');
    radio.name = 'creditScore';
    radio.checked = state.form.creditScore === score;

    radio.addEventListener('change', () => {
      state.form.creditScore = score;
    });

    item.append(radio, document.createTextNode(` ${score}`));
    creditGroup.appendChild(item);
  });

  fs.append(label('Credit Score (Optional)'), creditGroup, creditErr);

  return {
    loanAmount: loanAmountErr,
    loanPurpose: loanPurposeErr,
    loanTenure: tenureErr
  };
}