import { useState } from 'react';
import type { BankAccountType } from '../../types/bank-account.type';
import { useApp } from '../../context/app-context';
import { validateField } from '../../App-logic/field';
import { FormSection } from '../helpers/create-feildset';
import { ErrorMessage } from '../helpers/create-error';

export function BankForm() {
  const { state, dispatch } = useApp();
  const form = state.form;

  const [errors, setErrors] = useState({
    bankAccountType: '',
    salarySlip: '',
    bankStatement: ''
  });

  const bankTypes: readonly BankAccountType[] = ['SAVINGS', 'CURRENT'];

  // ---------- Handlers ----------

  function onBankTypeChange(value: string) {
    const v = value ? (value as BankAccountType) : null;

    dispatch({
      type: 'UPDATE_FORM',
      payload: { bankAccountType: v }
    });

    setErrors(e => ({
      ...e,
      bankAccountType: validateField(
        'bankAccountType',
        v,
        { ...form, bankAccountType: v }
      )
    }));
  }

  function onSalarySlipChange(file: File | null) {
    dispatch({
      type: 'UPDATE_FORM',
      payload: { salarySlip: file }
    });

    setErrors(e => ({
      ...e,
      salarySlip: validateField(
        'salarySlip',
        file,
        { ...form, salarySlip: file }
      )
    }));
  }

  function onBankStatementChange(file: File | null) {
    dispatch({
      type: 'UPDATE_FORM',
      payload: { bankStatement: file }
    });

    setErrors(e => ({
      ...e,
      bankStatement: validateField(
        'bankStatement',
        file,
        { ...form, bankStatement: file }
      )
    }));
  }

  // ---------- UI ----------

  return (
    <FormSection title="Banking & Documents">
      {/* Bank Account Type */}
      <label>Bank Account Type *</label>
      <select
        value={form.bankAccountType ?? ''}
        onChange={e => onBankTypeChange(e.target.value)}
      >
        <option value="">-- Select --</option>
        {bankTypes.map(t => (
          <option key={t} value={t}>
            {t}
          </option>
        ))}
      </select>
      <ErrorMessage message={errors.bankAccountType} />

      {/* Salary Slip */}
      <label>Upload Salary Slip *</label>
      <input
        type="file"
        accept=".pdf,.jpg,.png"
        onChange={e =>
          onSalarySlipChange(e.target.files?.[0] ?? null)
        }
      />
      <ErrorMessage message={errors.salarySlip} />

      {/* Bank Statement */}
      <label>Upload Bank Statement *</label>
      <input
        type="file"
        accept=".pdf,.jpg,.png"
        onChange={e =>
          onBankStatementChange(e.target.files?.[0] ?? null)
        }
      />
      <ErrorMessage message={errors.bankStatement} />
    </FormSection>
  );
}