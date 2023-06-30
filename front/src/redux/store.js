import { configureStore } from "@reduxjs/toolkit";
import authModalSlice from "./features/authModalSlice";
import userSlice from "./features/userSlice";
import cartState from "./cartState";

const store = configureStore({
  reducer: {
    user: userSlice,
    authModal: authModalSlice,
    cartState:cartState
  },
});

export default store;
