import React, { useState, useContext } from 'react';
import { AuthContext } from '../provider';
import {useNavigate } from "react-router-dom";

export const Register = () => {
  const [formData, setFormData] = useState({
    email: '',
    username: '',
    password: '',
    confirmPassword: ''
  });
  const authProvider = useContext(AuthContext);
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    const errors = {};
    if (!formData.email || !formData.email.includes('@')) {
      errors.email = 'Please enter a valid email address';
    }
    if (!formData.username) {
      errors.username = 'Please enter a username';
    }
    if (formData.password.length < 8 ||
        !/[A-Z]/.test(formData.password) ||
        !/[!@#$%^&*(),.?":{}|<>]/.test(formData.password)) {
      errors.password = 'Password must be at least 8 characters long, contain a capital letter, and a special character';
    }
    if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = 'Passwords do not match';
    }

    if (Object.keys(errors).length === 0) {
      // Submit the form
      console.log('Form submitted:', formData);
      await authProvider.signUp(formData.email, formData.password,formData.username).then(() => {
        navigate('/dashboard', { replace: true });
      })  

    } else {
      setErrors(errors);

    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="text-center text-3xl font-extrabold text-gray-900">Sign up</h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email address</label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className={`mt-1 p-3 block w-full shadow-sm border border-gray-300 rounded-md ${errors.email ? 'border-red-500' : ''}`}
                placeholder="Email address"
                value={formData.email}
                onChange={handleChange}
              />
              {errors.email && <p className="mt-2 text-sm text-red-600">{errors.email}</p>}
            </div>

            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username</label>
              <input
                id="username"
                name="username"
                type="text"
                autoComplete="username"
                required
                className={`mt-1 p-3 block w-full shadow-sm border border-gray-300 rounded-md ${errors.username ? 'border-red-500' : ''}`}
                placeholder="Username"
                value={formData.username}
                onChange={handleChange}
              />
              {errors.username && <p className="mt-2 text-sm text-red-600">{errors.username}</p>}
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="new-password"
                required
                className={`mt-1 p-3 block w-full shadow-sm border border-gray-300 rounded-md ${errors.password ? 'border-red-500' : ''}`}
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
              />
              {errors.password && <p className="mt-2 text-sm text-red-600">{errors.password}</p>}
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">Confirm Password</label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                autoComplete="new-password"
                required
                className={`mt-1 p-3 block w-full shadow-sm border border-gray-300 rounded-md ${errors.confirmPassword ? 'border-red-500' : ''}`}
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={handleChange}
              />
              {errors.confirmPassword && <p className="mt-2 text-sm text-red-600">{errors.confirmPassword}</p>}
            </div>

            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Sign up
              </button>
            </div>
          </form>

          <div className="mt-6">
            <p className="text-sm text-center text-gray-600">Already have an account? <a href="signin" className="font-medium text-indigo-600 hover:text-indigo-500">Log in</a></p>
          </div>
        </div>
      </div>
    </div>
  );
};
