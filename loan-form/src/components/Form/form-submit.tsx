import { useState } from 'react';
import type { FormEvent } from 'react';
import type { LoanApplication } from '../../types/loan-application.type';
import { validateForm } from '../../App-logic/app.logic';
import { generateId } from '../../utils/id';
import { useToast } from '../../context/toast-context';
import { useApp } from '../../context/app-context';
import type { FormErrors } from '../../types/form-errors.type';

type UseFormSubmitReturn = {
  handleSubmit: (e: FormEvent<HTMLFormElement>) => void;
  errors: FormErrors;
};

export function useFormSubmit(): UseFormSubmitReturn {
  const { state, dispatch } = useApp();
  const { showToast } = useToast();

  const [errors, setErrors] = useState<FormErrors>({});

  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    

    const validationErrors = validateForm(state.form);
    setErrors(validationErrors);


    if (Object.keys(validationErrors).length > 0) {
      scrollToFirstError();
      return;
    }

    const application: LoanApplication = {
      id: state.form.editId ?? generateId(),
      ...state.form,
      age: state.form.age as number
    };

    if (state.form.editId) {
      dispatch({ type: 'UPDATE_SUBMISSION', payload: application });
      showToast('Updated Successfully');
    } else {
      dispatch({ type: 'ADD_SUBMISSION', payload: application });
      showToast('Submitted Successfully');
    }

    window.scrollTo({top:0,behavior:'smooth'});

    dispatch({ type: 'RESET_FORM' });
    setErrors({});
  };

  return { handleSubmit, errors };
}

function scrollToFirstError(): void {
  const el = document.querySelector('.error-message');
  if (el) {
    el.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }
}