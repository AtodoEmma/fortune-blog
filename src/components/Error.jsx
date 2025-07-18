import React from "react";
import { useNavigate } from "react-router-dom";

const Error = () => {
  const redir = useNavigate();

  return (
    <div className="flex items-center flex-col justify-center h-[80vh] bg-gray-100 dark:bg-gray-900">
      <h1 className="text-4xl font-bold text-red-600 mb-4">
        404 - Page Not Found
      </h1>
      <p className="text-lg text-gray-700 dark:text-gray-300 mb-6 text-center">
        Oops! The page you're looking for doesn't exist or has been moved.
      </p>
      <button
        onClick={() => redir("/")}
        className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
      >
        Go Back Home
      </button>
    </div>
  );
};

export default Error;
