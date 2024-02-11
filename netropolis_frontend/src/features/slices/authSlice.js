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
      console.log("state.tokens", state.tokens);
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

const fetchUserProfile = async (tokens) => {
  try {
    const res = await fetch(`${baseUrl}/fetch_user/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${tokens.access}`,
      },
    });
    const data = await res.json();
    return data;
  }
  catch (err) {
    console.log(err);
    return err;
  }
}

export const refreshTokens = async () => {
  const res = await fetch(`${VITE_BASE_BACKEND_URL}/refresh`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ refreshToken: localStorage.getItem("tokens").refresh }),
  });
  const tokens = await res.json();
  dispatch(setTokens({ ...tokens }));
  const user = await fetchUserProfile(tokens);
  dispatch(setCredentials({ ...user }));
  return tokens;
}

export const { setCredentials, clearCredentials, setTokens, clearTokens } =
  authSlice.actions;

export default authSlice.reducer;
