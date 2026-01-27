import { appStore } from '../../app.state';
import { validateForm } from '../../App-logic/app.logic';
import { generateId } from '../../utils/id';
import { saveToStorage } from '../../app.storage';
import { resetFormState } from './form-reset';
import { renderApp } from '../app';
import { showToast } from '../../utils/toast';
import type { FormErrors } from '../../types/form-errors.type';
import type { LoanApplication } from '../../types/loan-application.type';

// Scroll to first error
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

    const formState = appStore.get('form');
    const submissions = appStore.get('submissions');

    // validate form
    const errors = validateForm(formState);

    // show errors
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

    // build application
    const application: LoanApplication = {
      id: formState.editId ?? generateId(),
      ...formState,
      age: formState.age as number,
    };

    // update or insert
    if (formState.editId) {
      const index = submissions.findIndex((a) => a.id === formState.editId);

      if (index !== -1) {
        const updated = [...submissions];
        updated[index] = application;
        appStore.set('submissions', updated);
      }

      showToast('Updated Successfully');
    } else {
      appStore.set('submissions', [...submissions, application]);
      showToast('Submitted Successfully');
    }

    resetFormState();
    saveToStorage();
    renderApp();
  });
}
