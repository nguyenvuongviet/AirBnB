import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ApiResponse } from "../../../models/ApiResponse";
import { CurrentUser } from "../../../models/CurrentUser";
import { Login } from "../../../models/Login";
import { UserInfo } from "../../../models/UserInfo";
import api from "../../../services/api";

const saveUserToLocalStorage = (userData: CurrentUser) => {
  localStorage.setItem("CURRENT_USER", JSON.stringify(userData));
};

const clearUserFromLocalStorage = () => {
  localStorage.removeItem("CURRENT_USER");
};

export const actLogin = createAsyncThunk(
  "signIn/actLogin",
  async (login: Login, { rejectWithValue }) => {
    try {
      const response = await api.post<ApiResponse<CurrentUser>>(
        "/auth/signin",
        login
      );
      const userData = response.data.content;
      saveUserToLocalStorage(userData);
      return userData;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.content || "Đã xảy ra lỗi, vui lòng thử lại!"
      );
    }
  }
);

export const updateCurrentUser = createAsyncThunk(
  "signIn/updateCurrentUser",
  async (updatedUser: Partial<UserInfo>) => {
    const storedUser = localStorage.getItem("CURRENT_USER");
    if (storedUser) {
      const parsedUser: CurrentUser = JSON.parse(storedUser);
      const newUser = {
        ...parsedUser,
        user: { ...parsedUser.user, ...updatedUser },
      };
      saveUserToLocalStorage(newUser);

      return updatedUser;
    }
    return null;
  }
);

const currentUser = localStorage.getItem("CURRENT_USER")
  ? (JSON.parse(localStorage.getItem("CURRENT_USER")!) as CurrentUser)
  : null;

const initialState = {
  loading: false,
  data: currentUser,
  error: null as string | null,
};

const signInSlice = createSlice({
  name: "signIn",
  initialState,
  reducers: {
    logout: (state) => {
      state.data = null;
      state.error = null;
      clearUserFromLocalStorage();
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
      })
      .addCase(updateCurrentUser.fulfilled, (state, action) => {
        if (state.data && action.payload) {
          state.data = {
            ...state.data,
            user: { ...state.data.user, ...action.payload },
          };
        }
      });
  },
});

export const { logout } = signInSlice.actions;
export default signInSlice.reducer;
