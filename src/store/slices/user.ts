import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ApiResponse } from "../../models/ApiResponse";
import { UserInfo } from "../../models/UserInfo";
import api from "../../services/api";
import { updateCurrentUser } from "./Auth/sign-in";

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
      const res = await api.get<ApiResponse<UserInfo>>(`/users/${userId}`);
      return res.data.content;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Lỗi API");
    }
  }
);

export const updateUser = createAsyncThunk(
  "user/updateUser",
  async (
    { userId, data }: { userId: number; data: Partial<UserInfo> },
    { dispatch, rejectWithValue }
  ) => {
    try {
      const res = await api.put<ApiResponse<UserInfo>>(
        `/users/${userId}`,
        data
      );
      const updatedUser = res.data.content;

      dispatch(updateCurrentUser(updatedUser));

      return updatedUser;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Lỗi cập nhật");
    }
  }
);

export const updateAvatar = createAsyncThunk(
  "user/updateAvatar",
  async (file: File, { dispatch, rejectWithValue }) => {
    try {
      const formData = new FormData();
      formData.append("formFile", file);
      const res = await api.post<ApiResponse<UserInfo>>(
        "/users/upload-avatar",
        formData
      );
      const updatedUser = res.data.content;

      dispatch(updateCurrentUser({ avatar: updatedUser.avatar }));

      return updatedUser;
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
    const handlePending = (state: UserState) => {
      state.loading = true;
      state.error = null;
    };

    const handleRejected = (state: UserState, action: PayloadAction<any>) => {
      state.loading = false;
      state.error = action.payload;
    };

    const handleFulfilled = (
      state: UserState,
      action: PayloadAction<UserInfo>
    ) => {
      state.loading = false;
      state.user = action.payload;
    };

    builder
      .addCase(fetchUser.pending, handlePending)
      .addCase(fetchUser.fulfilled, handleFulfilled)
      .addCase(fetchUser.rejected, handleRejected)

      .addCase(updateUser.pending, handlePending)
      .addCase(updateUser.fulfilled, handleFulfilled)
      .addCase(updateUser.rejected, handleRejected)

      .addCase(updateAvatar.pending, handlePending)
      .addCase(updateAvatar.fulfilled, handleFulfilled)
      .addCase(updateAvatar.rejected, handleRejected);
  },
});

export default userSlice.reducer;
