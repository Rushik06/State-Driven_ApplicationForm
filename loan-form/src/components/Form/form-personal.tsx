import type { Gender } from '../../types/gender.type';
import { calculateAge } from '../../App-logic/age';
import { validateField } from '../../App-logic/field';
import { useApp } from '../../context/app-context';
import { useState } from 'react';

export function PersonalForm() {
  const { state, dispatch } = useApp();
  const form = state.form;

  //errors
  const [errors, setErrors] = useState({
    fullName: '',
    dob: '',
    gender: '',
    email: '',
    mobile: ''
  });

  
  // Handlers

  function onFullNameChange(value: string) {
    dispatch({ type: 'UPDATE_FORM', payload: { fullName: value } });
    setErrors(e => ({
      ...e,
      fullName: validateField('fullName', value, { ...form, fullName: value })
    }));
  }

  function onDobChange(value: string) {
    const age = calculateAge(value);
    dispatch({ type: 'UPDATE_FORM', payload: { dob: value, age } });
    setErrors(e => ({
      ...e,
      dob: validateField('dob', value, { ...form, dob: value, age })
    }));
  }

  function onGenderChange(gender: Gender) {
    dispatch({ type: 'UPDATE_FORM', payload: { gender } });
    setErrors(e => ({
      ...e,
      gender: validateField('gender', gender, { ...form, gender })
    }));
  }

  function onEmailChange(value: string) {
    dispatch({ type: 'UPDATE_FORM', payload: { email: value } });
    setErrors(e => ({
      ...e,
      email: validateField('email', value, { ...form, email: value })
    }));
  }

  function onMobileChange(value: string) {
    const excat = value.replace(/\D/g, '').slice(0, 10);
    dispatch({ type: 'UPDATE_FORM', payload: { mobile: excat } });
    setErrors(e => ({
      ...e,
      mobile: validateField('mobile', excat, { ...form, mobile: excat })
    }));
  }

  // UI

  const genders: readonly Gender[] = ['MALE', 'FEMALE', 'OTHER'];

  return (
    <fieldset>
      <legend>Personal Details</legend>

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
      <input
        type="number"
        value={form.age ?? ''}
        readOnly
      />

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
        placeholder='(6-9)xxxx'
        value={form.mobile}
        onChange={e => onMobileChange(e.target.value)}
      />
      <span className="error-message">{errors.mobile}</span>
    </fieldset>
  );
}