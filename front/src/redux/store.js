import { configureStore } from "@reduxjs/toolkit";
import authModalSlice from "./features/authModalSlice";
import userSlice from "./features/userSlice";

const store = configureStore({
  reducer: {
    user: userSlice,
    authModal: authModalSlice,
  },
});

export default store;
