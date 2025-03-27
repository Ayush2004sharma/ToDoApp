import { configureStore } from "@reduxjs/toolkit";
import todoReducer from "./todoSlice";
import authReducer from "./authSlice"; // ✅ Ensure this is imported
import weatherReducer from "./weatherSlice";

const store = configureStore({
  reducer: {
    todo: todoReducer,
    auth: authReducer, // ✅ Ensure this is added
    weather: weatherReducer,
  },
});

export default store;
