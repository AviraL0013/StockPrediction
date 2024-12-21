import React from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../contexts/UserContext";

const Logout = () => {
  const { setUser } = useUser(); // Access the UserContext
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear user data from localStorage
    localStorage.removeItem("user");

    // Reset UserContext
    setUser(null);

    // Redirect to login page
    navigate("/dashboard");
  };

  return (
    <div className="bg-gray-800 p-4 text-white flex justify-end">
      <button
        className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-md"
        onClick={handleLogout}
      >
        Logout
      </button>
    </div>
  );
};

export default Logout;
