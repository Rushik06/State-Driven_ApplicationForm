import { state } from '../../app.state';
import { validateForm } from '../../App-logic/app.logic';
import { generateId } from '../../utils/id';
import { saveToStorage } from '../../app.storage';
import { resetFormState } from './Form-reset';
import { renderApp } from '../App';
import { showToast } from '../../utils/toast';
import type { FormErrors } from '../../types/form-errors.type';
import type { LoanApplication } from '../../types/loan-application.type';

//Scroll To Error
function scrollToFirstError(errorMap: Partial<Record<keyof FormErrors, HTMLSpanElement>>): void {
  const firstError = Object.values(errorMap).find((el) => el && el.textContent);

  if (firstError) {
    firstError.scrollIntoView({
      behavior: 'smooth',
      block: 'center',
    });
  }
}

export function attachSubmit(
  form: HTMLFormElement,
  errorMap: Partial<Record<keyof FormErrors, HTMLSpanElement>>
) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    //validate Form
    const errors = validateForm(state.form);

    //show errors
    Object.keys(errorMap).forEach((key) => {
      const k = key as keyof FormErrors;
      if (errorMap[k]) {
        errorMap[k]!.textContent = errors[k] ?? '';
      }
    });

    if (Object.keys(errors).length > 0) {
      scrollToFirstError(errorMap);
      return;
    }

    //build application
    const application: LoanApplication = {
      id: state.form.editId ?? generateId(),
      ...state.form,
      age: state.form.age as number,
    };

    //update or insert data
    if (state.form.editId) {
      const i = state.submissions.findIndex((a) => a.id === state.form.editId);
      state.submissions[i] = application;
      showToast('Updated Sucessfully');
    } else {
      state.submissions.push(application);
      showToast('Submitted Successfully');
    }

    resetFormState();
    saveToStorage();
    renderApp();
  });
}
