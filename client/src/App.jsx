// client/src/App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
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

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Define routes here */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
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
