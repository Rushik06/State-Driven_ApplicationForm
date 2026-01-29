import { useState, useEffect } from 'react';
import { useApp } from '../../context/app-context';
import { validateField } from '../../App-logic/field';
import { FormSection } from '../helpers/create-feildset';
import { ErrorMessage } from '../helpers/create-error';
import type { FormErrors } from '../../types/form-errors.type';

type Props = {
  submitErrors: FormErrors;
};

export function IdentityForm({ submitErrors }: Props) {
  const { state, dispatch } = useApp();
  const form = state.form;

  // typing-time errors
  const [errors, setErrors] = useState({
    pan: '',
    aadhaar: ''
  });

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    setErrors(prev => ({
      ...prev,
      pan: submitErrors.pan ?? prev.pan,
      aadhaar: submitErrors.aadhaar ?? prev.aadhaar
    }));
  }, [submitErrors]);

  // Handlers

  function onPanChange(value: string) {
    const cleaned = value.toUpperCase().slice(0, 10);

    dispatch({
      type: 'UPDATE_FORM',
      payload: { pan: cleaned }
    });

    setErrors(e => ({
      ...e,
      pan: validateField('pan', cleaned, { ...form, pan: cleaned })
    }));
  }

  function onAadhaarChange(value: string) {
    const cleaned = value.replace(/\D/g, '').slice(0, 12);

    dispatch({
      type: 'UPDATE_FORM',
      payload: { aadhaar: cleaned }
    });

    setErrors(e => ({
      ...e,
      aadhaar: validateField('aadhaar', cleaned, {
        ...form,
        aadhaar: cleaned
      })
    }));
  }

  // UI

  return (
    <FormSection title="Identity Details">
      {/* PAN */}
      <label>PAN Number *</label>
      <input
        type="text"
        placeholder="ABCDE1234F"
        value={form.pan}
        onChange={e => onPanChange(e.target.value)}
      />
      <ErrorMessage message={errors.pan} />

      {/* Aadhaar */}
      <label>Aadhaar Number *</label>
      <input
        type="tel"
        placeholder="Must contain 12-digits"
        value={form.aadhaar}
        onChange={e => onAadhaarChange(e.target.value)}
      />
      <ErrorMessage message={errors.aadhaar} />
    </FormSection>
  );
}