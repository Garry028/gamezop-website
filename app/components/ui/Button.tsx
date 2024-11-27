import React from "react";

interface ButtonProps {
  icon: React.ReactNode;
  label: string;
  fullWidth?: boolean;
  onClick?: () => void;
}

const Button: React.FC<ButtonProps> = ({
  icon,
  label,
  fullWidth = false,
  onClick,
}) => {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-x-2 px-4 py-2 rounded-full bg-gray-100 transition ${
        fullWidth ? "w-full justify-start" : ""
      }`}
    >
      <span className="text-xl text-gray-700 ">{icon}</span>
      <span className="text-sm font-medium text-gray-700">{label}</span>
    </button>
  );
};

export default Button;
