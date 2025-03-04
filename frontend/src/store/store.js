import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/authSlice";
import userReducer from "../features/userSlice";
import AppState from "./appState";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    appState: AppState,
  },
});

export default store;
