import type { LoanApplication } from './loan-application.type';

export type LoanFormState = Omit<LoanApplication, 'id' | 'age'> & {
  age: number | null;
  editId: string | null;
};