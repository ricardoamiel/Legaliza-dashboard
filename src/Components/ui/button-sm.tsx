import React from "react";

interface ButtonSmProps {
  children: React.ReactNode; // Contenido del botón
  onClick?: () => void; // Acción al hacer clic
  className?: string; // Clases CSS opcionales
  disabled?: boolean; // Si el botón está deshabilitado
  type?: "button" | "submit" | "reset"; // Tipo del botón
}

const ButtonSm: React.FC<ButtonSmProps> = ({ children, onClick, className, disabled, type = "button" }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`px-4 py-2 rounded-lg text-sm font-bold ${className}`}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default ButtonSm;
