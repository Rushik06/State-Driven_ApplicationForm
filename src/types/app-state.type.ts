import type { LoanFormState } from './loan-form-state.type';
import type { LoanApplication } from './loan-application.type';

export interface AppState {
  form: LoanFormState;
  submissions: LoanApplication[];
}