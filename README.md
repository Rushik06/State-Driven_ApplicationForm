# Loan Application Form

## Description

This is a simple Loan Application Form project made using **Vanilla TypeScript** with **Vite**.  
The project focuses on managing UI using a single application state instead of directly changing the DOM everywhere.

Users can enter loan details, submit the form, and see the submitted data in a table.  
Once submitted, the data is saved in `localStorage`, so it doesn’t disappear after refreshing the page.

---

## Business Rules

- Takes loan application details from the user
- Shows submitted data in a table
- Allows editing and deleting entries
- Saves submitted records in localStorage
- Keeps the form empty after refresh (unless editing)

---

## Tech-stack

- Vanilla TypeScript
- Vite
- HTML
- CSS
- Browser LocalStorage

---

## How It Works (Simple Explanation)

1. User fills the loan form
2. Clicking submit updates the app state
3. The table reads data from the state and updates
4. Submitted data is saved in localStorage
5. On refresh, only table data comes back
6. Form stays empty unless user clicks edit

---
## Github REPO:

https://github.com/Rushik06/State-Driven_ApplicationForm

---

## Running the Project

```bash
npm install
npm run dev

