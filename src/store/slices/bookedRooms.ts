import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ApiResponse } from "../../models/ApiResponse";
import { Booking } from "../../models/Booking";
import api from "../../services/api";

interface BookedRoomsState {
  bookedRooms: Booking[];
  loading: boolean;
  error: string | null;
}

const initialState: BookedRoomsState = {
  bookedRooms: [],
  loading: false,
  error: null,
};

export const fetchBookedRooms = createAsyncThunk(
  "bookedRooms/fetchBookedRooms",
  async (MaNguoiDung: number, { rejectWithValue }) => {
    try {
      const response = await api.get<ApiResponse<Booking[]>>(
        `dat-phong/lay-theo-nguoi-dung/${MaNguoiDung}`
      );

      return response.data.content;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Lỗi API");
    }
  }
);

const bookedRoomsSlice = createSlice({
  name: "bookedRooms",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBookedRooms.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBookedRooms.fulfilled, (state, action) => {
        state.loading = false;
        state.bookedRooms = action.payload;
      })
      .addCase(fetchBookedRooms.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default bookedRoomsSlice.reducer;
