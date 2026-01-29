import type { LoanFormState } from '../types/loan-form-state.type';
import type { FormErrors } from '../types/form-errors.type';
import { validateField } from './field';

export function validateForm(form: LoanFormState): FormErrors {
  const errors: FormErrors = {};

  (
    [
      'fullName',
      'dob',
      'gender',
      'email',
      'mobile',
      'pan',
      'aadhaar',
      'employmentType',
      'companyName',
      'monthlyIncome',
      'yearsInJob',
      'loanAmount',
      'loanPurpose',
      'loanTenure',
      'bankAccountType',
      'salarySlip',
      'bankStatement',
      'infoAccurate',
      'termsAccepted',
    ] as (keyof LoanFormState)[]
  ).forEach((key) => {
    const msg = validateField(key, form[key] as unknown, form);
    if (msg) {
      errors[key] = msg;
    }
  });

  return errors;
}


// check commit