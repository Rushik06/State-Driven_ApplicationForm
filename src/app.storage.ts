import { state } from './app.state';
import type { LoanApplication } from './types/loan-application.type';

const STORAGE_KEY = 'loan_app_state';

function appFields(app: LoanApplication): LoanApplication {
  return {
    ...app,
    salarySlip: null,
    bankStatement: null
  };
}

export function saveToStorage(): void {
  const serializableState = {
    submissions: state.submissions.map(appFields)
  };

  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(serializableState)
  );
}

export function loadFromStorage(): void {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return;

  try {
    const parsed = JSON.parse(raw);

    state.submissions = parsed.submissions ?? [];
    
  } catch {
    
  }
}