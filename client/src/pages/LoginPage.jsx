// client/src/pages/LoginPage.jsx
import { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import AuthContext from '../context/AuthContext';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(e.target.value);
    await login({ email, password });
    navigate('/');
  };

  const handleGithubLogin = () => {
    window.location.href = 'https://ide-x.onrender.com/api/auth/github'; // Redirect to Github OAuth
  };
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded shadow-md w-full max-w-sm"
      >
        <h2 className="text-2xl font-bold mb-4">Login</h2>
        <div className="mb-4">
          <label className="block text-gray-700">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2 border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3 py-2 border rounded"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
        >
          Login
        </button>

        <Link
          to="/forgot-password"
          className=" text-red-500 hover:text-red-400 font-medium ml-14 "
        >
          Forgot your password?
        </Link>

        {/* GitHub OAuth Button */}
        <button
          onClick={handleGithubLogin}
          className="w-full mt-4 bg-gray-800 text-white py-2 rounded hover:bg-gray-900"
        >
          Login with GitHub
        </button>
        <Link
          to="/register"
          className="text-gray-700 hover:text-blue-500 font-medium ml-14"
        >
          Register a new account
        </Link>
      </form>
    </div>
  );
};

export default LoginPage;
