import { BrowserRouter as Router } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider } from './contexts/AuthContext';
import { I18nProvider } from './contexts/I18nContext';
import AppRoutes from './routes/AppRoutes';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';

const queryClient = new QueryClient();

function App() {
  const savedLocale = localStorage.getItem('preferred-locale') || 'tr';

  return (
    <QueryClientProvider client={queryClient}>
      <I18nProvider defaultLocale={savedLocale}>
        <AuthProvider>
          <Router>
            <div className="">
              <AppRoutes />
            </div>
            <ToastContainer
              position="top-right"
              autoClose={3000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="light"
            />
          </Router>
        </AuthProvider>
      </I18nProvider>
    </QueryClientProvider>
  );
}

export default App;
