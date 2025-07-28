import { BrowserRouter as Router } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider } from './contexts/AuthContext';
import { I18nProvider } from './contexts/I18nContext';
import AppRoutes from './routes/AppRoutes';
import './App.css';

const queryClient = new QueryClient();

function App() {
  const savedLocale = localStorage.getItem('preferred-locale') || 'tr';

  return (
    <QueryClientProvider client={queryClient}>
      <I18nProvider defaultLocale={savedLocale}>
        <AuthProvider>
          <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
            <div className="">
              <AppRoutes />
            </div>
          </Router>
        </AuthProvider>
      </I18nProvider>
    </QueryClientProvider>
  );
}

export default App;
