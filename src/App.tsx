import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './context/AuthContext';
import { Register } from './pages/Authentication/Register';
import { ChatbotIntegration } from './pages/ChatbotIntergration/views/ChatbotIntegration';
import { Login } from './pages/Authentication/Login';
import ProtectedRoute from './lib/protected_routes';
import SetupOrganization from './pages/SetupOrganization/views/SetupOrganization';
import EmailVerification from './pages/Authentication/email_verification';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Protected Routes */}
          <Route element={<ProtectedRoute />}>
            <Route path="/" element={<SetupOrganization />} />
            <Route path="/email/verification" element={<EmailVerification />} />
            <Route path="/setup-organization" element={<SetupOrganization />} />
            <Route path="/chatbot-integration" element={<ChatbotIntegration />} />
          </Route>
        </Routes>
      </Router>
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: '#363636',
            color: '#fff',
            borderRadius: '10px',
          },
          success: {
            iconTheme: {
              primary: '#4ade80',
              secondary: '#fff',
            },
          },
          error: {
            iconTheme: {
              primary: '#ef4444',
              secondary: '#fff',
            },
          },
        }}
      />
    </AuthProvider>
  );
}

export default App;