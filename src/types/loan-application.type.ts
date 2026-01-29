import type { Gender } from './gender.type';
import type { EmploymentType } from './employment.type';
import type { LoanPurpose } from './loan-purpose.type';
import type { CreditScore } from './credit-score.type';
import type { BankAccountType } from './bank-account.type';

export interface LoanApplication {
  id: string;

  fullName: string;
  dob: string;
  age: number;

  gender: Gender|null;
  email: string;
  mobile: string;
  pan: string;
  aadhaar: string;

  employmentType: EmploymentType|null;
  monthlyIncome: number|null;
  yearsInJob: number|null;
  companyName: string;

  liabilities: number | null;
  loanAmount: number|null;
  loanPurpose: LoanPurpose|null;
  loanTenure: number|null;

  existingLoans: boolean;
  creditScore: CreditScore | null;

  bankAccountType: BankAccountType|null;

  salarySlip: File | null;
  bankStatement: File | null;

  infoAccurate: boolean;
  termsAccepted: boolean;
}