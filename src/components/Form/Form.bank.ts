import { state } from '../../app.state';
import type { BankAccountType } from '../../types/bank-account.type';

import { fieldset } from '../helpers/createFieldset';
import { label } from '../helpers/createLable';
import { input } from '../helpers/createInput';
import { select } from '../helpers/createSelect';
import { error } from '../helpers/createError';

export function renderBankingAndDocuments(form: HTMLFormElement) {
  const fs = fieldset('Banking & Documents', form);

  //Bank-account Type
  const bankTypes: readonly BankAccountType[] = ['SAVINGS', 'CURRENT'];
  const bankType = select(bankTypes, state.form.bankAccountType);
  const bankErr = error();

  fs.append(label('Bank Account Type *'), bankType, bankErr);

  bankType.onchange = () => {
    state.form.bankAccountType = bankType.value
      ? (bankType.value as BankAccountType)
      : null;
  };

  //Upload Salary Slip
  const salarySlip = input('file');
  salarySlip.accept = '.pdf,.jpg,.png';
  const salaryErr = error();

  fs.append(label('Upload Salary Slip *'), salarySlip, salaryErr);

  salarySlip.addEventListener('change', () => {
    state.form.salarySlip = salarySlip.files?.[0] ?? null;
  });

  //Upload Bank Statement
  const bankStmt = input('file');
  bankStmt.accept = '.pdf,.jpg,.png';
  const bankStmtErr = error();

  fs.append(label('Upload Bank Statement *'), bankStmt, bankStmtErr);

  bankStmt.addEventListener('change', () => {
    state.form.bankStatement = bankStmt.files?.[0] ?? null;
  });

  return {
    bankAccountType: bankErr,
    salarySlip: salaryErr,
    bankStatement: bankStmtErr
  };
}