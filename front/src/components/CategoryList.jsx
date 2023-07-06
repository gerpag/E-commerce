import { Box, Button, Divider, Stack } from "@mui/material";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import CategoryItem from "./CategoryItem";
import categoryApi from "../api/modules/category.api";

export const CategoryList = () => {
  const [categories, setCategories] = useState([]);
  const [filteredCategories, setFilteredCategories] = useState([]);
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(10);

  const skip = 2;

  useEffect(() => {
    const getCategories = async () => {
      const { response, err } = await categoryApi.getList();

      if (err) toast.error(err.message);
      if (response) {
        setCount(response.length);
        setCategories([...response]);
        setFilteredCategories([...response].splice(0, skip));
      }
    };

    getCategories();
  }, []);

  const onRemoved = (id) => {
    const newCategories = [...categories].filter((e) => e.id !== id);
    setCategories(newCategories);
    setFilteredCategories([...newCategories].splice(0, page * skip));
    setCount(count - 1);
  };

  const onLoadMore = () => {
    setFilteredCategories([
      ...filteredCategories,
      ...[...categories].splice(page * skip, skip),
    ]);
    setPage(page + 1);
  };

  return (
    <Stack spacing={2}>
      {filteredCategories.map((item) => (
        <Box key={item.id}>
          <CategoryItem category={item} onRemoved={onRemoved} />
          <Divider
            sx={{
              display: { xs: "block", md: "none" },
            }}
          />
        </Box>
      ))}
      {filteredCategories.length < categories.length && (
        <Button onClick={onLoadMore}>Cargar más</Button>
      )}
    </Stack>
  );
};

export default CategoryList;
