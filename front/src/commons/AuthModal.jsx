import { useEffect, useRef } from "react";
import SignupForm from "./SignupForm";

const AuthModal = ({ isOpen, onClose }) => {
  const modalRef = useRef();
  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleOutsideClick);
    }

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [isOpen, onClose]);

  return (
    <div
      className={`fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-gray-800 bg-opacity-50 transition-opacity ${
        isOpen
          ? "opacity-100 pointer-events-auto"
          : "opacity-0 pointer-events-none"
      }`}
    >
      <div
        ref={modalRef}
        className="bg-white p-8 shadow-md rounded-md max-w-sm w-full"
      >
        <h2 className="text-2xl font-semibold mb-4">Sign Up</h2>
        <SignupForm />
        <button
          className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500 mt-4"
          onClick={onClose}
        >
          Cerrar
        </button>
      </div>
    </div>
  );
};

export default AuthModal;
