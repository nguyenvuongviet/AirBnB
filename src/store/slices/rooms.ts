import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../services/api";
import { Room } from "../../models/Room";
import { ApiResponse } from "../../models/ApiResponse";

interface RoomsState {
  rooms: Room[];
  loading: boolean;
  error: string | null;
}

const initialState: RoomsState = {
  rooms: [],
  loading: false,
  error: null,
};

export const fetchRoomsByLocation = createAsyncThunk(
  "rooms/fetchRoomsByLocation",
  async (maViTri: number, { rejectWithValue }) => {
    try {
      const response = await api.get<ApiResponse<Room[]>>(
        `/phong-thue/lay-phong-theo-vi-tri?maViTri=${maViTri}`
      );
      return response.data.content;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Lỗi API");
    }
  }
);

const roomsSlice = createSlice({
  name: "rooms",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchRoomsByLocation.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchRoomsByLocation.fulfilled, (state, action) => {
        state.loading = false;
        state.rooms = action.payload;
      })
      .addCase(fetchRoomsByLocation.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default roomsSlice.reducer;
