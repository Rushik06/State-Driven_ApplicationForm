import type { LoanFormState } from '../types/loan-form-state.type';
import { regex } from './regex';
import { calculateAge } from './age';
export function validateField(
  key: keyof LoanFormState,
  value: unknown,
  form: LoanFormState
): string {
  switch (key) {
    case 'fullName': {
      if (typeof value !== 'string' || !value.trim()) {
        return 'Full name is required';
      }
      if (!regex.text.test(value)) {
        return 'Only alphabets allowed';
      }
      return '';
    }
    case 'dob': {
      if (typeof value !== 'string') return 'Age must be 18–65';
      const age = calculateAge(value);
      if (age === null || age < 18 || age > 65) {
        return 'Age must be 18–65';
      }
      return '';
    }
    case 'email': {
      if (typeof value !== 'string') return 'Invalid email';
      return regex.email.test(value) ? '' : 'Invalid email';
    }
    case 'mobile': {
      if (typeof value !== 'string') return 'Invalid mobile number';
      return regex.mobile.test(value) ? '' : 'Invalid mobile number';
    }
    case 'pan': {
      if (typeof value !== 'string') return 'Invalid PAN format';
      return regex.pan.test(value) ? '' : 'Invalid PAN format';
    }
    case 'aadhaar': {
      if (typeof value !== 'string') return 'Invalid Aadhaar number';
      return regex.aadhaar.test(value) ? '' : 'Invalid Aadhaar number';
    }
    case 'monthlyIncome':
    case 'yearsInJob':
    case 'loanAmount': {
      if (typeof value !== 'number' || value <= 0) {
        return 'Required';
      }
      if (
        key === 'loanAmount' &&
        typeof form.monthlyIncome === 'number' &&
        value > form.monthlyIncome * 20
      ) {
        return 'Loan amount not eligible';
      }
      return '';
    }
    case 'infoAccurate':
    case 'termsAccepted': {
      if (typeof value !== 'boolean' || !value) {
        return 'Required';
      }
      return '';
    }
    default:
      return value ? '' : 'Required';
  }
}
