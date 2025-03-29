import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { UserInfo } from "../../models/UserInfo";
import api from "../../services/api";
import { ApiResponse } from "../../models/ApiResponse";

interface UserState {
  user: UserInfo | null;
  loading: boolean;
  error: string | null;
}

const initialState: UserState = {
  user: null,
  loading: false,
  error: null,
};

export const fetchUser = createAsyncThunk(
  "user/fetchUser",
  async (userId: number, { rejectWithValue }) => {
    try {
      const response = await api.get<ApiResponse<UserInfo>>(`/users/${userId}`);
      return response.data.content;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Lỗi API");
    }
  }
);

export const updateUser = createAsyncThunk(
  "user/updateUser",
  async (
    { userId, data }: { userId: number; data: Partial<UserInfo> },
    { rejectWithValue }
  ) => {
    try {
      const response = await api.put<ApiResponse<UserInfo>>(
        `/users/${userId}`,
        data
      );
      return response.data.content;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Lỗi cập nhật");
    }
  }
);

export const updateAvatar = createAsyncThunk(
  "user/updateAvatar",
  async (file: File, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      formData.append("formFile", file);
      const response = await api.post<ApiResponse<UserInfo>>(
        "/users/upload-avatar",
        formData
      );
      return response.data.content;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Lỗi cập nhật ảnh đại diện"
      );
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(updateUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(updateAvatar.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateAvatar.fulfilled, (state, action) => {
        state.loading = false;
        if (state.user) {
          state.user = action.payload;
        }
      })
      .addCase(updateAvatar.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default userSlice.reducer;
