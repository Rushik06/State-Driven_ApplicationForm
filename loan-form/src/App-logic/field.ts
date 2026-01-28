import type { LoanFormState } from '../types/loan-form-state.type';
import { regex } from './regex';
import { calculateAge } from './age';

export function validateField(
  key: keyof LoanFormState,
  value: unknown,
  form: LoanFormState
): string {
  switch (key) {
    
    case 'fullName': 
    case 'companyName':{
      if (typeof value !== 'string' || !value.trim()) {
        return 'Name is required';
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
    case 'loanAmount': { 
      if(value===null|| value===undefined||value===''){
        return 'This feild is required'
      }
      if (typeof value !== 'number' || Number.isNaN(value)) {
        return 'Special characters are not allowed';
      }
      if (value < 0) {
        return 'Only positive numbers are allowed';
      }
      if (value === 0) {
        return 'zero is not allowed';
      }
      if (
        key === 'loanAmount' &&
        typeof form.monthlyIncome === 'number' &&
        form.monthlyIncome > 0 &&
        value > form.monthlyIncome * 20
      ) {
        return 'Loan amount not eligible';
      }
      return '';
    }

    case 'liabilities': { 
      if(value===null|| value===undefined||value===''){
        return ' '
      }
      if (typeof value !== 'number' || Number.isNaN(value)) {
        return 'Special characters are not allowed';
      }
      if (value < 0) {
        return 'Only positive numbers are allowed';
      }
      if (value === 0) {
        return 'zero is not allowed';
      }
       return '';
    }

    case 'yearsInJob': {
      if (typeof value !== 'number' || value <= 0) {
        return 'This field is required';
      }
      return '';
    }

    case 'infoAccurate':
    case 'termsAccepted': {
      if (typeof value !== 'boolean' || !value) {
        return 'Please mark the checkbox';
      }
      return '';
    }
    default:
      return value ? '' : 'This field is required';
  }
}