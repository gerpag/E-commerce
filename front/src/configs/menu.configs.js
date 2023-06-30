import LockResetOutlinedIcon from "@mui/icons-material/LockResetOutlined";

const user = [
  {
    display: "Perfil",
    path: "/profile-update",
    // icon: <LockResetOutlinedIcon />,
    state: "profile.update",
  },
  {
    display: "Carrito",
    path: "/user/cart",
    // icon: <LockResetOutlinedIcon />,
    state: ""
  }
];

const menuConfigs = { user };

export default menuConfigs;
