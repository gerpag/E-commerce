import { LoadingButton } from "@mui/lab";
import { Box, Stack, TextField, Typography } from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import uiConfigs from "../configs/ui.config";
import { useState } from "react";
import userApi from "../api/modules/user.api";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../redux/features/userSlice";
import { setAuthModalOpen } from "../redux/features/authModalSlice";

const ProfileUser = () => {
  const [onRequest, setOnRequest] = useState(false);
  const { user } = useSelector((state) => state.user);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const form = useFormik({
    initialValues: {
      password: "",
      newPassword: "",
      confirmNewPassword: "",
    },
    validationSchema: Yup.object({
      password: Yup.string()
        .min(8, "Contraseña mínimo 8 caracteres")
        .required("Contraseña es requerido"),
      newPassword: Yup.string()
        .min(8, "Nueva contraseña mínimo 8 caracteres")
        .required("Nueva contraseña es requerido"),
      confirmNewPassword: Yup.string()
        .oneOf([Yup.ref("newPassword")], "Contraseñas no coinciden")
        .min(8, "Confirmar contraseña mínimo 8 caracteres")
        .required("Confirmar contraseña es requerido"),
    }),
    onSubmit: async (values) => onUpdate(values),
  });

  const onUpdate = async (values) => {
    if (onRequest) return;
    setOnRequest(true);

    const { response, err } = await userApi.passwordUpdate(values);

    setOnRequest(false);

    if (err) toast.error(err.message);
    if (response) {
      form.resetForm();
      navigate("/");
      dispatch(setUser(null));
      dispatch(setAuthModalOpen(true));
      toast.success(
        "¡Actualización de contraseña exitosa! Vuelva a iniciar sesión"
      );
    }
  };

  return (
    <Box sx={{ ...uiConfigs.style.mainContent }}>
      <Typography
        variant="label"
        sx={{ fontSize: 24 }}
      >{`${user.firstname} ${user.lastname}`}</Typography>
      <Box component="form" maxWidth="400px" onSubmit={form.handleSubmit}>
        <Stack spacing={2}>
          <TextField
            type="password"
            placeholder="Contraseña"
            name="password"
            fullWidth
            value={form.values.password}
            onChange={form.handleChange}
            color="success"
            error={form.touched.password && form.errors.password !== undefined}
            helperText={form.touched.password && form.errors.password}
          />
          <TextField
            type="password"
            placeholder="Nueva contraseña"
            name="newPassword"
            fullWidth
            value={form.values.newPassword}
            onChange={form.handleChange}
            color="success"
            error={
              form.touched.newPassword && form.errors.newPassword !== undefined
            }
            helperText={form.touched.newPassword && form.errors.newPassword}
          />
          <TextField
            type="password"
            placeholder="Confirma nueva contraseña"
            name="confirmNewPassword"
            fullWidth
            value={form.values.confirmNewPassword}
            onChange={form.handleChange}
            color="success"
            error={
              form.touched.confirmNewPassword &&
              form.errors.confirmNewPassword !== undefined
            }
            helperText={
              form.touched.confirmNewPassword && form.errors.confirmNewPassword
            }
          />

          <LoadingButton
            type="submit"
            variant="contained"
            fullWidth
            sx={{ marginTop: 4 }}
            loading={onRequest}
          >
            Modificar Contraseña
          </LoadingButton>
        </Stack>
      </Box>
    </Box>
  );
};

export default ProfileUser;
