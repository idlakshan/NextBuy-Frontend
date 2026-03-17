// store/store.js
import { configureStore } from "@reduxjs/toolkit";
import userReducer from './slice/userSlice';
import productReducer from './slice/productSlice';
import cartReducer from './slice/cartProductSlice';
import addressReducer from './slice/addressSlice';
import orderReducer from './slice/orderSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    product: productReducer,
    cartItem: cartReducer,
    address: addressReducer,
    order: orderReducer,
  },
});