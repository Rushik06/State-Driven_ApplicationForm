import { useState } from 'react';
import type { FormEvent } from 'react';
import type { LoanApplication } from '../../types/loan-application.type';
import type { FormErrors } from '../../types/form-errors.type';
import { validateForm } from '../../app-logic/app.logic';
import { generateId } from '../../utils/id';
import { useToast } from '../../context/toast-context';
import { useApp } from '../../context/app-context';


export function useFormSubmit() {
  const { showToast } = useToast();

  // Zustand state
  const form = useApp(state => state.form);
  const addSubmission = useApp(state => state.addSubmission);
  const updateSubmission = useApp(state => state.updateSubmission);
  const resetForm = useApp(state => state.resetForm);

  // submit-time errors
  const [errors, setErrors] = useState<FormErrors>({});

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    // Validate full form
    const validationErrors = validateForm(form);
    setErrors(validationErrors);

    // Stop if errors exist
    if (Object.keys(validationErrors).length > 0) {
      scrollToFirstError();
      return;
    }

    // Build application object
    const application: LoanApplication = {
      id: form.editId ?? generateId(),
      ...form,
      age: form.age as number
    };

    // Add or Update
    if (form.editId) {
      updateSubmission(application);
      showToast('Application updated successfully');
    } else {
      addSubmission(application);
      showToast('Application submitted successfully');
    }

    // Reset form-errors
    resetForm();
    setErrors({});

    // scroll after success
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  return { handleSubmit, errors };
}

//scroll
function scrollToFirstError(): void {
  const el = document.querySelector('.error-message');
  if (el) {
    el.scrollIntoView({
      behavior: 'smooth',
      block: 'center'
    });
  }
}