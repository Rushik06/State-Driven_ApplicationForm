import { appStore } from '../../app.state';
import type { LoanFormState } from '../../types/loan-form-state.type';

export function resetFormState(): void {
  const resetState: LoanFormState = {
    editId: null,
    fullName: '',
    dob: '',
    age: null,
    gender: null,
    email: '',
    mobile: '',
    pan: '',
    aadhaar: '',
    employmentType: null,
    companyName: '',
    monthlyIncome: null,
    yearsInJob: null,
    liabilities: null,
    loanAmount: null,
    loanPurpose: null,
    loanTenure: null,
    existingLoans: false,
    creditScore: null,
    bankAccountType: null,
    salarySlip: null,
    bankStatement: null,
    infoAccurate: false,
    termsAccepted: false,
  };

  appStore.set('form', resetState);
}
