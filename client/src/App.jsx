// client/src/App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Define routes here */}
          <Route path="/" element={<h1>Welcome to CodePen Clone</h1>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
