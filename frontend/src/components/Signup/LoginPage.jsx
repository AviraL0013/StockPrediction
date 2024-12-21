import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useUser } from "../contexts/UserContext";

const LoginPage = ({ closeModal, switchToRegister }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { setUser } = useUser(); // Update UserContext
  const navigate = useNavigate();

  const validateForm = () => {
    if (!username || !password) {
      setError("Both username and password are required.");
      return false;
    }
    setError("");
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      console.log("Sending login request..."); // Debug log
      const response = await axios.post("http://localhost:5000/api/login", {
        username,
        password,
      });

      console.log("Login response received:", response.data); // Debug log

      if (response.status === 200) {
        const user = {
          username: response.data.username,
          token: response.data.token,
          password:response.data.password
        };

        console.log("User object to be saved:", user); // Debug log
        localStorage.setItem("user", JSON.stringify(user));
        setUser(user); // Update UserContext
        alert("Login successful");
        closeModal();
        navigate("/dashboard");
      }
    } catch (error) {
      console.error("Login error:", error); // Debug log
      if (error.response) {
        console.error("Error response data:", error.response.data); // Debug log
        setError(error.response.data.message);
      } else {
        setError("Something went wrong! Please try again later.");
      }
    }
  };

  return (
    <div className="bg-gray-800 p-8 rounded-lg text-white max-w-sm mx-auto">
      <h2 className="text-2xl font-bold mb-4">Login</h2>
      {error && <div className="text-red-500 text-sm mb-4">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <input
            type="text"
            placeholder="Username"
            className="w-full p-2 rounded-md bg-gray-700 focus:outline-none"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <input
            type="password"
            placeholder="Password"
            className="w-full p-2 rounded-md bg-gray-700 focus:outline-none"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 w-full p-2 rounded-md"
        >
          Login
        </button>
      </form>
      <p className="mt-4 text-center text-gray-400">
        New User?{" "}
        <span
          onClick={switchToRegister}
          className="text-blue-500 underline hover:text-blue-700 cursor-pointer"
        >
          Register
        </span>
      </p>
    </div>
  );
};

export default LoginPage;
