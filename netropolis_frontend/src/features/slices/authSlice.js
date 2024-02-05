import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userInfo: localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo"))
    : null,
  tokens: localStorage.getItem("tokens") ? JSON.parse(localStorage.getItem("tokens")) : null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setTokens: (state, action) => {
      state.tokens = action.payload;
      localStorage.setItem("tokens", JSON.stringify(action.payload));
    },
    clearTokens: (state) => {
      state.tokens = null;
      localStorage.removeItem("tokens");
    },
    setCredentials: (state, action) => {
      state.userInfo = action.payload;
      localStorage.setItem("userInfo", JSON.stringify(action.payload));
    },
    clearCredentials: (state) => {
      state.userInfo = null;
      localStorage.removeItem("userInfo");
    },
  },
});

export const { setCredentials, clearCredentials, setTokens, clearTokens } =
  authSlice.actions;

export default authSlice.reducer;
