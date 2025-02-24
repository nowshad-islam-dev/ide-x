// client/src/pages/ResetPasswordPage.jsx
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

import axiosInstance from '../axiosInstance.js';

const ResetPasswordPage = () => {
  const token = useParams().token;
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if password matches, return otherwise
    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    try {
      await axiosInstance.post(`/auth/reset-password/${token}`, { password });
      toast.success(
        'Password reset successful. You can now log in with your new password.'
      );
    } catch (err) {
      console.error(err.response?.data?.message || 'Failed to reset password');
      toast.error('Failed to reset password. Please try again.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
      <div className="bg-white dark:bg-gray-800 p-8 rounded-md shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-200">
          Reset Password
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 dark:text-gray-300 mb-1">
              New Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your new password"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 dark:text-gray-300 mb-1">
              Confirm Password
            </label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm your new password"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 transition duration-300"
          >
            Reset Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPasswordPage;
