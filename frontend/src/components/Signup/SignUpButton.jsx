import React from "react";

const SignUpbutton = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-purple-500 hover:to-blue-500 text-white font-bold py-2 px-6 rounded-full shadow-lg transition-transform transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:focus:ring-purple-800"
    >
      SignUp
    </button>
  );
};

export default SignUpbutton;
