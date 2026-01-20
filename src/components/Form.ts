import { state } from '../app.state';
import { renderApp } from './App';
import { validateForm } from '../app.logic';

import type { LoanApplication } from '../types/loan-application.type';
import type { FormErrors } from '../types/form-errors.type';
import type { Gender } from '../types/gender.type';
import type { EmploymentType } from '../types/employment.type';
import type { LoanPurpose } from '../types/loan-purpose.type';
import type { BankAccountType } from '../types/bank-account.type';

export function Form(): HTMLFormElement {
  const form = document.createElement('form');
  form.className = 'loan-form';

  /* =====================================================
     SMALL DOM HELPERS (LOCAL, PRIVATE)
  ===================================================== */

  function field(labelText: string): HTMLDivElement {
    const wrapper = document.createElement('div');
    wrapper.className = 'field';

    const label = document.createElement('label');
    label.textContent = labelText;

    wrapper.appendChild(label);
    form.appendChild(wrapper);
    return wrapper;
  }

  function input(
    parent: HTMLElement,
    type: string,
    value: string
  ): HTMLInputElement {
    const el = document.createElement('input');
    el.type = type;
    el.value = value;
    parent.appendChild(el);
    return el;
  }

  function select<T extends string>(
    parent: HTMLElement,
    options: readonly T[],
    value: T | null
  ): HTMLSelectElement {
    const el = document.createElement('select');

    const empty = document.createElement('option');
    empty.value = '';
    empty.textContent = '-- Select --';
    el.appendChild(empty);

    options.forEach(opt => {
      const o = document.createElement('option');
      o.value = opt;
      o.textContent = opt;
      el.appendChild(o);
    });

    el.value = value ?? '';
    parent.appendChild(el);
    return el;
  }

  function errorSpan(parent: HTMLElement): HTMLSpanElement {
    const span = document.createElement('span');
    span.className = 'error';
    parent.appendChild(span);
    return span;
  }

  /* =====================================================
     FULL NAME
  ===================================================== */

  const fullNameWrap = field('Full Name');
  const fullNameInput = input(fullNameWrap, 'text', state.form.fullName);
  const fullNameErr = errorSpan(fullNameWrap);

  fullNameInput.addEventListener('input', () => {
    state.form.fullName = fullNameInput.value;
  });

  /* =====================================================
     DOB & AGE
  ===================================================== */

  const dobWrap = field('Date of Birth');
  const dobInput = input(dobWrap, 'date', state.form.dob);
  const dobErr = errorSpan(dobWrap);

  const ageWrap = field('Age');
  const ageInput = input(
    ageWrap,
    'number',
    state.form.age ? String(state.form.age) : ''
  );
  ageInput.readOnly = true;

  dobInput.addEventListener('change', () => {
    state.form.dob = dobInput.value;
    renderApp();
  });

  /* =====================================================
     GENDER (RADIO)
  ===================================================== */

  const genderWrap = field('Gender');
  const genderErr = errorSpan(genderWrap);

  function genderRadio(value: Gender): void {
    const label = document.createElement('label');
    const radio = document.createElement('input');

    radio.type = 'radio';
    radio.name = 'gender';
    radio.value = value;
    radio.checked = state.form.gender === value;

    radio.addEventListener('change', () => {
      state.form.gender = value;
    });

    label.appendChild(radio);
    label.appendChild(document.createTextNode(value));
    genderWrap.appendChild(label);
  }

  genderRadio('MALE');
  genderRadio('FEMALE');
  genderRadio('OTHER');

  /* =====================================================
     EMAIL
  ===================================================== */

  const emailWrap = field('Email');
  const emailInput = input(emailWrap, 'email', state.form.email);
  const emailErr = errorSpan(emailWrap);

  emailInput.addEventListener('input', () => {
    state.form.email = emailInput.value;
  });

  /* =====================================================
     MOBILE
  ===================================================== */

  const mobileWrap = field('Mobile');
  const mobileInput = input(mobileWrap, 'tel', state.form.mobile);
  const mobileErr = errorSpan(mobileWrap);

  mobileInput.addEventListener('input', () => {
    state.form.mobile = mobileInput.value;
  });

  /* =====================================================
     PAN
  ===================================================== */

  const panWrap = field('PAN');
  const panInput = input(panWrap, 'text', state.form.pan);
  const panErr = errorSpan(panWrap);

  panInput.addEventListener('input', () => {
    state.form.pan = panInput.value.toUpperCase();
  });

  /* =====================================================
     AADHAAR
  ===================================================== */

  const aadhaarWrap = field('Aadhaar');
  const aadhaarInput = input(aadhaarWrap, 'tel', state.form.aadhaar);
  const aadhaarErr = errorSpan(aadhaarWrap);

  aadhaarInput.addEventListener('input', () => {
    state.form.aadhaar = aadhaarInput.value;
  });

  /* =====================================================
     EMPLOYMENT TYPE
  ===================================================== */

  const empWrap = field('Employment Type');
  const empSelect = select<EmploymentType>(
    empWrap,
    ['SALARIED', 'SELF_EMPLOYED'],
    state.form.employmentType
  );
  const empErr = errorSpan(empWrap);

  empSelect.addEventListener('change', () => {
    state.form.employmentType = empSelect.value as EmploymentType;
  });

  /* =====================================================
     MONTHLY INCOME
  ===================================================== */

  const incomeWrap = field('Monthly Income');
  const incomeInput = input(
    incomeWrap,
    'number',
    state.form.monthlyIncome ? String(state.form.monthlyIncome) : ''
  );
  const incomeErr = errorSpan(incomeWrap);

  incomeInput.addEventListener('input', () => {
    state.form.monthlyIncome = incomeInput.value
      ? Number(incomeInput.value)
      : null;
  });

  /* =====================================================
     COMPANY NAME
  ===================================================== */

  const companyWrap = field('Company / Business Name');
  const companyInput = input(companyWrap, 'text', state.form.companyName);
  const companyErr = errorSpan(companyWrap);

  companyInput.addEventListener('input', () => {
    state.form.companyName = companyInput.value;
  });

  /* =====================================================
     LOAN AMOUNT
  ===================================================== */

  const loanWrap = field('Loan Amount');
  const loanInput = input(
    loanWrap,
    'number',
    state.form.loanAmount ? String(state.form.loanAmount) : ''
  );
  const loanErr = errorSpan(loanWrap);

  loanInput.addEventListener('input', () => {
    state.form.loanAmount = loanInput.value
      ? Number(loanInput.value)
      : null;
  });

  /* =====================================================
     FILE INPUTS
  ===================================================== */

  const salaryWrap = field('Salary Slip');
  const salaryInput = input(salaryWrap, 'file', '');
  const salaryErr = errorSpan(salaryWrap);

  salaryInput.addEventListener('change', () => {
    state.form.salarySlip = salaryInput.files?.[0] ?? null;
  });

  const bankWrap = field('Bank Statement');
  const bankInput = input(bankWrap, 'file', '');
  const bankErr = errorSpan(bankWrap);

  bankInput.addEventListener('change', () => {
    state.form.bankStatement = bankInput.files?.[0] ?? null;
  });

  /* =====================================================
     CHECKBOXES
  ===================================================== */

  const infoWrap = field('');
  const infoCheckbox = document.createElement('input');
  infoCheckbox.type = 'checkbox';
  infoCheckbox.checked = state.form.infoAccurate;
  infoWrap.append('Information Accurate', infoCheckbox);

  infoCheckbox.addEventListener('change', () => {
    state.form.infoAccurate = infoCheckbox.checked;
  });

  const termsWrap = field('');
  const termsCheckbox = document.createElement('input');
  termsCheckbox.type = 'checkbox';
  termsCheckbox.checked = state.form.termsAccepted;
  termsWrap.append('Accept Terms & Conditions', termsCheckbox);

  termsCheckbox.addEventListener('change', () => {
    state.form.termsAccepted = termsCheckbox.checked;
  });

  /* =====================================================
     SUBMIT / UPDATE
  ===================================================== */

  const submitBtn = document.createElement('button');
  submitBtn.type = 'submit';
  submitBtn.textContent = state.form.editId
    ? 'Update Application'
    : 'Submit Application';

  form.appendChild(submitBtn);

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const errors: FormErrors = validateForm(state.form);

    [
      [fullNameErr, errors.fullName],
      [dobErr, errors.dob],
      [genderErr, errors.gender],
      [emailErr, errors.email],
      [mobileErr, errors.mobile],
      [panErr, errors.pan],
      [aadhaarErr, errors.aadhaar],
      [empErr, errors.employmentType],
      [incomeErr, errors.monthlyIncome],
      [companyErr, errors.companyName],
      [loanErr, errors.loanAmount],
      [salaryErr, errors.salarySlip],
      [bankErr, errors.bankStatement]
    ].forEach(([el, msg]) => {
      el.textContent = msg ?? '';
    });

    if (Object.keys(errors).length > 0) return;

    const application: LoanApplication = {
      id: state.form.editId ?? crypto.randomUUID(),
      ...state.form,
      age: state.form.age!
    };

    if (state.form.editId) {
      const idx = state.submissions.findIndex(a => a.id === state.form.editId);
      state.submissions[idx] = application;
    } else {
      state.submissions.push(application);
    }

    state.form = {
      ...state.form,
      editId: null,
      fullName: '',
      dob: '',
      age: null,
      gender: 'MALE',
      email: '',
      mobile: '',
      pan: '',
      aadhaar: '',
      employmentType: 'SALARIED',
      monthlyIncome: 0,
      yearsInJob: 0,
      companyName: '',
      liabilities: null,
      loanAmount:0,
      loanPurpose: 'HOME',
      loanTenure: 12,
      existingLoans: false,
      creditScore: null,
      bankAccountType: 'SAVINGS',
      salarySlip: null,
      bankStatement: null,
      infoAccurate: false,
      termsAccepted: false
    };

    renderApp();
  });

  return form;
}