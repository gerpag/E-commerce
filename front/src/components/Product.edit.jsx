import { useEffect, useState } from "react";
import axios from "axios";
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
import { useLocation, useNavigate } from "react-router-dom";
import categoryApi from "../api/modules/category.api";

const ProductEdit = () => {
  const navigate = useNavigate();
  const [singleProduct, setSingleProduct] = useState({});
  const [categories, setCategories] = useState([]);
  const productId = useLocation().pathname.split("/")[2];
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`http://localhost:3000/api/v1/product/${productId}`)
      .then((res) => {
        setSingleProduct(res.data);
      });
  }, [productId]);

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
  const handleEdit = async () => {
    try {
      await productApi.productUpdate(productId, product.values);
      toast.success("Producto editado con éxito");
      navigate("/");
    } catch (error) {
      toast.error("No se pudo editar el producto");
    }
  };

  useEffect(() => {
    if (singleProduct) {
      product.setValues({
        name: singleProduct.name || "",
        description: singleProduct.description || "",
        price: singleProduct.price || "",
        url_image: singleProduct.url_image || "",
        stock: singleProduct.stock || "",
        categoryId: singleProduct.categoryId || "",
      });
      setLoading(false);
    }
  }, [singleProduct, productId]);

  useEffect(() => {
    const getCategories = async () => {
      const { response, err } = await categoryApi.getList();

      if (err) toast.error(err.message);
      if (response) {
        setCategories([...response]);
      }
    };

    getCategories();
  }, [productId]);

  const handleCategoryChange = (event) => {
    product.setFieldValue("categoryId", event.target.value);
  };
  return (
    <div>
      <h1 className="text-center m-6 text-2xl">Editar Producto</h1>
      <Box component="form">
        <Stack spacing={4.6}>
          <FormControl fullWidth>
            <span>Nombre del producto</span>
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
          </FormControl>
          <FormControl fullWidth>
            <span>Descripción</span>
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
          </FormControl>
          <FormControl fullWidth>
            <span>Precio</span>
            <TextField
              type="text"
              placeholder="Precio"
              name="price"
              fullWidth
              value={product.values.price}
              onChange={product.handleChange}
              color="success"
              error={
                product.touched.price && product.errors.price !== undefined
              }
              helperText={product.touched.price && product.errors.price}
            />
          </FormControl>
          <FormControl fullWidth>
            <span>URL de la imagen</span>
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
          </FormControl>
          <FormControl fullWidth>
            <span>Stock</span>
            <TextField
              type="text"
              placeholder="Stock"
              name="stock"
              fullWidth
              value={product.values.stock}
              onChange={product.handleChange}
              color="success"
              error={
                product.touched.stock && product.errors.stock !== undefined
              }
              helperText={product.touched.stock && product.errors.stock}
            />
          </FormControl>
          <FormControl fullWidth>
            <span>Categoria</span>
            <Select
              labelId="demo-simple-select-filled-label"
              id="demo-simple-select-filled"
              value={product.values.categoryId}
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
            variant="contained"
            color="success"
            fullWidth
            onClick={handleEdit}
          >
            Editar Producto
          </Button>
        </Stack>
      </Box>
    </div>
  );
};

export default ProductEdit;
