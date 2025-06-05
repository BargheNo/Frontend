import { baseURL, getData } from "@/src/services/apiHub";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { WarrantyType } from "@/components/CorpDashboard/Warranties/warrantyTypes";

export const fetchWarrantyTypes = createAsyncThunk(
  'warrantyTypes/fetchWarrantyTypes',
  async () => {
    try {
      const response = await getData({
        endPoint: `${baseURL}/v1/corp/:corporationID/guarantee/type`
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

interface WarrantyTypesState {
  items: WarrantyType[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: WarrantyTypesState = {
  items: [],
  status: 'idle',
  error: null
};

const warrantyTypeSlice = createSlice({
  name: 'warrantyTypes',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchWarrantyTypes.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchWarrantyTypes.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(fetchWarrantyTypes.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch warranty types';
      });
  }
});

export default warrantyTypeSlice.reducer;