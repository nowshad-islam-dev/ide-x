// client/src/pages/HomePage.jsx
import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';

const HomePage = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/'); // Redirect to home page after logout
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navbar */}
      <nav className="bg-white shadow-md">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-blue-600">IDE-X</h1>
          <div className="flex space-x-4">
            {!user ? (
              <>
                <Link
                  to="/login"
                  className="text-gray-700 hover:text-blue-500 font-medium"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="text-gray-700 hover:text-blue-500 font-medium"
                >
                  Register
                </Link>
              </>
            ) : (
              <>
                <Link
                  to="/snippets"
                  className="text-gray-700 hover:text-blue-500 font-medium"
                >
                  View Snippets
                </Link>
                <button
                  onClick={handleLogout}
                  className="text-red-500 hover:text-red-700 font-medium"
                >
                  Logout
                </button>
              </>
            )}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-8">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">
          Welcome to IDE-X
        </h1>
        <p className="text-lg text-center text-gray-600">
          Create, save, and share your code snippets with ease.
        </p>
        <p className="text-center p-4">
          <button className="bg-blue-700 hover:bg-blue-500 p-3 rounded-xl text-white font-semibold">
            <Link to="/editor">Go To Editor</Link>
          </button>
        </p>
      </main>

      {/* Footer */}
      <footer className="bg-white shadow-md mt-auto">
        <div className="container mx-auto px-6 py-4 text-center text-gray-600">
          &copy; {new Date().getFullYear()} IDE-X. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
