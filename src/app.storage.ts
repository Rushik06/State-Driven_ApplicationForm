import type { LoanApplication } from './types/loan-application.type';

const STORAGE_KEY = 'loan_app_state';


function myApplication(app: LoanApplication): LoanApplication {
  return {
    ...app,
    salarySlip: null,
    bankStatement: null
  };
}

// Save submissions 
export function saveSubmissions(submissions: LoanApplication[]): void {
  const serializableData = {
    submissions: submissions.map(myApplication)
  };

  localStorage.setItem(STORAGE_KEY, JSON.stringify(serializableData));
}

// Load submissions
export function loadSubmissions(): LoanApplication[] {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return [];

  try {
    const parsed: unknown = JSON.parse(raw);

    if (
      typeof parsed === 'object' &&
      parsed !== null &&
      'submissions' in parsed &&
      Array.isArray((parsed as { submissions: unknown }).submissions)
    ) {
      return (parsed as { submissions: LoanApplication[] }).submissions;
    }

    return [];
  } catch {
    return [];
  }
}