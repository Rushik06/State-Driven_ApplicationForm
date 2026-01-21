import { state } from '../app.state';
import { validateForm } from './Validation';
import { generateId } from '../utils/id';
import { saveToStorage } from '../app.storage';
import { resetFormState } from './Form-reset';
import { renderApp } from './App';
import type { FormErrors } from '../types/form-errors.type';
import type { LoanApplication } from '../types/loan-application.type';

export function attachSubmit(
  form: HTMLFormElement,
  errorMap: Partial<Record<keyof FormErrors, HTMLSpanElement>>
) {
  form.addEventListener('submit', e => {
    e.preventDefault();

    /* ---------- validate ---------- */
    const errors = validateForm(state.form);

    /* ---------- show errors ---------- */
    Object.keys(errorMap).forEach(key => {
      const k = key as keyof FormErrors;
      if (errorMap[k]) {
        errorMap[k]!.textContent = errors[k] ?? '';
      }
    });

    if (Object.keys(errors).length > 0) return;

    /* ---------- build application ---------- */
    const application: LoanApplication = {
      id: state.form.editId ?? generateId(),
      ...state.form,
      age: state.form.age as number
    };

    /* ---------- update or insert ---------- */
   if (state.form.editId) {
      const i = state.submissions.findIndex(a => a.id === state.form.editId);
      state.submissions[i] = application;
    } else {
      state.submissions.push(application);
    }

    /* ---------- reset + persist ---------- */
    resetFormState();
    saveToStorage();
    renderApp();
  });
}