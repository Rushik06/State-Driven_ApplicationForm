import { renderPersonalDetails } from './Form.personal';
import { renderIdentityDetails } from './Form.identity';
import { renderEmployment } from './Form.employment';
import { renderLoanRequirements } from './Form.loan';
import { renderDeclarations } from './Form.declaration';
import { renderBankingAndDocuments } from './Form.bank';
import { attachSubmit } from './Form.submit';
export function Form(): HTMLFormElement {
  const form = document.createElement('form');

  /* ---------- Render Sections ---------- */
  const personal = renderPersonalDetails(form);
  const identity = renderIdentityDetails(form);
  const employment = renderEmployment(form);
  const loan = renderLoanRequirements(form);
  const bank = renderBankingAndDocuments(form);
  const declarations = renderDeclarations(form);

  /* ---------- Wire Submit ---------- */
  attachSubmit(form, {
    ...personal,
    ...identity,
    ...employment,
    ...loan,
    ...bank,
    ...declarations
  });

  return form;
}