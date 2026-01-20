import { state } from './app.state';
import type { AppState, LoanApplication } from './types';

const STORAGE_KEY = 'loan_app_state';

function stripFiles(app: LoanApplication): LoanApplication {
  return {
    ...app,
    salarySlip: null,
    bankStatement: null
  };
}

export function saveToStorage(): void {
  const serializableState: AppState = {
    ...state,
    submissions: state.submissions.map(stripFiles)
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
    const parsed = JSON.parse(raw) as AppState;

    state.form = {
      ...state.form,
      ...parsed.form,
      salarySlip: null,
      bankStatement: null
    };

    state.submissions = parsed.submissions;
  } catch {

  }
}