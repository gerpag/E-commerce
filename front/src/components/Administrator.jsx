import { Box, Tab } from "@mui/material";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import CategoryList from "./CategoryList";
import ProductsAdmin from "./Products.admin";
import AdminUsersView from "./Admin.users.View";

function Administrator() {
  const [value, setValue] = useState("1");
  const { user } = useSelector((state) => state.user);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <TabContext value={value}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <TabList onChange={handleChange}>
          <Tab label="Categorías" value="1" />
          <Tab label="Productos" value="2" />
          {user?.is_super_admin && <Tab label="Usuarios" value="3" />}
        </TabList>
      </Box>
      <TabPanel value="1">
        <CategoryList />
      </TabPanel>
      <TabPanel value="2">
        <ProductsAdmin />
      </TabPanel>
      {user?.is_super_admin && (
        <TabPanel value="3">
          <AdminUsersView />
        </TabPanel>
      )}
    </TabContext>
  );
}

export default Administrator;
