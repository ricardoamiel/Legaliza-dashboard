import React from "react";

interface ModalProps {
  children: React.ReactNode; // Contenido del modal
  isOpen: boolean; // Si el modal está abierto
  onClose: () => void; // Acción al cerrar el modal
  modalClassName?: string; // Clases CSS adicionales para personalizar el modal
}

const Modal: React.FC<ModalProps> = ({ children, isOpen, onClose, modalClassName }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className={`bg-gray-900 rounded-lg shadow p-6 max-w-lg w-full ${modalClassName || ""}`}>
        <button
          className="absolute top-2 right-2 text-xl font-bold"
          onClick={onClose}
        >
          ×
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
