import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";


function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handlePassword = (event) => {
    setPassword(event.target.value);
  };


  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  
//falta el path en navigate

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .post("/api/user/login", { email, password })
      .then((data) => setUser(data)) 
      .then(() => navigate("/"))
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="content-formulario">
      <h3>Ingrese su usuario y contraseña</h3>
      <form onSubmit={handleSubmit} className="formulario">
        <label>Email</label>
        <input
          onChange={handleEmailChange}
          value={email}
          type="email"
          placeholder="Email"
        />

        <label>Contraseña</label>
        <input
          onChange={handlePassword}
          value={password}
          type="password"
          placeholder="password"
        />

        <button type="submit" className="btn-formulario">
          Iniciar Sesión
        </button>
      </form>
    </div>
  );
}

export default Login;
