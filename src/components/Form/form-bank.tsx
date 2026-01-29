import { useState, useEffect ,useRef} from 'react';
import type { BankAccountType } from '../../types/bank-account.type';
import { useApp } from '../../context/app-context';
import { validateField } from '../../App-logic/field';
import { FormSection } from '../helpers/create-feildset';
import { ErrorMessage } from '../helpers/create-error';
import type { FormErrors } from '../../types/form-errors.type';

type Props = {
  submitErrors: FormErrors;
};

export function BankForm({ submitErrors }: Props) {
  const { state, dispatch } = useApp();
  const form = state.form;

  const salarySlipRef =useRef<HTMLInputElement|null>(null);
  const bankStatementRef = useRef<HTMLInputElement|null>(null);

  //typing-time errors
  const [errors, setErrors] = useState({
    bankAccountType: '',
    salarySlip: '',
    bankStatement: ''
  });

  const bankTypes: readonly BankAccountType[] = ['SAVINGS', 'CURRENT'];

// eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    setErrors(prev => ({
      ...prev,
      bankAccountType: submitErrors.bankAccountType ?? prev.bankAccountType,
      salarySlip: submitErrors.salarySlip ?? prev.salarySlip,
      bankStatement: submitErrors.bankStatement ?? prev.bankStatement
    }));
  }, [submitErrors]);

  // Handlers 

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
    dispatch({ type: 'UPDATE_FORM', payload: { salarySlip: file } });

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
    dispatch({ type: 'UPDATE_FORM', payload: { bankStatement: file } });

    setErrors(e => ({
      ...e,
      bankStatement: validateField(
        'bankStatement',
        file,
        { ...form, bankStatement: file }
      )
    }));
  }

  
  if (!form.salarySlip && salarySlipRef.current) {
    salarySlipRef.current.value = '';
  }

  if (!form.bankStatement && bankStatementRef.current) {
    bankStatementRef.current.value = '';
  }

  //  UI 

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
        ref={salarySlipRef}
        type="file"
        accept=".pdf,.jpg,.png"
        onChange={e =>
          onSalarySlipChange(e.target.files?.[0] ?? null)
        }
      />
      <ErrorMessage message={errors.salarySlip} />

      <label>Upload Bank Statement *</label>
      <input
        ref={bankStatementRef}
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

