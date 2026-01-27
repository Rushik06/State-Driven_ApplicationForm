import { renderPersonalDetails } from './form-personal';
import { renderIdentityDetails } from './form-identity';
import { renderEmployment } from './form-employment';
import { renderLoanRequirements } from './form-loan';
import { renderDeclarations } from './form-declaration';
import { renderBankingAndDocuments } from './form-bank';
import { attachSubmit } from './form-submit';
export function Form(): HTMLFormElement {
  const form = document.createElement('form');

  //state render sections
  const personal = renderPersonalDetails(form);
  const identity = renderIdentityDetails(form);
  const employment = renderEmployment(form);
  const loan = renderLoanRequirements(form);
  const bank = renderBankingAndDocuments(form);
  const declarations = renderDeclarations(form);

  attachSubmit(form, {
    ...personal,
    ...identity,
    ...employment,
    ...loan,
    ...bank,
    ...declarations,
  });

  return form;
}
