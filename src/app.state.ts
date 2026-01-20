import type { AppState } from './types';

export const state: AppState = {
  form: {
    editId: null,

    fullName: '',
    dob: '',
    age: null,
    gender: 'MALE',

    email: '',
    mobile: '',
    pan: '',
    aadhaar: '',

    employmentType: 'SALARIED',
    monthlyIncome: 0,
    yearsInJob: 0,
    companyName: '',

    liabilities: null,
    loanAmount: 0,
    loanPurpose: 'PERSONAL',
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