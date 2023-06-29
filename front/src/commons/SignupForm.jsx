import { useFormik } from "formik";
import * as Yup from "yup";
import { useState } from "react";
import useInput from "../hooks/useInput";

const SignupForm = ({ switchAuthState }) => {
  const [isLoginRequest, setIsLoginRequest] = useState(false);
  const [errorMessage, setErrorMessage] = useState();

  const inputFirstName = useInput();
  const inputLastName = useInput();
  const inputEmail = useInput();
  const inputUsername = useInput();
  const inputPassword = useInput();
  const inputConfirmPassword = useInput();

  const signinForm = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      username: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object({
      username: Yup.string()
        .min(8, "username minimum 8 characters")
        .required("username is required"),
      password: Yup.string()
        .min(8, "password minimum 8 characters")
        .required("password is required"),
      firstName: Yup.string()
        .min(1, "firstName minimum 1 characters")
        .required("firstName is required"),
      lastName: Yup.string()
        .min(1, "lastName minimum 1 characters")
        .required("lastName is required"),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("password")], "confirmPassword not match")
        .min(8, "confirmPassword minimum 8 characters")
        .required("confirmPassword is required"),
    }),
    onSubmit: async (values) => {
      setErrorMessage(undefined);
      setIsLoginRequest(true);
    },
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Register");
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-4">
        <label
          htmlFor="firstName"
          className="block text-gray-700 text-sm font-bold mb-2"
        >
          Nombre:
        </label>
        <input
          type="text"
          id="firstName"
          name="firstName"
          placeholder="Nombre"
          className="border border-gray-300 rounded-md py-2 px-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          {...inputFirstName}
        />
      </div>
      <div className="mb-4">
        <label
          htmlFor="lastName"
          className="block text-gray-700 text-sm font-bold mb-2"
        >
          Apellido:
        </label>
        <input
          type="text"
          id="lastName"
          name="lastName"
          placeholder="Apellido"
          className="border border-gray-300 rounded-md py-2 px-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          {...inputLastName}
        />
      </div>
      <div className="mb-4">
        <label
          htmlFor="email"
          className="block text-gray-700 text-sm font-bold mb-2"
        >
          Correo Electrónico:
        </label>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="correo@example.com"
          className="border border-gray-300 rounded-md py-2 px-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          {...inputEmail}
        />
      </div>
      <div className="mb-4">
        <label
          htmlFor="username"
          className="block text-gray-700 text-sm font-bold mb-2"
        >
          Nombre de Usuario:
        </label>
        <input
          type="text"
          id="username"
          name="username"
          placeholder="Nombre de Usuario"
          className="border border-gray-300 rounded-md py-2 px-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          {...inputUsername}
        />
      </div>
      <div className="mb-4">
        <label
          htmlFor="password"
          className="block text-gray-700 text-sm font-bold mb-2"
        >
          Contraseña:
        </label>
        <input
          type="password"
          id="password"
          name="password"
          placeholder="Contraseña"
          className="border border-gray-300 rounded-md py-2 px-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          {...inputPassword}
        />
      </div>
      <div className="mb-4">
        <label
          htmlFor="confirmPassword"
          className="block text-gray-700 text-sm font-bold mb-2"
        >
          Confirmar Contraseña:
        </label>
        <input
          type="password"
          id="confirmPassword"
          name="confirmPassword"
          placeholder="Confirmar Contraseña"
          className="border border-gray-300 rounded-md py-2 px-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          {...inputConfirmPassword}
        />
      </div>
      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        Register
      </button>
    </form>
  );
};

export default SignupForm;
