import { Box, Tab } from "@mui/material";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import React, { useState } from "react";
import CategoryList from "./CategoryList";
import PersonPinIcon from "@mui/icons-material/PersonPin";
import ProductionQuantityLimitsIcon from "@mui/icons-material/ProductionQuantityLimits";
import CategoryIcon from "@mui/icons-material/Category";

function Administrator() {
  const [value, setValue] = useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <TabContext value={value}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <TabList onChange={handleChange}>
          <Tab
            icon={<CategoryIcon />}
            label="Categorías"
            value="1"
            aria-label="categoría"
          />
          <Tab
            icon={<ProductionQuantityLimitsIcon />}
            label="Productos"
            value="2"
            aria-label="producto"
          />
          <Tab
            icon={<PersonPinIcon />}
            label="Usuarios"
            value="3"
            aria-label="usuario"
          />
        </TabList>
      </Box>
      <TabPanel value="1">
        <CategoryList />
      </TabPanel>
      <TabPanel value="2">Productos</TabPanel>
      <TabPanel value="3">Usuarios</TabPanel>
    </TabContext>
  );
}

export default Administrator;
