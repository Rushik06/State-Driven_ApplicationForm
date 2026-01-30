import { useState, useEffect } from 'react';
import type { Gender } from '../../types/gender.type';
import { calculateAge } from '../../app-logic/age';
import { validateField } from '../../app-logic/field';
import { useApp } from '../../context/app-context';
import type { FormErrors } from '../../types/form-errors.type';
import { FormSection } from '../helpers/create-feildset';
//import { InputField } from '../helpers/create-input';
//import {RadioButtonsGroup} from '../helpers/create-radio'

type Props = {
  submitErrors: FormErrors;
};

export function PersonalForm({ submitErrors }: Props) {
  // zustand logic
  const form = useApp(state => state.form);
  const updateForm = useApp(state => state.updateForm);

  // typing-time errors 
  const [errors, setErrors] = useState({
    fullName: '',
    dob: '',
    gender: '',
    email: '',
    mobile: ''
  });

  
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    setErrors(prev => ({
      ...prev,
      fullName: submitErrors.fullName ?? prev.fullName,
      dob: submitErrors.dob ?? prev.dob,
      gender: submitErrors.gender ?? prev.gender,
      email: submitErrors.email ?? prev.email,
      mobile: submitErrors.mobile ?? prev.mobile
    }));
  }, [submitErrors]);

  //  Handlers 

  function onFullNameChange(value: string) {
    updateForm({ fullName: value });
    setErrors(e => ({
      ...e,
      fullName: validateField('fullName', value, { ...form, fullName: value })
    }));
  }

  function onDobChange(value: string) {
    const age = calculateAge(value);
    updateForm({ dob: value, age });
    setErrors(e => ({
      ...e,
      dob: validateField('dob', value, { ...form, dob: value, age })
    }));
  }

  function onGenderChange(gender: Gender) {
    updateForm({ gender });
    setErrors(e => ({
      ...e,
      gender: validateField('gender', gender, { ...form, gender })
    }));
  }

  function onEmailChange(value: string) {
    updateForm({ email: value });
    setErrors(e => ({
      ...e,
      email: validateField('email', value, { ...form, email: value })
    }));
  }

  function onMobileChange(value: string) {
    const exact = value.replace(/\D/g, '').slice(0, 10);
    updateForm({ mobile: exact });
    setErrors(e => ({
      ...e,
      mobile: validateField('mobile', exact, { ...form, mobile: exact })
    }));
  }

  const genders: readonly Gender[] = ['MALE', 'FEMALE', 'OTHER'];

  // UI 

  return (
    <FormSection title ="Personal Details">

      {/* Full Name */}
      <label>Full Name *</label>
      <input
        type="text"
        value={form.fullName}
        onChange={e => onFullNameChange(e.target.value)}
      />
      <span className="error-message">{errors.fullName}</span>

      {/* DOB */}
      <label>Date of Birth *</label>
      <input
        type="date"
        value={form.dob}
        onChange={e => onDobChange(e.target.value)}
      />
      <span className="error-message">{errors.dob}</span>

      {/* Age */}
      <label>Age *</label>
      <input type="number" value={form.age ?? ''} readOnly />

      {/* Gender */}
      <label>Gender *</label>
      <div className="radio">
        {genders.map(g => (
          <label key={g} className="radio-item">
            <input
              type="radio"
              name="gender"
              checked={form.gender === g}
              onChange={() => onGenderChange(g)}
            />
            {g}
          </label>
        ))}
      </div>
      <span className="error-message">{errors.gender}</span>

      {/* Email */}
      <label>Email Address *</label>
      <input
        type="email"
        value={form.email}
        onChange={e => onEmailChange(e.target.value)}
      />
      <span className="error-message">{errors.email}</span>

      {/* Mobile */}
      <label>Mobile Number *</label>
      <input
        type="tel"
        placeholder="(6-9)xxxx"
        value={form.mobile}
        onChange={e => onMobileChange(e.target.value)}
      />
      <span className="error-message">{errors.mobile}</span>
    </FormSection>
  );
}