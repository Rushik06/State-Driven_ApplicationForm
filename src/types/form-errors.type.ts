import type { LoanFormState } from './loan-form-state.type';

export type FormErrors = Partial<Record<
  keyof LoanFormState,
  string
>>;