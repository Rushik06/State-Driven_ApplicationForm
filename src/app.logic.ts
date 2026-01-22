import type { LoanFormState } from './types/loan-form-state.type';
import type { FormErrors } from './types/form-errors.type';

//regex validations
const regex = {
  email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  mobile: /^[6-9]\d{9}$/,
  pan: /^[A-Z]{5}[0-9]{4}[A-Z]$/,
  aadhaar: /^\d{12}$/,
  text: /^[A-Za-z\s]+$/
};

//text validations 
 function validateText(value: string): boolean {
  return value.trim().length > 0;
}
//number validations
function validatePositiveNumber(value: number | null): boolean {
  return value !== null && Number.isFinite(value) && value > 0;
}
//dropbox validations
  function validateSelect(value: string | number | null): boolean {
  return value !== null && value !== '' && value !== 0;
}
//checkbox validations
 function validateCheckbox(value: boolean): boolean {
  return value === true;
}
//age validation
export function calculateAge(dob: string): number | null {
 if (!dob) return null;

  const birthDate = new Date(dob);
  const today = new Date();

  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();

  if (
    monthDiff < 0 ||
    (monthDiff === 0 && today.getDate() < birthDate.getDate())
  ) {
    age--;
  }

  return age >= 18 && age <= 65 ? age : null;
}
//loan-amount validation
function isLoanAmountEligible(
  monthlyIncome: number,
  loanAmount: number
): boolean {
  return loanAmount <= monthlyIncome * 20;
}

//Mandatory field validations
export function validateForm(form: LoanFormState): FormErrors {
  const errors: FormErrors = {};

  
  if (!validateText(form.fullName)) {
    errors.fullName = 'Full name is required';
  } else if (!regex.text.test(form.fullName)) {
    errors.fullName = 'Only alphabets are allowed';
  }

  
  if (!calculateAge(form.dob)) {
    errors.dob = 'Age must be 18';
  }

  if (!form.gender) {
    errors.gender = 'Gender is required';
  }

  if (!regex.email.test(form.email)) {
    errors.email = 'Invalid email address';
  }

  
  if (!regex.mobile.test(form.mobile)) {
    errors.mobile = 'Invalid mobile number';
  }

  if (!regex.pan.test(form.pan)) {
    errors.pan = 'Invalid PAN format';
  }

  if (!regex.aadhaar.test(form.aadhaar)) {
    errors.aadhaar = 'Aadhaar must be 12 digits';
  }

  if (!validateSelect(form.employmentType)) {
    errors.employmentType = 'Employment type required';
  }

  if (!validatePositiveNumber(form.monthlyIncome)) {
    errors.monthlyIncome = 'Monthly income required';
  }

  if (!validatePositiveNumber(form.yearsInJob)) {
    errors.yearsInJob = 'Years in current job required';
  }

  if (!validateText(form.companyName)) {
    errors.companyName = 'Company name required';
  }

  if (!validatePositiveNumber(form.loanAmount)) {
    errors.loanAmount = 'Loan amount required';
  } else if (
    validatePositiveNumber(form.monthlyIncome) &&
    !isLoanAmountEligible(form.monthlyIncome!, form.loanAmount!)
  ) {
    errors.loanAmount = 'Loan amount not eligible';
  }

  if (!validateSelect(form.loanPurpose)) {
    errors.loanPurpose = 'Loan purpose required';

  }
  if (!validatePositiveNumber(form.loanTenure)) {
    errors.loanTenure = 'Loan tenure required';
  }
  
  if (!validateSelect(form.bankAccountType)) {
    errors.bankAccountType = 'Bank account type required';
  }

  if (!form.salarySlip) {
    errors.salarySlip = 'Salary slip required';
  }

  if (!form.bankStatement) {
    errors.bankStatement = 'Bank statement required';
  }

  if (!validateCheckbox(form.infoAccurate)) {
    errors.infoAccurate = 'Please confirm information accuracy';
  }

  if (!validateCheckbox(form.termsAccepted)) {
    errors.termsAccepted = 'Accept terms & conditions';
  }

  return errors;
}