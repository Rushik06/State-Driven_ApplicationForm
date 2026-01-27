import type { LoanFormState } from '../types/loan-form-state.type';
import type { FormErrors } from '../types/form-errors.type';
import { validateField } from './field';

const LOAN_FORM_FIELDS = [
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
] as const satisfies readonly (keyof LoanFormState)[];

export function validateForm(form: LoanFormState): FormErrors {
  const errors: FormErrors = {};

  LOAN_FORM_FIELDS.forEach((key) => {
    const msg = validateField(key, form[key] as unknown, form);
    if (msg) {
      errors[key] = msg;
    }
  });

  return errors;
}
