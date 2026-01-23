import { state } from '../../app.state';

export function resetFormState(): void {
  state.form = {
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
    termsAccepted: false
  };
}