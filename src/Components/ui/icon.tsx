import React from "react";

interface IconProps {
  name: string; // Nombre del ícono
  className?: string; // Clases CSS opcionales para estilos
}

const Icon: React.FC<IconProps> = ({ name, className }) => {
  // Lógica para obtener el ícono basado en `name`
  switch (name) {
    case "magnifying-glass":
      return <span className={`material-icons ${className}`}>search</span>;
    case "admin":
      return <span className={`material-icons ${className}`}></span>;
    case "edit-pen":
      return <span className={`material-icons ${className}`}>edit</span>;
    case "cube-delete-two":
      return <span className={`material-icons ${className}`}>delete</span>;
    default:
      return null;
  }
};

export default Icon;
