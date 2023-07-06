import { LoadingButton } from "@mui/lab";
import { Alert, Box, Stack, TextField } from "@mui/material";
import { toast } from "react-toastify";
import categoryApi from "../api/modules/category.api";
import { useRef, useState } from "react";

const RegisterCategoryForm = ({
  categories,
  setCategories,
  formData,
  setFormData,
  selectedCategory,
}) => {
  const [errorMessage, setErrorMessage] = useState();

  const formRef = useRef(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrorMessage(undefined);

    const { id, name } = formData;
    if (id) {
      const { response, err } = await categoryApi.update({
        categoryId: id,
        name,
      });

      if (response) {
        formRef.current.reset();
        setCategories((prevCategories) => {
          const updatedCategories = prevCategories.map((category) => {
            if (category.id === id) {
              return { ...category, name };
            }
            return category;
          });
          return updatedCategories;
        });
        toast.success("Modificaste categoría con éxito");

        setFormData({ id: "", name: "" });
      }
      if (err) setErrorMessage(err.message);
    } else {
      const { response, err } = await categoryApi.add({ name });

      if (response) {
        formRef.current.reset();
        setCategories([response, ...categories]);
        toast.success("Registraste categoría con éxito");

        setFormData({ id: "", name: "" });
      }
      if (err) setErrorMessage(err.message);
    }
  };

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  return (
    <Box
      component="form"
      ref={formRef}
      onSubmit={handleSubmit}
      sx={{ width: "50%", marginLeft: "2.5rem", marginTop: 2 }}
    >
      <Stack spacing={2}>
        <TextField
          type="text"
          placeholder="Nombre completo"
          name="name"
          value={formData.name}
          onChange={handleChange}
          color="success"
          size="large"
        />
      </Stack>

      <LoadingButton type="submit" variant="contained" sx={{ marginTop: 2 }}>
        {selectedCategory ? "Modificar" : "Registrar"}
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
