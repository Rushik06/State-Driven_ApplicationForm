import { useState, useEffect } from 'react';
import { useApp } from '../../context/app-context';
import { validateField } from '../../App-logic/field';
import { ErrorMessage } from '../helpers/create-error';
import type { FormErrors } from '../../types/form-errors.type';

type Props = {
  submitErrors: FormErrors;
};

export function DeclarationForm({ submitErrors }: Props) {
  const { state, dispatch } = useApp();
  const form = state.form;

  const [errors, setErrors] = useState({
    infoAccurate: '',
    termsAccepted: ''
  });

  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    setErrors(prev => ({
      ...prev,
      infoAccurate: submitErrors.infoAccurate ?? prev.infoAccurate,
      termsAccepted: submitErrors.termsAccepted ?? prev.termsAccepted
    }));
  }, [submitErrors]);

  // Handlers

  function onInfoAccurateChange(checked: boolean) {
    dispatch({
      type: 'UPDATE_FORM',
      payload: { infoAccurate: checked }
    });

    setErrors(e => ({
      ...e,
      infoAccurate: validateField(
        'infoAccurate',
        checked,
        { ...form, infoAccurate: checked }
      )
    }));
  }

  function onTermsAcceptedChange(checked: boolean) {
    dispatch({
      type: 'UPDATE_FORM',
      payload: { termsAccepted: checked }
    });

    setErrors(e => ({
      ...e,
      termsAccepted: validateField(
        'termsAccepted',
        checked,
        { ...form, termsAccepted: checked }
      )
    }));
  }

  // UI

  return (
    <>
      {/* Information Accurate */}
      <label>
        <input
          type="checkbox"
          checked={form.infoAccurate}
          onChange={e => onInfoAccurateChange(e.target.checked)}
        />
        {' '}Information provided is accurate *
      </label>
      <ErrorMessage message={errors.infoAccurate} />

      {/* Terms Accepted */}
      <label>
        <input
          type="checkbox"
          checked={form.termsAccepted}
          onChange={e => onTermsAcceptedChange(e.target.checked)}
        />
        {' '}I accept terms & conditions *
      </label>
      <ErrorMessage message={errors.termsAccepted} />

      {/* Submit / Update Button */}
      <div className="submit-wrapper">
        <button type="submit">
          {form.editId ? 'Update' : 'Submit Application'}
        </button>
      </div>
    </>
  );
}