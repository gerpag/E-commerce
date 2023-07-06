import React from "react";
import { Box, Button, Stack, TextField } from "@mui/material";
import { useFormik } from "formik";
import productApi from "../api/modules/product.api";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const ProductsAdmin = () => {
  const navigate = useNavigate();
  const product = useFormik({
    initialValues: {
      name: "",
      description: "",
      price: "",
      url_image: "",
      stock: "",
      categoryId: "",
    },
  });
  const handleButtonClick = () => {
    const data = {
      name: product.values.name,
      description: product.values.description,
      price: product.values.price,
      url_image: product.values.url_image,
      stock: product.values.stock,
      categoryId: product.values.categoryId,
    };
    productApi.productAdd(data);
    product.resetForm();
    toast.success("Producto creado con exito!");
    navigate("/");
  };

  return (
    <div>
      <h1 className="text-center m-6 text-2xl">AGREGAR UN PRODUCTO</h1>
      <Box component="form">
        <Stack spacing={4.6}>
          <TextField
            type="text"
            placeholder="Nombre del producto"
            name="name"
            fullWidth
            value={product.values.name}
            onChange={product.handleChange}
            color="success"
            error={product.touched.name && product.errors.name !== undefined}
            helperText={product.touched.name && product.errors.name}
          />
          <TextField
            type="text"
            placeholder="Descripción"
            name="description"
            fullWidth
            value={product.values.description}
            onChange={product.handleChange}
            color="success"
            error={
              product.touched.description &&
              product.errors.description !== undefined
            }
            helperText={
              product.touched.description && product.errors.description
            }
          />
          <TextField
            type="text"
            placeholder="Precio"
            name="price"
            fullWidth
            value={product.values.price}
            onChange={product.handleChange}
            color="success"
            error={product.touched.price && product.errors.price !== undefined}
            helperText={product.touched.price && product.errors.price}
          />
          <TextField
            type="text"
            placeholder="URL de la imagen"
            name="url_image"
            fullWidth
            value={product.values.url_image}
            onChange={product.handleChange}
            color="success"
            error={
              product.touched.url_image &&
              product.errors.url_image !== undefined
            }
            helperText={product.touched.url_image && product.errors.url_image}
          />
          <TextField
            type="text"
            placeholder="Stock"
            name="stock"
            fullWidth
            value={product.values.stock}
            onChange={product.handleChange}
            color="success"
            error={product.touched.stock && product.errors.stock !== undefined}
            helperText={product.touched.stock && product.errors.stock}
          />
          <TextField
            type="text"
            placeholder="Categoría"
            name="categoryId"
            fullWidth
            value={product.values.categoryId}
            onChange={product.handleChange}
            color="success"
            error={
              product.touched.categoryId &&
              product.errors.categoryId !== undefined
            }
            helperText={product.touched.categoryId && product.errors.categoryId}
          />
          <Button
            // type="submit"
            variant="contained"
            color="success"
            fullWidth
            onClick={handleButtonClick}
          >
            Crear producto
          </Button>
        </Stack>
      </Box>
    </div>
  );
};

export default ProductsAdmin;
