import { useState, useEffect } from 'react';
import type { EmploymentType } from '../../types/employment.type';
import { useApp } from '../../context/app-context';
import { validateField } from '../../app-logic/field';
import { FormSection } from '../helpers/create-feildset';
import { ErrorMessage } from '../helpers/create-error';
import type { FormErrors } from '../../types/form-errors.type';

type Props = {
  submitErrors: FormErrors;
};

export function EmploymentForm({ submitErrors }: Props) {
   //Zustand
  const form = useApp(state => state.form);
  const updateForm = useApp(state => state.updateForm);

  //  typing-time errors
  const [errors, setErrors] = useState({
    employmentType: '',
    companyName: '',
    monthlyIncome: '',
    yearsInJob: '',
    liabilities:''
  });

   // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    setErrors(prev => ({
      ...prev,
      employmentType: submitErrors.employmentType ?? prev.employmentType,
      companyName: submitErrors.companyName ?? prev.companyName,
      monthlyIncome: submitErrors.monthlyIncome ?? prev.monthlyIncome,
      yearsInJob: submitErrors.yearsInJob ?? prev.yearsInJob
    }));
  }, [submitErrors]);

  const employmentTypes: readonly EmploymentType[] = [
    'SALARIED',
    'SELF_EMPLOYED'
  ];

  // Handlers

  function onEmploymentTypeChange(value: string) {
    const v = value ? (value as EmploymentType) : null;

    updateForm({
       employmentType: v 
    });

    setErrors(e => ({
      ...e,
      employmentType: validateField('employmentType', v, {
        ...form,
        employmentType: v
      })
    }));
  }

  function onCompanyChange(value: string) {
    const trimmed = value.trim();

    updateForm({
       companyName: trimmed 
    });

    setErrors(e => ({
      ...e,
      companyName: validateField('companyName', trimmed, {
        ...form,
        companyName: trimmed
      })
    }));
  }

  function onIncomeChange(value: string) {
    const num = value ? Number(value) : null;

    updateForm({
      monthlyIncome: num 
    });

    setErrors(e => ({
      ...e,
      monthlyIncome: validateField('monthlyIncome', num, {
        ...form,
        monthlyIncome: num
      })
    }));
  }

  function onYearsChange(index: number) {
    const years = index > 0 ? index : null;

    updateForm({
       yearsInJob: years 
    });

    setErrors(e => ({
      ...e,
      yearsInJob: validateField('yearsInJob', years, {
        ...form,
        yearsInJob: years
      })
    }));
  }

  function onLiabilitiesChange(value: string) {
    const num = value ? Number(value) : null;

    updateForm({
     liabilities: num 
    });
    setErrors(e => ({
      ...e,
      liabilities: validateField('liabilities', num, {
        ...form,
        liabilities:num
      })
    }));
  }

  // UI

  return (
    <FormSection title="Employment & Income">
      {/* Employment Type */}
      <label>Employment Type *</label>
      <select
        value={form.employmentType ?? ''}
        onChange={e => onEmploymentTypeChange(e.target.value)}
      >
        <option value="">-- Select --</option>
        {employmentTypes.map(t => (
          <option key={t} value={t}>
            {t}
          </option>
        ))}
      </select>
      <ErrorMessage message={errors.employmentType} />

      {/* Company Name */}
      <label>Company Name *</label>
      <input
        type="text"
        value={form.companyName}
        onChange={e => onCompanyChange(e.target.value)}
      />
      <ErrorMessage message={errors.companyName} />

      {/* Monthly Income */}
      <label>Monthly Income *</label>
      <input
        type="number"
        value={form.monthlyIncome ?? ''}
        onChange={e => onIncomeChange(e.target.value)}
      />
      <ErrorMessage message={errors.monthlyIncome} />

      {/* Years in Job */}
      <label>Years in Current Job *</label>
      <select
        value={form.yearsInJob ?? ''}
        onChange={e => onYearsChange(e.target.selectedIndex)}
      >
        <option value="">-- Select --</option>
        <option value="1">0–1 year</option>
        <option value="2">1–3 years</option>
        <option value="3">3+ years</option>
      </select>
      <ErrorMessage message={errors.yearsInJob} />

      {/* Liabilities (Optional) */}
      <label>Current Monthly Liabilities (Optional)</label>
      <input
        type="number"
        value={form.liabilities ?? ''}
        onChange={e => onLiabilitiesChange(e.target.value)}
      />
      <ErrorMessage message={errors.liabilities}/>
    </FormSection>
  );
}