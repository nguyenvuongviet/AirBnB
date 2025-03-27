import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ApiResponse } from "../../models/ApiResponse";
import { Login } from "../../models/Login";
import { UserInfo } from "../../models/UserInfo";
import api from "../../services/api";

export const actLogin = createAsyncThunk(
  "signIn/actLogin",
  async (login: Login, { rejectWithValue }) => {
    try {
      const response = await api.post<ApiResponse<UserInfo>>(
        "/auth/signin",
        login
      );
      return response.data.content;
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.content || "Đã xảy ra lỗi, vui lòng thử lại!";
      return rejectWithValue(errorMessage);
    }
  }
);

const initialState = {
  loading: false,
  data: null as UserInfo | null,
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
        localStorage.setItem("userInfo", JSON.stringify(action.payload));
      })
      .addCase(actLogin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { logout } = signInSlice.actions;
export default signInSlice.reducer;
