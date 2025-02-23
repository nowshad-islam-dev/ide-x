// client/src/pages/HomePage.jsx
import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';

// React icons
import { FaMoon } from 'react-icons/fa';
import { FaSun } from 'react-icons/fa';

import AuthContext from '../context/AuthContext';
import ThemeContext from '../context/ThemeContext';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';

const HomePage = () => {
  const { user, logout } = useContext(AuthContext);
  const { isDarkMode, toggleTheme } = useContext(ThemeContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/'); // Redirect to home page after logout
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      {/* Navbar */}
      <Navbar />

      {/* Main Content */}
      <main className="container h-[75vh] mx-auto px-6 py-8">
        <h1 className="text-4xl font-bold text-center text-gray-800 dark:text-gray-200 mb-8">
          Welcome to IDE-X
        </h1>
        <p className="text-lg text-center text-gray-600 dark:text-gray-400">
          Create, save, and share your code snippets with ease.
        </p>
        <p className="text-center p-4">
          <button className="bg-blue-700 hover:bg-blue-500 p-3 rounded-xl text-white font-semibold transition duration-300">
            <Link to="/editor">Go To Editor</Link>
          </button>
        </p>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default HomePage;
