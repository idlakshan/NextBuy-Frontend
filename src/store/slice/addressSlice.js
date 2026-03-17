import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import Axios from '../../utils/Axios';
import SummaryApi from '../../common/SummaryApi';

export const fetchAddresses = createAsyncThunk(
  'address/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      const response = await Axios(SummaryApi.getAddress);
      if (response.data.success) {
        return response.data.data;
      }
      return rejectWithValue(response.data.message);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const addressSlice = createSlice({
  name: 'address',
  initialState: {
    addressList: [],
    loading: false,
    error: null
  },
  reducers: {
    handleAddAddress: (state, action) => {
      state.addressList = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAddresses.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAddresses.fulfilled, (state, action) => {
        state.loading = false;
        state.addressList = action.payload;
      })
      .addCase(fetchAddresses.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export const selectAddresses = (state) => state.address.addressList;
export const { handleAddAddress } = addressSlice.actions;
export default addressSlice.reducer;