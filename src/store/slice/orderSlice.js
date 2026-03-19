import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import Axios from '../../utils/Axios';
import SummaryApi from '../../common/SummaryApi';

export const fetchOrders = createAsyncThunk(
  'order/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      const response = await Axios({
        ...SummaryApi.getOrderItems
      });
       return response.data.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const orderSlice = createSlice({
  name: 'order',
  initialState: {
    order: [],
    loading: false,
    error: null
  },
  reducers: {
    setOrder: (state, action) => {
      state.order = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.order = action.payload;
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export const selectOrders = (state) => state.order.order;
export const { setOrder } = orderSlice.actions;
export default orderSlice.reducer;