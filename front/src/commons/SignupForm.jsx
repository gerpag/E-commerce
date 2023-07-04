import { LoadingButton } from "@mui/lab";
import { Alert, Box, Button, Stack, TextField } from "@mui/material";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import * as Yup from "yup";
import { setAuthModalOpen } from "../redux/features/authModalSlice";
import { setUser } from "../redux/features/userSlice";
import userApi from "../api/modules/user.api";

const SignupForm = ({ switchAuthState }) => {
  const dispatch = useDispatch();

  const [isLoginRequest, setIsLoginRequest] = useState(false);
  const [errorMessage, setErrorMessage] = useState();

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
      firstName: Yup.string()
        .min(1, "Nombre mínimo 1 caracter")
        .required("Nombre es requerido"),
      lastName: Yup.string()
        .min(1, "Apellido mpinimo 1 caracter")
        .required("Apellido es requerido"),
      email: Yup.string()
        .email("Correo electrónico inválido")
        .required("Correo es requerido"),
      username: Yup.string()
        .min(8, "Usuario mínimo 8 caracteres")
        .required("Usuario es requerido"),
      password: Yup.string()
        .min(8, "Contraseña mínimo 8 caracteres")
        .required("Contraseña es requerido"),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("password")], "Password no coincide!")
        .min(8, "Confirmar contraseña mínimo 8 caracteres")
        .required("Confirmar contraseña es requerido"),
    }),
    onSubmit: async (values) => {
      setErrorMessage(undefined);
      setIsLoginRequest(true);
      const { response, err } = await userApi.signup(values);
      setIsLoginRequest(false);

      if (response) {
        signinForm.resetForm();
        dispatch(setUser(response));
        dispatch(setAuthModalOpen(false));
        toast.success("Iniciaste sesión con éxito");
      }

      if (err) setErrorMessage(err.message);
    },
  });

  return (
    <Box component="form" onSubmit={signinForm.handleSubmit}>
      <Stack spacing={3}>
        <TextField
          type="text"
          placeholder="Nombre completo"
          name="firstName"
          fullWidth
          value={signinForm.values.firstName}
          onChange={signinForm.handleChange}
          color="success"
          error={
            signinForm.touched.firstName &&
            signinForm.errors.firstName !== undefined
          }
          helperText={
            signinForm.touched.firstName && signinForm.errors.firstName
          }
        />
        <TextField
          type="text"
          placeholder="Apellidos"
          name="lastName"
          fullWidth
          value={signinForm.values.lastName}
          onChange={signinForm.handleChange}
          color="success"
          error={
            signinForm.touched.lastName &&
            signinForm.errors.lastName !== undefined
          }
          helperText={signinForm.touched.lastName && signinForm.errors.lastName}
        />
        <TextField
          type="text"
          placeholder="Correo electrónico"
          name="email"
          fullWidth
          value={signinForm.values.email}
          onChange={signinForm.handleChange}
          color="success"
          error={
            signinForm.touched.email && signinForm.errors.email !== undefined
          }
          helperText={signinForm.touched.email && signinForm.errors.email}
        />
        <TextField
          type="text"
          placeholder="Usuario"
          name="username"
          fullWidth
          value={signinForm.values.username}
          onChange={signinForm.handleChange}
          color="success"
          error={
            signinForm.touched.username &&
            signinForm.errors.username !== undefined
          }
          helperText={signinForm.touched.username && signinForm.errors.username}
        />

        <TextField
          type="password"
          placeholder="Contraseña"
          name="password"
          fullWidth
          value={signinForm.values.password}
          onChange={signinForm.handleChange}
          color="success"
          error={
            signinForm.touched.password &&
            signinForm.errors.password !== undefined
          }
          helperText={signinForm.touched.password && signinForm.errors.password}
        />
        <TextField
          type="password"
          placeholder="Confirmar contraseña"
          name="confirmPassword"
          fullWidth
          value={signinForm.values.confirmPassword}
          onChange={signinForm.handleChange}
          color="success"
          error={
            signinForm.touched.confirmPassword &&
            signinForm.errors.confirmPassword !== undefined
          }
          helperText={
            signinForm.touched.confirmPassword &&
            signinForm.errors.confirmPassword
          }
        />
      </Stack>

      <LoadingButton
        type="submit"
        fullWidth
        size="large"
        variant="contained"
        sx={{ marginTop: 4 }}
        loading={isLoginRequest}
      >
        Registrarse
      </LoadingButton>

      <Button fullWidth sx={{ marginTop: 1 }} onClick={() => switchAuthState()}>
        Iniciar sesión
      </Button>

      {errorMessage && (
        <Box sx={{ marginTop: 2 }}>
          <Alert severity="error" variant="outlined">
            {errorMessage}
          </Alert>
        </Box>
      )}
    </Box>
  );
};

export default SignupForm;
