import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ApiResponse } from "../../models/ApiResponse";
import { Room } from "../../models/Room";
import api from "../../services/api";

interface RoomState {
  room: Room | null;
  loading: boolean;
  error: string | null;
}

const initialState: RoomState = {
  room: null,
  loading: false,
  error: null,
};
export const fetchRoomById = createAsyncThunk(
  "room/fetchRoomById",
  async (roomId: number, { rejectWithValue }) => {
    try {
      const response = await api.get<ApiResponse<Room>>(
        `/phong-thue/${roomId}`
      );
      return response.data.content;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Lỗi khi lấy phòng"
      );
    }
  }
);

const roomSlice = createSlice({
  name: "room",
  initialState,
  reducers: {
    clearRoom: (state) => {
      state.room = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchRoomById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchRoomById.fulfilled, (state, action) => {
        state.loading = false;
        state.room = action.payload;
      })
      .addCase(fetchRoomById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearRoom } = roomSlice.actions;
export default roomSlice.reducer;
