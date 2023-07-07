import { useEffect, useState } from "react";
import {
  Box,
  Button,
  Stack,
  TextField,
  FormControl,
  Select,
  MenuItem,
} from "@mui/material";
import { useFormik } from "formik";
import productApi from "../api/modules/product.api";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import categoryApi from "../api/modules/category.api";

const ProductsAdmin = () => {
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();
  const product = useFormik({
    initialValues: {
      name: "",
      description: "",
      price: "",
      url_image: "",
      stock: "",
      id_category: "",
    },
  });
  const handleButtonClick = () => {
    const data = {
      name: product.values.name,
      description: product.values.description,
      price: product.values.price,
      url_image: product.values.url_image,
      stock: product.values.stock,
      id_category: product.values.id_category,
    };
    productApi.productAdd(data);
    product.resetForm();
    toast.success("Producto creado con exito!");
    navigate("/");
  };
  useEffect(() => {
    const getCategories = async () => {
      const { response, err } = await categoryApi.getList();

      if (err) toast.error(err.message);
      if (response) {
        setCategories([...response]);
      }
    };

    getCategories();
  }, []);
  const handleCategoryChange = (event) => {
    product.setFieldValue("id_category", event.target.value);
  };

  console.log(product.values);
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
          <FormControl fullWidth>
            <span>Categoria</span>
            <Select
              labelId="demo-simple-select-filled-label"
              id="demo-simple-select-filled"
              value={product.values.id_category}
              onChange={handleCategoryChange}
            >
              <MenuItem value="0">
                <em>Selecciona</em>
              </MenuItem>
              {categories?.map((category) => (
                <MenuItem value={category.id} key={category.id}>
                  {category.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
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
