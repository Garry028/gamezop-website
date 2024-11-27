import React from "react";
import { FaExclamationTriangle } from "react-icons/fa";

interface ErrorProps {
  message?: string;
}

const Error: React.FC<ErrorProps> = ({ message = "An error occurred." }) => {
  return (
    <div className="flex flex-col items-center justify-center mt-10">
      <FaExclamationTriangle className="text-4xl text-red-500 mb-4" />
      <p className="text-lg text-red-600">{message}</p>
    </div>
  );
};

export default Error;
