import { PersonalForm } from './form-personal';
import { IdentityForm } from './form-identity';
import { EmploymentForm } from './form-employment';
import { LoanForm } from './form-loan';
import { BankForm } from './form-bank';
import { DeclarationForm } from './form-declaration';
import { useFormSubmit } from './form-submit';

export function Form() {
  const { handleSubmit,errors } = useFormSubmit();

  return (
    <form onSubmit={handleSubmit}>
      {/* Personal Details */}
      <PersonalForm submitErrors={errors}/>

      {/* Identity Details */}
      <IdentityForm submitErrors={errors} />

      {/* Employment & Income */}
      <EmploymentForm submitErrors={errors} />

      {/* Loan Requirements */}
      <LoanForm submitErrors={errors}/>

      {/* Banking & Documents */}
      <BankForm submitErrors={errors} />

      {/* Declarations + Submit */}
      <DeclarationForm submitErrors={errors}/>
    </form>
  );
}