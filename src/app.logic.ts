import type { LoanFormState } from './types';

//error validation
export type FormErrors = Partial<Record<keyof LoanFormState, string>>;

//regex validation
export const regex = {
  email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  mobile: /^[6-9]\d{9}$/,
  pan: /^[A-Z]{5}[0-9]{4}[A-Z]$/,
  aadhaar: /^\d{12}$/,
  text: /^[A-Za-z\s]+$/
};

//field validation
export function validateText(value: string): boolean {
  return value.trim().length > 0;
}

export function validatePositiveNumber(value: number | null): boolean {
  return value !== null  && Number.isFinite(value) && value > 0;
}

export function validateSelect(value: string | number): boolean {
  return value !== '' && value !== 0;
}

export function validateCheckbox(value: boolean): boolean {
  return value === true;
}

//AGE validation
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

  if (age < 18 || age > 65) return null;
  return age;
}

//Loan validation
export function isLoanAmountEligible(
  monthlyIncome: number,
  loanAmount: number
): boolean {
  return loanAmount <= monthlyIncome * 20;
}

//Mandatory validations
export function validateForm(form: LoanFormState): FormErrors {
  const errors: FormErrors = {};
  if (!validateText(form.fullName)){
    errors.companyName = 'Full name required';
  }else if  (!regex.text.test(form.fullName)){
    errors.fullName = ' Alphabets required';
  }

  if (!form.age)
    errors.dob = 'Age must be above 18';

  if (!form.gender)
    errors.gender = 'Gender is required';

  if (!regex.email.test(form.email))
    errors.email = 'Invalid email address';

  if (!regex.mobile.test(form.mobile))
    errors.mobile = 'Invalid mobile number';

  if (!regex.pan.test(form.pan))
    errors.pan = 'Invalid PAN format';

  if (!regex.aadhaar.test(form.aadhaar))
    errors.aadhaar = 'Aadhaar must be 12 digits';

  if (!validateSelect(form.employmentType))
    errors.employmentType = 'Employment type required';

  if (!validatePositiveNumber(form.monthlyIncome))
    errors.monthlyIncome = 'Monthly income required';

  if (!validatePositiveNumber(form.yearsInJob))
    errors.yearsInJob = 'Years in current job required';

  if (!validateText(form.companyName))
    errors.companyName = 'Company name required';

  
  if (!validatePositiveNumber(form.loanAmount))
    errors.loanAmount = 'Loan amount required';

  if (
    validatePositiveNumber(form.monthlyIncome) &&
    validatePositiveNumber(form.loanAmount) &&
    !isLoanAmountEligible(form.monthlyIncome, form.loanAmount)
  ) {
    errors.loanAmount = 'Loan amount not eligible';
  }

  if (!validateSelect(form.loanPurpose))
    errors.loanPurpose = 'Loan purpose required';

  if (!validatePositiveNumber(form.loanTenure))
    errors.loanTenure = 'Loan tenure required';

  
  if (!validateSelect(form.bankAccountType))
    errors.bankAccountType = 'Bank account type required';

  if (!form.salarySlip)
    errors.salarySlip = 'Salary slip required';

  if (!form.bankStatement)
    errors.bankStatement = 'Bank statement required';

  
  if (!validateCheckbox(form.infoAccurate))
    errors.infoAccurate = 'Please confirm information accuracy';

  if (!validateCheckbox(form.termsAccepted))
    errors.termsAccepted = 'Accept terms & conditions';

  return errors;
}