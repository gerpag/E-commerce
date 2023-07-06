import { Box, Tab } from "@mui/material";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import React, { useState } from "react";
import CategoryList from "./CategoryList";
import { Link } from "react-router-dom";

function Administrator() {
  const [value, setValue] = useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <TabContext value={value}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <TabList onChange={handleChange}>
          <Tab label="Categorías" value="1" />
          <Tab label="Productos" value="2" />
         <Link to="/users"> <Tab label="Usuarios" value="3" /></Link>
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
