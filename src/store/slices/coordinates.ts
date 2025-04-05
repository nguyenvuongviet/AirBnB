import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

interface CoordinatesState {
  latitude: number | null;
  longitude: number | null;
  loading: boolean;
  error: string | null;
}

const initialState: CoordinatesState = {
  latitude: null,
  longitude: null,
  loading: false,
  error: null,
};

export const getCoordinatesWithNominatim = createAsyncThunk(
  "coordinates/getCoordinatesWithNominatim",
  async (locationName: string, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        "https://nominatim.openstreetmap.org/search",
        {
          params: {
            q: locationName,
            format: "json",
          },
        }
      );
      const { lat, lon } = response.data[0];
      return { latitude: lat, longitude: lon };
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Lỗi API");
    }
  }
);

const coordinatesSlice = createSlice({
  name: "coordinates",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCoordinatesWithNominatim.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getCoordinatesWithNominatim.fulfilled, (state, action) => {
        state.loading = false;
        state.latitude = action.payload.latitude;
        state.longitude = action.payload.longitude;
      })
      .addCase(getCoordinatesWithNominatim.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload ||
          action.error.message ||
          "Không thể lấy tọa độ") as string;
      });
  },
});

export default coordinatesSlice.reducer;
