import { create } from 'zustand';
import type { AppState } from '../types/app-state.type';
import type { LoanApplication } from '../types/loan-application.type';
import { initialAppState } from '../app.state';
import { loadSubmissions, saveSubmissions } from '../app.storage';

type AppActions = {
  updateForm: (payload: Partial<AppState['form']>) => void;
  resetForm: () => void;
  addSubmission: (app: LoanApplication) => void;
  updateSubmission: (app: LoanApplication) => void;
  deleteSubmission: (id: string) => void;
  loadFormForEdit: (app: LoanApplication) => void;
};

export const useApp = create<AppState & AppActions>((set) => ({
  //  STATE 
  ...initialAppState,
  submissions: loadSubmissions(),

  // ACTIONS 
  updateForm: (payload) =>
    set((state) => ({
      form: { ...state.form, ...payload }
    })),

  resetForm: () =>
    set(() => ({
      form: initialAppState.form
    })),

  addSubmission: (app) =>
    set((state) => {
      const next = [...state.submissions, app];
      saveSubmissions(next);
      return { submissions: next };
    }),

  updateSubmission: (app) =>
    set((state) => {
      const next = state.submissions.map((s) =>
        s.id === app.id ? app : s
      );
      saveSubmissions(next);
      return { submissions: next };
    }),

  deleteSubmission: (id) =>
    set((state) => {
      const next = state.submissions.filter((s) => s.id !== id);
      saveSubmissions(next);
      return { submissions: next };
    }),

  loadFormForEdit: (app) =>
    set(() => ({
      form: {
        ...app,
        editId: app.id,
        salarySlip: null,
        bankStatement: null
      }
    }))
}));