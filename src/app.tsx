import { Form } from './components/form/form';
import { Table } from './components/table';
import { ThemeToggle } from './components/theme-toggle';
import './App.css';

function App() {
  return (
    <div className="app">
      {/* Theme Toggle */}
      <ThemeToggle />

      {/* App Title */}
      <h1 className="main-title">Loan Application Form</h1>

      {/* Layout */}
      <div className="layout">
        {/* Form */}
        <Form />

        {/* Table */}
        <Table />
      </div>
    </div>
  );
}

export default App;