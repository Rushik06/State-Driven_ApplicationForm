import type { LoanFormState } from '../types/loan-form-state.type';
import { regex } from './regex';
import { calculateAge } from './age';

export function validateField(
  key: keyof LoanFormState,
  value: any,
  form: LoanFormState
): string {
  switch (key) {
    case 'fullName':
      if (!value) return 'Full name is required';
      if (!regex.text.test(value)) return 'Only alphabets allowed';
      return '';

    case 'dob':
      return calculateAge(value) ? '' : 'Age must be 18–65';

    case 'gender':
      return value ? '' : 'Gender is required';

    case 'email':
      return regex.email.test(value) ? '' : 'Invalid email';

    case 'mobile':
      return regex.mobile.test(value) ? '' : 'Invalid mobile number';

    case 'pan':
      return regex.pan.test(value) ? '' : 'Invalid PAN format';

    case 'aadhaar':
      return regex.aadhaar.test(value) ? '' : 'Invalid Aadhaar number';

    case 'employmentType':
      return value ? '' : 'Employment type required';

    case 'companyName':
      return value ? '' : 'Company name required';

    case 'monthlyIncome':
      return value > 0 ? '' : 'Monthly income required';

    case 'yearsInJob':
      return value > 0 ? '' : 'Years in job required';

    case 'loanAmount':
      if (!value || value <= 0) return 'Loan amount required';
      if (form.monthlyIncome && value > form.monthlyIncome * 20) {
        return 'Loan amount not eligible';
      }
      return '';

    case 'loanPurpose':
      return value ? '' : 'Loan purpose required';

    case 'loanTenure':
      return value ? '' : 'Loan tenure required';

    case 'bankAccountType':
      return value ? '' : 'Bank account type required';

    case 'salarySlip':
      return value ? '' : 'Salary slip required';

    case 'bankStatement':
      return value ? '' : 'Bank statement required';

    case 'infoAccurate':
      return value ? '' : 'Confirmation required';

    case 'termsAccepted':
      return value ? '' : 'Accept terms & conditions';

    default:
      return '';
  }
}