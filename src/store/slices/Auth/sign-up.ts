import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ApiResponse } from "../../../models/ApiResponse";
import { UserInfo } from "../../../models/UserInfo";
import api from "../../../services/api";

export const actSignUp = createAsyncThunk(
  "signUp/actSignUp",
  async (userInfo: UserInfo, { rejectWithValue }) => {
    try {
      const response = await api.post<ApiResponse<UserInfo>>(
        "/auth/signup",
        userInfo
      );
      return response.data.content;
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.content || "Đăng ký thất bại, vui lòng thử lại!";
      return rejectWithValue(errorMessage);
    }
  }
);

const initialState = {
  loading: false,
  success: false,
  error: null as string | null,
};

const signUpSlice = createSlice({
  name: "signUp",
  initialState,
  reducers: {
    resetSignUpState: (state) => {
      state.success = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(actSignUp.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })
      .addCase(actSignUp.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(actSignUp.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { resetSignUpState } = signUpSlice.actions;
export default signUpSlice.reducer;
