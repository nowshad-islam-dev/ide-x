// client/src/components/Navbar.jsx
import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';

// React icons
import { FaMoon } from 'react-icons/fa';
import { FaSun } from 'react-icons/fa';

import AuthContext from '../context/AuthContext';
import ThemeContext from '../context/ThemeContext';
const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const { isDarkMode, toggleTheme } = useContext(ThemeContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/'); // Redirect to home page after logout
  };
  return (
    <nav className="bg-white shadow-md dark:bg-gray-800">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-blue-600">IDE-X</h1>
        <div className="flex space-x-4">
          {!user ? (
            <>
              <Link
                to="/login"
                className="text-gray-700 hover:text-blue-500 font-medium transition duration-300"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="text-gray-700 hover:text-blue-500 font-medium  transition duration-300"
              >
                Register
              </Link>
            </>
          ) : (
            <>
              <Link
                to="/snippets"
                className="text-gray-700 hover:text-blue-500 font-medium  transition duration-300 dark:text-gray-300 dark:hover:text-blue-400"
              >
                View Snippets
              </Link>
              <button
                onClick={handleLogout}
                className="text-red-500 hover:text-red-700 font-medium  transition duration-300  dark:text-red-400 dark:hover:text-red-500"
              >
                Logout
              </button>
            </>
          )}
          {/* Dark Mode Toggle Button */}
          <button
            onClick={toggleTheme}
            className="text-gray-700 hover:text-blue-500 font-medium transition duration-300 dark:text-gray-300 dark:hover:text-blue-400"
          >
            {isDarkMode ? <FaSun /> : <FaMoon />}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
