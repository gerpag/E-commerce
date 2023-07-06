import { Box, Stack, Typography } from "@mui/material";
import dayjs from "dayjs";
import { toast } from "react-toastify";
import DeleteIcon from "@mui/icons-material/Delete";
import UpdateIcon from "@mui/icons-material/Update";
import { LoadingButton } from "@mui/lab";
import uiConfigs from "../configs/ui.config";
import categoryApi from "../api/modules/category.api";
import { useState } from "react";

const CategoryItem = ({ category, onRemoved, handleEdit }) => {
  const [onRequest, setOnRequest] = useState(false);

  const onRemove = async () => {
    if (onRequest) return;
    setOnRequest(true);
    const { response, err } = await categoryApi.remove({
      categoryId: category.id,
    });
    setOnRequest(false);

    if (err) toast.error(err.message);
    if (response) {
      toast.success("Categoría removida con éxito!");
      onRemoved(category.id);
    }
  };

  return (
    <Box
      sx={{
        position: "relative",
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        padding: 1,
        opacity: onRequest ? 0.6 : 1,
        "&:hover": { backgroundColor: "background.paper" },
      }}
    >
      <Box
        sx={{
          width: { xs: "100%", md: "80%" },
          padding: { xs: 0, md: "0 2rem" },
        }}
      >
        <Stack spacing={1}>
          <Typography
            variant="h6"
            sx={{ ...uiConfigs.style.typoLines(1, "left") }}
          >
            {category.name}
          </Typography>
          <Typography variant="caption">
            {dayjs(category.createdAt).format("DD-MM-YYYY HH:mm:ss")}
          </Typography>
        </Stack>
      </Box>

      <Box
        sx={{
          position: { xs: "relative", md: "absolute" },
          right: { xs: 0, md: "10px" },
          marginTop: { xs: 2, md: 0 },
          width: "max-content",
        }}
      >
        <LoadingButton
          variant="outlined"
          color="secondary"
          startIcon={<UpdateIcon />}
          sx={{ margin: 1 }}
          loadingPosition="start"
          loading={onRequest}
          onClick={() => handleEdit(category)}
        >
          Modificar
        </LoadingButton>

        <LoadingButton
          variant="contained"
          startIcon={<DeleteIcon />}
          sx={{ margin: 1 }}
          loadingPosition="start"
          loading={onRequest}
          onClick={onRemove}
        >
          Eliminar
        </LoadingButton>
      </Box>
    </Box>
  );
};

export default CategoryItem;
