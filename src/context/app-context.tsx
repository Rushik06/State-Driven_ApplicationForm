/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useReducer } from 'react';
import type { ReactNode, Dispatch } from 'react';
import type { AppState } from '../types/app-state.type';
import { initialAppState } from '../app.state';
import type { LoanApplication } from '../types/loan-application.type';
import { loadSubmissions, saveSubmissions } from '../app.storage';
import { useEffect } from 'react';

//  Actions 
type Action =
  | { type: 'UPDATE_FORM'; payload: Partial<AppState['form']> }
  | { type: 'RESET_FORM' }
  | { type: 'ADD_SUBMISSION'; payload: LoanApplication }
  | { type: 'UPDATE_SUBMISSION'; payload: LoanApplication }
  | { type: 'DELETE_SUBMISSION'; payload: string }
  | { type: 'LOAD_FORM_FOR_EDIT'; payload: LoanApplication };

// Reducer 
function reducer(state: AppState, action: Action): AppState {
  const nextState:AppState=state;
  switch (action.type) {
    case 'UPDATE_FORM':
      return {
        ...state,
        form: {
          ...state.form,
          ...action.payload
        }
      };

    case 'LOAD_FORM_FOR_EDIT':
      return {
        ...state,
        form: {
          ...action.payload,
          editId: action.payload.id,
          salarySlip: null,
          bankStatement: null
        }
      };

    case 'RESET_FORM':
      return {
        ...state,
        form: initialAppState.form
      };

    case 'ADD_SUBMISSION':
      return {
        ...state,
        submissions: [...state.submissions, action.payload]
      };

    case 'UPDATE_SUBMISSION':
      return {
        ...state,
        submissions: state.submissions.map(app =>
          app.id === action.payload.id ? action.payload : app
        )
      };

    case 'DELETE_SUBMISSION':
      return {
        ...state,
        submissions: state.submissions.filter(
          s => s.id !== action.payload
        )
      };

    default:
      return state;
  }

  saveSubmissions(nextState.submissions);
  return nextState;
}

// Context 
const AppContext = createContext<{
  state: AppState;
  dispatch: Dispatch<Action>;
} | null>(null);

// Provider 
export function AppProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialAppState,
    (init)=>
      ({...init ,submissions:loadSubmissions()}));
  useEffect(() => {
    saveSubmissions(state.submissions);
  }, [state.submissions]);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
}

// Hook 
export function useApp() {
  const context = useContext(AppContext);

  if (!context) {
    throw new Error('useApp in AppProvider');
  }
  return context;
}