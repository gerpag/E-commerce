import { Box, Button, Divider, Link, Stack } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import CategoryItem from "./CategoryItem";
import categoryApi from "../api/modules/category.api";
import RegisterCategoryForm from "../commons/RegisterCategoryForm";

export const CategoryList = () => {
  const [categories, setCategories] = useState([]);
  // const [filteredCategories, setFilteredCategories] = useState([]);
  // const [page, setPage] = useState(1);
  const [count, setCount] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [formData, setFormData] = useState({ id: "", name: "" });

  // const skip = 2;

  useEffect(() => {
    const getCategories = async () => {
      const { response, err } = await categoryApi.getList();

      if (err) toast.error(err.message);
      if (response) {
        setCount(response.length);
        setCategories([...response]);
        // setFilteredCategories([...response].splice(0, skip));
      }
    };

    getCategories();
  }, []);

  const onRemoved = (id) => {
    const newCategories = [...categories].filter((e) => e.id !== id);
    setCategories(newCategories);
    // setFilteredCategories([...newCategories].splice(0, page * skip));
    setCount(count - 1);
  };

  const handleEdit = (category) => {
    setSelectedCategory(category);
    setFormData({ id: category.id, name: category.name });
  };

  // const onLoadMore = () => {
  //   setFilteredCategories([
  //     ...filteredCategories,
  //     ...[...categories].splice(page * skip, skip),
  //   ]);
  //   setPage(page + 1);
  // };

  const handleClean = () => {
    setSelectedCategory(null);
    setFormData({ id: "", name: "" });
  };

  return (
    <>
      <Link
        sx={{
          backgroundColor: "#1890FF",
          color: "#fff",
          marginLeft: "2.5rem",
          padding: "8px",
          borderRadius: "19px",
          cursor: "pointer",
          textDecoration: "none",
        }}
        onClick={handleClean}
      >
        <AddIcon /> Nuevo
      </Link>

      <RegisterCategoryForm
        categories={categories}
        setCategories={setCategories}
        formData={formData}
        setFormData={setFormData}
        selectedCategory={selectedCategory}
      />

      <Stack spacing={2} sx={{ marginTop: "10px" }}>
        {categories.map((item) => (
          <Box key={item.id}>
            <CategoryItem
              category={item}
              onRemoved={onRemoved}
              handleEdit={handleEdit}
            />
            <Divider
              sx={{
                display: { xs: "block", md: "none" },
              }}
            />
          </Box>
        ))}
        {/* {filteredCategories.length < categories.length && (
          <Button onClick={onLoadMore}>Cargar más</Button>
        )} */}
      </Stack>
    </>
  );
};

export default CategoryList;
