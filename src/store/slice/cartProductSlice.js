import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Axios from "../../utils/Axios";
import SummaryApi from "../../common/SummaryApi";
import toast from "react-hot-toast";
import { pricewithDiscount } from "../../utils/PriceWithDiscount";

// Async Thunks
export const fetchCartItems = createAsyncThunk(
  "cartProduct/fetchItems",
  async (_, { rejectWithValue }) => {
    try {
      const response = await Axios(SummaryApi.getCart_item);
      if (response.data.success) {
        return response.data.data;
      }
      return rejectWithValue(response.data.message);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const updateCartItemQty = createAsyncThunk(
  "cartProduct/updateQty",
  async ({ id, qty }, { dispatch, rejectWithValue }) => {
    try {
      const response = await Axios({
        ...SummaryApi.updateCart_itemQty,
        data: { _id: id, qty },
      });
      if (response.data.success) {
        // toast.success('Cart updated');
        dispatch(fetchCartItems());
        return response.data;
      }
      return rejectWithValue(response.data.message);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const deleteCartItem = createAsyncThunk(
  "cartProduct/deleteItem",
  async (cartId, { dispatch, rejectWithValue }) => {
    try {
      const response = await Axios({
        ...SummaryApi.deleteCart_item,
        data: { _id: cartId },
      });
      if (response.data.success) {
        toast.success(response.data.message);
        dispatch(fetchCartItems());
        return cartId;
      }
      return rejectWithValue(response.data.message);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const addToCart = createAsyncThunk(
  "cartProduct/addToCart",
  async ({ productId, quantity }, { dispatch, rejectWithValue }) => {
    try {
      const response = await Axios({
        ...SummaryApi.addto_cart,
        data: { productId, quantity },
      });
      if (response.data.success) {
        toast.success("Added to cart!");
        dispatch(fetchCartItems());
        return response.data;
      }
      return rejectWithValue(response.data.message);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
const savedSummary = JSON.parse(localStorage.getItem("cartSummary")) || {
  totalQty: 0,
  totalPrice: 0,
  notDiscountTotalPrice: 0,
  totalDiscount: 0,
};

const cartProductSlice = createSlice({
  name: "cartProduct",
  initialState: {
    cart: savedCart,
    loading: false,
    error: null,
    summary: savedSummary,
  },
  reducers: {
    handleAddItemCart: (state, action) => {
      state.cart = action.payload;

      // Calculate summary whenever cart changes
      const summary = action.payload.reduce(
        (acc, curr) => {
          const priceAfterDiscount = pricewithDiscount(
            curr?.productId?.price,
            curr?.productId?.discount,
          );

          return {
            totalQty: acc.totalQty + (curr.quantity || 0),
            totalPrice:
              acc.totalPrice + priceAfterDiscount * (curr.quantity || 0),
            notDiscountTotalPrice:
              acc.notDiscountTotalPrice +
              curr?.productId?.price * (curr.quantity || 0),
            totalDiscount:
              acc.totalDiscount +
              (curr?.productId?.price - priceAfterDiscount) *
                (curr.quantity || 0),
          };
        },
        {
          totalQty: 0,
          totalPrice: 0,
          notDiscountTotalPrice: 0,
          totalDiscount: 0,
        },
      );

      state.summary = summary;
      localStorage.setItem("cart", JSON.stringify(state.cart));
      localStorage.setItem("cartSummary", JSON.stringify(state.summary));
    },
    clearCart: (state) => {
      state.cart = [];
      state.summary = {
        totalQty: 0,
        totalPrice: 0,
        notDiscountTotalPrice: 0,
        totalDiscount: 0,
      };
      localStorage.removeItem("cart");
      localStorage.removeItem("cartSummary");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCartItems.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCartItems.fulfilled, (state, action) => {
        state.loading = false;
        state.cart = action.payload;

        const summary = action.payload.reduce(
          (acc, curr) => {
            const priceAfterDiscount = pricewithDiscount(
              curr?.productId?.price,
              curr?.productId?.discount,
            );

            return {
              totalQty: acc.totalQty + (curr.quantity || 0),
              totalPrice:
                acc.totalPrice + priceAfterDiscount * (curr.quantity || 0),
              notDiscountTotalPrice:
                acc.notDiscountTotalPrice +
                curr?.productId?.price * (curr.quantity || 0),
              totalDiscount:
                acc.totalDiscount +
                (curr?.productId?.price - priceAfterDiscount) *
                  (curr.quantity || 0),
            };
          },
          {
            totalQty: 0,
            totalPrice: 0,
            notDiscountTotalPrice: 0,
            totalDiscount: 0,
          },
        );

        state.summary = summary;

        // ✅ SAVE TO STORAGE
        localStorage.setItem("cart", JSON.stringify(state.cart));
        localStorage.setItem("cartSummary", JSON.stringify(state.summary));
      })
      .addCase(fetchCartItems.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { handleAddItemCart, clearCart } = cartProductSlice.actions;
export default cartProductSlice.reducer;
