import { appStore } from './app.state';
import type { LoanApplication } from './types/loan-application.type';
import type { AppState } from './types/app-state.type';

const STORAGE_KEY = 'loan_app_state';

function appFields(app: LoanApplication): LoanApplication {
  return {
    ...app,
    salarySlip: null,
    bankStatement: null,
  };
}

export function saveToStorage(): void {
  const submissions = appStore.get('submissions');

  const serializableState = {
    submissions: submissions.map(appFields),
  };

  localStorage.setItem(STORAGE_KEY, JSON.stringify(serializableState));
}

export function loadFromStorage(): void {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return;

  try {
    const parsed: Partial<AppState> = JSON.parse(raw);

    appStore.set('submissions', parsed.submissions ?? []);
  } catch {}
}
