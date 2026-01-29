import { Form } from './components/Form/form';
import { Table } from './components/table';
import { ThemeToggle } from './components/theme-toggle';
import { AppProvider } from './context/app-context';
import './App.css';

function App() {
  return (
    <AppProvider>
      <div className="app">
        {/* Theme Toggle */}
        <ThemeToggle />

        {/* App Title */}
        <h1 className="main-title">Loan Application Form</h1>

        {/* Layout */}
        <div className="layout">
          <Form />
          <Table />
        </div>
      </div>
    </AppProvider>
  );
}

export default App;