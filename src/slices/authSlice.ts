import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserDetails {
  id: number;
  name: string;
  username: string;
  role: {
    id: number;
    name: string;
  };
  permissions: string[];
  city: string | null;
}

interface AuthState {
  userDetails: UserDetails | null;
  token: string | null;
  isAuth: boolean;
}
const tokenFromStorage = sessionStorage.getItem("token");
const userDetailsFromStorage = sessionStorage.getItem("userDetails")
  ? JSON.parse(sessionStorage.getItem("userDetails") as string)
  : null;
const initialState: AuthState = {
  userDetails: userDetailsFromStorage,
  token: tokenFromStorage ? tokenFromStorage : null,
  isAuth: !!tokenFromStorage,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUserDetails: (state, action: PayloadAction<UserDetails>) => {
      state.userDetails = action.payload;
      sessionStorage.setItem("userDetails", JSON.stringify(action.payload));
    },

    setUserToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
      state.isAuth = Boolean(action.payload);
      sessionStorage.setItem("token", action.payload);
    },
    clearUserToken: (state) => {
      state.token = null;
      state.isAuth = false;
      sessionStorage.removeItem("token");
    },
    clearUserDetails: (state) => {
      state.userDetails = null;
      sessionStorage.removeItem("userDetails");
    },
  },
});

export const {
  setUserDetails,
  setUserToken,
  clearUserToken,
  clearUserDetails,
} = authSlice.actions;

export default authSlice.reducer;
