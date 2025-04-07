import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ApiResponse } from "../../models/ApiResponse";
import { Booking } from "../../models/Booking";
import api from "../../services/api";

export const createBooking = createAsyncThunk(
  "booking/createBooking",
  async (bookingData: Booking, { rejectWithValue }) => {
    try {
      const { tongTien, ...model } = bookingData;
      console.log(model);

      const response = await api.post<ApiResponse<Booking>>(
        "/dat-phong",
        model
      );
      console.log(response);

      return response.data.content;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Lỗi API");
    }
  }
);

interface BookingState {
  data: Booking | null;
  loading: boolean;
  error: string | null;
}

const initialState: BookingState = {
  data: null,
  loading: false,
  error: null,
};

const bookingSlice = createSlice({
  name: "booking",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createBooking.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createBooking.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(createBooking.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) || "Không thể tạo booking";
      });
  },
});

export default bookingSlice.reducer;
