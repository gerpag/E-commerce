import { LoadingButton } from "@mui/lab";
import { Alert, Box, Stack, TextField } from "@mui/material";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import * as Yup from "yup";
import categoryApi from "../api/modules/category.api";
import { useEffect, useState } from "react";

const RegisterCategoryForm = ({ categories, setCategories }) => {
  const [errorMessage, setErrorMessage] = useState();

  const registerForm = useFormik({
    initialValues: {
      name: "",
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .min(1, "Nombre mínimo 1 caracter")
        .required("Nombre es requerido"),
    }),
    onSubmit: async (values) => {
      setErrorMessage(undefined);
      const { response, err } = await categoryApi.add(values);

      if (response) {
        registerForm.resetForm();
        setCategories([...categories, response]);
        toast.success("Registraste categoría con éxito");
      }

      if (err) setErrorMessage(err.message);
    },
  });

  return (
    <Box
      component="form"
      onSubmit={registerForm.handleSubmit}
      sx={{ width: "50%", marginLeft: "2.5rem", marginTop: 2 }}
    >
      <Stack spacing={2}>
        <TextField
          type="text"
          placeholder="Nombre completo"
          name="name"
          value={registerForm.values.name}
          onChange={registerForm.handleChange}
          color="success"
          size="large"
          error={
            registerForm.touched.name && registerForm.errors.name !== undefined
          }
          helperText={registerForm.touched.name && registerForm.errors.name}
        />
      </Stack>

      <LoadingButton type="submit" variant="contained" sx={{ marginTop: 2 }}>
        Registrar
      </LoadingButton>

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

export default RegisterCategoryForm;
