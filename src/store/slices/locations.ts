import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ApiResponse } from "../../models/ApiResponse";
import { Location } from "../../models/Location";
import api from "../../services/api";

export const fetchLocations = createAsyncThunk(
  "locations/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get<ApiResponse<Location[]>>("/vi-tri");
      return response.data.content;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const fetchLocationById = createAsyncThunk(
  "locations/fetchById",
  async (id: number, { rejectWithValue }) => {
    try {
      const response = await api.get<ApiResponse<Location>>(`/vi-tri/${id}`);
      return response.data.content;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

interface LocationState {
  locations: Location[];
  selectedLocation: Location | null;
  loading: boolean;
  error: string | null;
}

const initialState: LocationState = {
  locations: [],
  selectedLocation: null,
  loading: false,
  error: null,
};

const locationSlice = createSlice({
  name: "locations",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchLocations.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchLocations.fulfilled, (state, action) => {
        state.loading = false;
        state.locations = action.payload;
      })
      .addCase(fetchLocations.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchLocationById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchLocationById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedLocation = action.payload;
      })
      .addCase(fetchLocationById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default locationSlice.reducer;
