import { state } from '../app.state';
import { renderApp } from './App';
import { saveToStorage } from '../app.storage';
import type { LoanApplication } from '../types/loan-application.type';

export function Table(): HTMLDivElement {
  const section = document.createElement('div');
  section.className = 'table-section';

  const wrapper = document.createElement('div');
  wrapper.className = 'table-wrapper';

  const table = document.createElement('table');

  //thead 
  const thead = document.createElement('thead');
  const headRow = document.createElement('tr');

  const headers: readonly string[] = [
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
    'Infoaccurate',
    'Terms',
    'Actions'
    
  ];

  headers.forEach(text => {
    const th = document.createElement('th');
    th.textContent = text;
    headRow.appendChild(th);
  });

  thead.appendChild(headRow);
  table.appendChild(thead);
//t-body

  const tbody = document.createElement('tbody');

  if (state.submissions.length === 0) {
    const emptyRow = document.createElement('tr');
    const emptyCell = document.createElement('td');
    emptyCell.colSpan = headers.length;
    emptyCell.textContent = 'No applications submitted yet';
    emptyRow.appendChild(emptyCell);
    tbody.appendChild(emptyRow);
  } else {
    state.submissions.forEach(app => {
      tbody.appendChild(renderRow(app));
    });
    
  }

  table.appendChild(tbody);
  wrapper.appendChild(table);
  section.appendChild(wrapper);

  return section;
}

//row render
function renderRow(app: LoanApplication): HTMLTableRowElement {
  const row = document.createElement('tr');

  const cells: readonly (string | number | null | boolean)[] = [
    app.fullName,
    app.dob,
    app.age,
    app.gender,
    app.email,
    app.mobile,
    app.pan,
    app.aadhaar,
    app.employmentType,
    app.companyName,
    app.monthlyIncome,
    app.yearsInJob,
    app.liabilities ?? '-',
    app.loanAmount,
    app.loanPurpose,
    app.loanTenure,
    app.existingLoans ? 'Yes' : 'No',
    app.creditScore ?? '-',
    app.bankAccountType,
    app.salarySlip ? app.salarySlip.name : '-',
    app.bankStatement ? app.bankStatement.name : '-',
    app.infoAccurate?'Yes' : 'No',
    app.termsAccepted?'Yes' : 'No'
  ];

  cells.forEach(value => {
    const td = document.createElement('td');
    td.textContent = String(value);
    row.appendChild(td);
  });

  //Actions
  const actionTd = document.createElement('td');

  const editBtn = document.createElement('button');
  editBtn.className = 'action-btn edit-btn';
  editBtn.type = 'button';
  editBtn.textContent = 'Edit';

  editBtn.addEventListener('click', () => {
    state.form = {
      ...app,
      editId: app.id,
      salarySlip: null,
      bankStatement: null
    };
    saveToStorage();
    renderApp();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

 const deleteBtn = document.createElement('button');
  deleteBtn.className = 'action-btn delete-btn';
  deleteBtn.textContent = 'Delete';

  deleteBtn.addEventListener('click', () => {
    const confirmed = window.confirm('Delete this row?');
    if (!confirmed) return;

    state.submissions = state.submissions.filter(
      a => a.id !== app.id
    );

 
    saveToStorage();
    renderApp();
  });
  actionTd.append(editBtn, deleteBtn);
  row.appendChild(actionTd);

  return row;
}