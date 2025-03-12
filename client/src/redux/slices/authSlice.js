import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userInfo: localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo"))
    : null,
  forgetPasswordEmail: "",
  language: localStorage.getItem("language") || "en",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      state.userInfo = action.payload;
      localStorage.setItem("userInfo", JSON.stringify(action.payload));
    },
    logout: (state, action) => {
      state.userInfo = null;
      localStorage.removeItem("userInfo");
    },
    setForgetPasswordEmail: (state, action) => {
      state.forgetPasswordEmail = action.payload;
    },
    setLanguage: (state, action) => {
      state.language = action.payload;
      localStorage.setItem("language", action.payload);
  },
}});

export const { setCredentials, logout, setForgetPasswordEmail, setLanguage } =
  authSlice.actions;

export default authSlice.reducer;
