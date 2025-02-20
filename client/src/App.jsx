// client/src/App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Components
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ProtectedRoute from './components/ProtectedRoute';
import CodeEditor from './components/CodeEditor';

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
          <Route path="/" element={<h1>Welcome to IDE-X</h1>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
