import { appStore } from '../../app.state';
import type { BankAccountType } from '../../types/bank-account.type';

import { fieldset } from '../helpers/createFieldset';
import { label } from '../helpers/createLable';
import { input } from '../helpers/createInput';
import { select } from '../helpers/createSelect';
import { error } from '../helpers/createError';
import { validateField } from '../../App-logic/field';

export function renderBankingAndDocuments(form: HTMLFormElement) {
  const fs = fieldset('Banking & Documents', form);
  const formState = appStore.get('form');

  // Bank Account Type
  const bankTypes: readonly BankAccountType[] = ['SAVINGS', 'CURRENT'];
  const bankType = select(bankTypes, formState.bankAccountType);
  const bankErr = error();

  fs.append(label('Bank Account Type *'), bankType, bankErr);

  bankType.onchange = () => {
    const value = bankType.value ? (bankType.value as BankAccountType) : null;

    const updatedForm = {
      ...appStore.get('form'),
      bankAccountType: value,
    };

    appStore.set('form', updatedForm);
  };

  // Upload Salary Slip
  const salarySlip = input('file');
  salarySlip.accept = '.pdf,.jpg,.png';
  const salaryErr = error();

  fs.append(label('Upload Salary Slip *'), salarySlip, salaryErr);

  salarySlip.addEventListener('change', () => {
    const value = salarySlip.files?.[0] ?? null;

    const updatedForm = {
      ...appStore.get('form'),
      salarySlip: value,
    };

    appStore.set('form', updatedForm);
    salaryErr.textContent = validateField('salarySlip', value, updatedForm);
  });

  // Upload Bank Statement
  const bankStmt = input('file');
  bankStmt.accept = '.pdf,.jpg,.png';
  const bankStmtErr = error();

  fs.append(label('Upload Bank Statement *'), bankStmt, bankStmtErr);

  bankStmt.addEventListener('change', () => {
    const value = bankStmt.files?.[0] ?? null;

    const updatedForm = {
      ...appStore.get('form'),
      bankStatement: value,
    };

    appStore.set('form', updatedForm);
    bankStmtErr.textContent = validateField('bankStatement', value, updatedForm);
  });

  return {
    bankAccountType: bankErr,
    salarySlip: salaryErr,
    bankStatement: bankStmtErr,
  };
}
