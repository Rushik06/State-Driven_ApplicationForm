import type { LoanFormState } from '../types/loan-form-state.type';
import { regex } from './regex';
import { calculateAge } from './age';

type RuleFn = (value: unknown, form: LoanFormState, ruleValue?: unknown) => string | null;

const ruleStrategies: Record<string, RuleFn> = {
  required(value) {
    if (value === null || value === undefined || (typeof value === 'string' && !value.trim())) {
      return 'Required';
    }
    return null;
  },

  text(value) {
    if (typeof value !== 'string') return 'Only alphabets allowed';
    return regex.text.test(value) ? null : 'Only alphabets allowed';
  },

  email(value) {
    if (typeof value !== 'string') return 'Invalid email';
    return regex.email.test(value) ? null : 'Invalid email';
  },

  mobile(value) {
    if (typeof value !== 'string') return 'Invalid mobile number';
    return regex.mobile.test(value) ? null : 'Invalid mobile number';
  },

  pan(value) {
    if (typeof value !== 'string') return 'Invalid PAN format';
    return regex.pan.test(value) ? null : 'Invalid PAN format';
  },

  aadhaar(value) {
    if (typeof value !== 'string') return 'Invalid Aadhaar number';
    return regex.aadhaar.test(value) ? null : 'Invalid Aadhaar number';
  },

  positiveNumber(value) {
    if (typeof value !== 'number' || value <= 0) {
      return 'Required';
    }
    return null;
  },

  ageFromDob(value) {
    if (typeof value !== 'string') return 'Age must be 18–65';
    const age = calculateAge(value);
    if (age === null || age < 18 || age > 65) {
      return 'Age must be 18–65';
    }
    return null;
  },

  loanEligibility(value, form) {
    if (
      typeof value === 'number' &&
      typeof form.monthlyIncome === 'number' &&
      value > form.monthlyIncome * 20
    ) {
      return 'Loan amount not eligible';
    }
    return null;
  },

  mustBeTrue(value) {
    if (typeof value !== 'boolean' || !value) {
      return 'Required';
    }
    return null;
  },
};

const fieldRules: Record<keyof LoanFormState, string[]> = {
  fullName: ['required', 'text'],
  dob: ['required', 'ageFromDob'],
  age: [],
  email: ['required', 'email'],
  mobile: ['required', 'mobile'],
  pan: ['required', 'pan'],
  aadhaar: ['required', 'aadhaar'],

  monthlyIncome: ['positiveNumber'],
  yearsInJob: ['positiveNumber'],
  loanAmount: ['positiveNumber', 'loanEligibility'],

  infoAccurate: ['mustBeTrue'],
  termsAccepted: ['mustBeTrue'],

  // default-required fields
  editId: ['required'],
  gender: ['required'],
  employmentType: ['required'],
  companyName: ['required'],
  liabilities: ['required'],
  loanPurpose: ['required'],
  loanTenure: ['required'],
  existingLoans: ['required'],
  creditScore: ['required'],
  bankAccountType: ['required'],
  salarySlip: ['required'],
  bankStatement: ['required'],
};

export function validateField(
  key: keyof LoanFormState,
  value: unknown,
  form: LoanFormState
): string {
  const rules = fieldRules[key];
  if (!rules) return '';

  for (const rule of rules) {
    const error = ruleStrategies[rule]?.(value, form);
    if (error) return error;
  }

  return '';
}
