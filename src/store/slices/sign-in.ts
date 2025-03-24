import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ApiResponse, Content } from "../../models/ApiResponse";
import { UserInfo } from "../../models/UserInfo";
import api from "../../services/api";

type ResponseUser = ApiResponse<Content<UserInfo>>;

export const actLogin = createAsyncThunk(
  "signIn/actLogin",
  async (user: { email: string; password: string }, { rejectWithValue }) => {
    try {
      const response = await api.post<ResponseUser>("/auth/signin", user);
      const userInfo = response.data.content.user;
      localStorage.setItem("userInfo", JSON.stringify(userInfo));
      return userInfo;
    } catch (error: any) {
      return rejectWithValue(error.response.data.content);
    }
  }
);

const userInfoString = localStorage.getItem("userInfo");
const userInfo = userInfoString ? JSON.parse(userInfoString) : null;

const initialState = {
  loading: false,
  data: userInfo,
  error: null as string | null,
};

const signInSlice = createSlice({
  name: "signIn",
  initialState,
  reducers: {
    logout: (state) => {
      state.data = null;
      state.error = null;
      localStorage.removeItem("userInfo");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(actLogin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(actLogin.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(actLogin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { logout } = signInSlice.actions;
export default signInSlice.reducer;
