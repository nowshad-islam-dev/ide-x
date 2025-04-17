// client/src/App.jsx
import { useEffect } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/ReactToastify.css'; // Import default styles of react-toastify

// Components
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ProtectedRoute from './components/ProtectedRoute';
import CodeEditor from './components/CodeEditor';
import SnippetsPage from './pages/SnippetsPage';
import HomePage from './pages/HomePage';
import SharedSnippetPage from './pages/SharedSnippetPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import ResetPasswordPage from './pages/ResetPasswordPage';

function App() {
  useEffect(() => {
    // Extract token from URL query parameters
    const params = new URLSearchParams(location.search);
    const token = params.get('token');

    if (token) {
      // Store the token in localStorage
      localStorage.setItem('token', token);

      // Clear the token from the URL
      window.history.replaceState({}, document.title, '/');
      window.location.reload();
    }
  }, [location]);

  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Define routes here */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route
            path="/reset-password/:token"
            element={<ResetPasswordPage />}
          />
          <Route
            path="/editor"
            element={
              <ProtectedRoute>
                <CodeEditor />
              </ProtectedRoute>
            }
          />
          <Route
            path="/editor/:id"
            element={
              <ProtectedRoute>
                <CodeEditor />
              </ProtectedRoute>
            }
          />
          <Route
            path="/snippets"
            element={
              <ProtectedRoute>
                <SnippetsPage />
              </ProtectedRoute>
            }
          />
          <Route path="/shared/:shareableId" element={<SharedSnippetPage />} />
          <Route path="/" element={<HomePage />} />
        </Routes>
        <ToastContainer />
      </div>
    </Router>
  );
}

export default App;
