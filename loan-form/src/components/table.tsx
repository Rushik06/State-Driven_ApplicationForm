import type { LoanApplication } from '../types/loan-application.type';
import { useApp } from '../context/app-context';
import { useToast } from '../context/toast-context';

const HEADERS: readonly string[] = [
  'Full Name',
  'DOB',
  'Age',
  'Gender',
  'Email',
  'Mobile',
  'PAN',
  'Aadhaar',
  'Employment',
  'Company',
  'Income',
  'Years in Job',
  'Liabilities',
  'Loan Amount',
  'Loan Purpose',
  'Tenure',
  'Existing Loans',
  'Credit Score',
  'Bank Type',
  'Salary Slip',
  'Bank Statement',
  'Info Accurate',
  'Terms',
  'Actions'
];

export function Table() {
  const { state, dispatch } = useApp();
  const { showToast } = useToast();

  const submissions = state.submissions;

  function handleEdit(app: LoanApplication) {
    dispatch({
      type: 'LOAD_FORM_FOR_EDIT',
      payload: app
    });

    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function handleDelete(id: string) {
    const confirmed = window.confirm('DELETE THE ROW');
    if (!confirmed) return;

    dispatch({
      type: 'DELETE_SUBMISSION',
      payload: id
    });

    showToast('Deleted row successfully');
  }

  return (
    <div className="table-section">
      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              {HEADERS.map(h => (
                <th key={h}>{h}</th>
              ))}
            </tr>
          </thead>

          <tbody>
            {submissions.length === 0 ? (
              <tr>
                <td colSpan={HEADERS.length}>
                  No applications submitted yet
                </td>
              </tr>
            ) : (
              submissions.map(app => (
                <TableRow
                  key={app.id}
                  app={app}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                />
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

//  Row Component 

interface RowProps {
  app: LoanApplication;
  onEdit: (app: LoanApplication) => void;
  onDelete: (id: string) => void;
}

function TableRow({ app, onEdit, onDelete }: RowProps) {
  return (
    <tr>
      <td>{app.fullName}</td>
      <td>{app.dob}</td>
      <td>{app.age}</td>
      <td>{app.gender}</td>
      <td>{app.email}</td>
      <td>{app.mobile}</td>
      <td>{app.pan}</td>
      <td>{app.aadhaar}</td>
      <td>{app.employmentType}</td>
      <td>{app.companyName}</td>
      <td>{app.monthlyIncome}</td>
      <td>{app.yearsInJob}</td>
      <td>{app.liabilities ?? '-'}</td>
      <td>{app.loanAmount}</td>
      <td>{app.loanPurpose}</td>
      <td>{app.loanTenure}</td>
      <td>{app.existingLoans ? 'Yes' : 'No'}</td>
      <td>{app.creditScore ?? '-'}</td>
      <td>{app.bankAccountType}</td>
      <td>{app.salarySlip ? app.salarySlip.name : '-'}</td>
      <td>{app.bankStatement ? app.bankStatement.name : '-'}</td>
      <td>{app.infoAccurate ? 'Yes' : 'No'}</td>
      <td>{app.termsAccepted ? 'Yes' : 'No'}</td>

      <td>
        <button
          type="button"
          className="action-btn edit-btn"
          onClick={() => onEdit(app)}
        >
          Edit
        </button>

        <button
          type="button"
          className="action-btn delete-btn"
          onClick={() => onDelete(app.id)}
        >
          Delete
        </button>
      </td>
    </tr>
  );
}