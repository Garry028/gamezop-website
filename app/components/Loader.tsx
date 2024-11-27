import React from "react";
import { FaSpinner } from "react-icons/fa";

interface LoaderProps {
  message?: string;
}

const Loader: React.FC<LoaderProps> = ({ message = "Loading..." }) => {
  return (
    <div className="flex flex-col items-center justify-center mt-10 h-screen">
      <FaSpinner className="animate-spin text-4xl text-indigo-600 mb-4" />
      <p className="text-lg text-gray-700">{message}</p>
    </div>
  );
};

export default Loader;
