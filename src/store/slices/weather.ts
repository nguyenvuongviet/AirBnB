import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

interface WeatherState {
  data: any | null;
  loading: boolean;
  error: string | null;
}

const initialState: WeatherState = {
  data: null,
  loading: false,
  error: null,
};

export const fetchWeather = createAsyncThunk(
  "weather/fetchWeather",
  async (locationName: string, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        "https://api.weatherapi.com/v1/forecast.json",
        {
          params: {
            q: locationName,
            days: 14,
            key: "959f3b67f8c747a9ba5193743250404",
          },
        }
      );
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Lỗi API");
    }
  }
);

const weatherSlice = createSlice({
  name: "weather",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchWeather.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchWeather.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchWeather.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Không thể tải dữ liệu thời tiết";
      });
  },
});

export default weatherSlice.reducer;
