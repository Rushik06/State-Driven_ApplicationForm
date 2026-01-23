import type { AppState } from './types/app-state.type';

export const state: AppState = {
  form: {
    editId: null,

    fullName: ''
    dob: '',
    age: null,
    gender: null,

    email: '',
    mobile: '',
    pan: '',
    aadhaar: '',

    employmentType: null,
    monthlyIncome: null,
    yearsInJob: null,
    companyName: '',

    liabilities: null,
    loanAmount: null,
    loanPurpose:null,
    loanTenure: 12,

    existingLoans: false,
    creditScore: null,

    bankAccountType: 'SAVINGS',
    salarySlip: null,
    bankStatement: null,

    infoAccurate: false,
    termsAccepted: false
  },
  submissions: []
  
};