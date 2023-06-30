import { LoadingButton } from "@mui/lab";
import { Alert, Box, Button, Stack, TextField } from "@mui/material";
import { useFormik } from "formik";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import * as Yup from "yup";
import { setAuthModalOpen } from "../redux/features/authModalSlice";
import { setUser } from "../redux/features/userSlice";
import userApi from "../api/modules/user.api";

const SigninForm = ({ switchAuthState }) => {
  const dispatch = useDispatch();

  const [isLoginRequest, setIsLoginRequest] = useState(false);
  const [errorMessage, setErrorMessage] = useState();

  const signinForm = useFormik({
    initialValues: {
      password: "",
      username: "",
    },
    validationSchema: Yup.object({
      username: Yup.string()
        .min(8, "Usuario mínimo 8 caracteres")
        .required("Usuario es requerido"),
      password: Yup.string()
        .min(8, "Contraseña mínimo 8 caracteres")
        .required("Contraseña es requerido"),
    }),
    onSubmit: async (values) => {
      setErrorMessage(undefined);
      setIsLoginRequest(true);
      const { response, err } = await userApi.signin(values);
      setIsLoginRequest(false);

      if (response) {
        signinForm.resetForm();
        dispatch(setUser(response));
        console.log(setUser(response));
        dispatch(setAuthModalOpen(false));
        toast.success("Sign in success");
      }

      if (err) setErrorMessage(err.message);
    },
  });

  return (
    <Box component="form" onSubmit={signinForm.handleSubmit}>
      <Stack spacing={3}>
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
      </Stack>

      <LoadingButton
        type="submit"
        fullWidth
        size="large"
        variant="contained"
        sx={{ marginTop: 4 }}
        loading={isLoginRequest}
      >
        sign in
      </LoadingButton>

      <Button fullWidth sx={{ marginTop: 1 }} onClick={() => switchAuthState()}>
        sign up
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

export default SigninForm;
