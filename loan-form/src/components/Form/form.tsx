import { PersonalForm } from './form-personal';
import { IdentityForm } from './form-identity';
import { EmploymentForm } from './form-employment';
import { LoanForm } from './form-loan';
import { BankForm } from './form-bank';
import { DeclarationForm } from './form-declaration';
import { useFormSubmit } from './form-submit';

export function Form() {
  const { handleSubmit } = useFormSubmit();

  return (
    <form onSubmit={handleSubmit}>
      {/* Personal Details */}
      <PersonalForm />

      {/* Identity Details */}
      <IdentityForm />

      {/* Employment & Income */}
      <EmploymentForm />

      {/* Loan Requirements */}
      <LoanForm />

      {/* Banking & Documents */}
      <BankForm />

      {/* Declarations + Submit */}
      <DeclarationForm />
    </form>
  );
}