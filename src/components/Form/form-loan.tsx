import { useState, useEffect } from 'react';
import type { CreditScore } from '../../types/credit-score.type';
import type { LoanPurpose } from '../../types/loan-purpose.type';
import type { FormErrors } from '../../types/form-errors.type';
import { useApp } from '../../context/app-context';
import { validateField } from '../../app-logic/field';
import { FormSection } from '../helpers/create-feildset';
import { ErrorMessage } from '../helpers/create-error';

type Props = {
  submitErrors: FormErrors;
};

export function LoanForm({ submitErrors }: Props) {
  //Zustand
  const form = useApp(state => state.form);
  const updateForm = useApp(state => state.updateForm);
  //typing-time errors
  const [errors, setErrors] = useState({
    loanAmount: '',
    loanPurpose: '',
    loanTenure: ''
  });

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    setErrors(prev => ({
      ...prev,
      loanAmount: submitErrors.loanAmount ?? prev.loanAmount,
      loanPurpose: submitErrors.loanPurpose ?? prev.loanPurpose,
      loanTenure: submitErrors.loanTenure ?? prev.loanTenure
    }));
  }, [submitErrors]);

  const loanPurposes: readonly LoanPurpose[] = ['HOME', 'PERSONAL', 'EDUCATION'];
  const tenures = ['12', '24', '36', '48', '60'];
  const creditScores: readonly CreditScore[] = ['Below 650', '650-750', '750+'];

  // Handlers

  function onLoanAmountChange(value: string) {
    const num = value ? Number(value) : null;

    updateForm({
      loanAmount: num
    });

    setErrors(e => ({
      ...e,
      loanAmount: validateField('loanAmount', num, {
        ...form,
        loanAmount: num
      })
    }));
  }

  function onLoanPurposeChange(value: string) {
    const v = value ? (value as LoanPurpose) : null;

    updateForm({
      loanPurpose: v
    });

    setErrors(e => ({
      ...e,
      loanPurpose: validateField('loanPurpose', v, {
        ...form,
        loanPurpose: v
      })
    }));
  }

  function onTenureChange(value: string) {
    const num = value ? Number(value) : null;

    updateForm({ loanTenure: num });

    setErrors(e => ({
      ...e,
      loanTenure: validateField('loanTenure', num, {
        ...form,
        loanTenure: num
      })
    }));
  }

  function onExistingLoansChange(checked: boolean) {
    updateForm({
      existingLoans: checked 
    });
  }

  function onCreditScoreChange(score: CreditScore) {
    updateForm({
   creditScore: score 
    });
  }

  //UI
  return (
    <FormSection title="Loan Requirements">
      {/* Loan Amount */}
      <label>Loan Amount Required *</label>
      <input
        type="number"
        value={form.loanAmount ?? ''}
        onChange={e => onLoanAmountChange(e.target.value)}
      />
      <ErrorMessage message={errors.loanAmount} />

      {/* Loan Purpose */}
      <label>Loan Purpose *</label>
      <select
        value={form.loanPurpose ?? ''}
        onChange={e => onLoanPurposeChange(e.target.value)}
      >
        <option value="">-- Select --</option>
        {loanPurposes.map(p => (
          <option key={p} value={p}>
            {p}
          </option>
        ))}
      </select>
      <ErrorMessage message={errors.loanPurpose} />

      {/* Loan Tenure */}
      <label>Loan Tenure (Months) *</label>
      <select
        value={form.loanTenure !== null ? String(form.loanTenure) : ''}
        onChange={e => onTenureChange(e.target.value)}
      >
        <option value="">-- Select --</option>
        {tenures.map(t => (
          <option key={t} value={t}>
            {t}
          </option>
        ))}
      </select>
      <ErrorMessage message={errors.loanTenure} />

      {/* Existing Loans */}
      <label>
        <input
          type="checkbox"
          checked={form.existingLoans}
          onChange={e => onExistingLoansChange(e.target.checked)}
        />
        {' '}I have existing loans
      </label>

      {/* Credit Score */}
      <label>Credit Score (Optional)</label>
      <div className="radio">
        {creditScores.map(score => (
          <label key={score} className="radio-item">
            <input
              type="radio"
              name="creditScore"
              checked={form.creditScore === score}
              onChange={() => onCreditScoreChange(score)}
            />
            {score}
          </label>
        ))}
      </div>
    </FormSection>
  );
}