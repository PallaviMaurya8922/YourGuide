import { createRoot } from 'react-dom/client';
import App from './app/App';
import { TripExpensesProvider } from './app/context/TripExpensesContext';
import './styles/index.css';

createRoot(document.getElementById('root')!).render(
  <TripExpensesProvider>
    <App />
  </TripExpensesProvider>,
);
