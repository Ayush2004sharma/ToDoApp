import { createSlice } from "@reduxjs/toolkit";

// Ensure localStorage access only in the browser
const getInitialAuthState = () => {
  if (typeof window !== "undefined") {
    const storedAuth = localStorage.getItem("auth");
    return storedAuth ? JSON.parse(storedAuth) : { isAuthenticated: false, user: null };
  }
  return { isAuthenticated: false, user: null };
};

const initialState = getInitialAuthState();

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.isAuthenticated = true;
      state.user = action.payload;
      if (typeof window !== "undefined") {
        localStorage.setItem("auth", JSON.stringify(state)); // ✅ Save to localStorage
      }
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      if (typeof window !== "undefined") {
        localStorage.removeItem("auth"); // ✅ Remove from localStorage
      }
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
