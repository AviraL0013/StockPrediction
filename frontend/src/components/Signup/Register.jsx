import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";

const Register = ({ closeModal }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false); // State to manage loading
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate input fields
    if (!username.trim() || !password.trim()) {
      alert("Both username and password are required!");
      return;
    }

    setLoading(true); // Set loading to true while request is in progress

    try {
      const response = await axios.post(
        'http://localhost:5000/api/register',
        { username, password }, // Send user data
        { headers: { 'Content-Type': 'application/json' } }
      );

      if (response.status === 201) {
        alert('Registration successful!');
        closeModal(); // Close modal after success
        navigate('/login'); // Navigate to login page
      }
    } catch (error) {
      if (error.response && error.response.data) {
        console.error('Server Error:', error.response.data);
        alert(error.response.data.message || 'An error occurred!');
      } else {
        console.error('Request Error:', error);
        alert('Something went wrong. Please try again later.');
      }
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  return (
    <div className="bg-gray-800 p-8 rounded-lg text-white max-w-sm mx-auto">
      <h2 className="text-2xl font-bold mb-4">Register</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <input
            type="text"
            placeholder="Username"
            className="w-full p-2 rounded-md bg-gray-700 focus:outline-none"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <input
            type="password"
            placeholder="Password"
            className="w-full p-2 rounded-md bg-gray-700 focus:outline-none"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button
          type="submit"
          className={`w-full p-2 rounded-md ${
            loading ? 'bg-gray-500' : 'bg-blue-600 hover:bg-blue-700'
          }`}
          disabled={loading}
        >
          {loading ? 'Registering...' : 'Register'}
        </button>
      </form>
      <p className="mt-4 text-center text-gray-400">
        Already registered?{" "}
        <Link
          to="/login"
          className="text-blue-500 underline hover:text-blue-700"
        >
          Login
        </Link>
      </p>
    </div>
  );
};

export default Register;
