import { configureStore } from "@reduxjs/toolkit";
import userReducer from './slice/userSlice'
import productReducer from './slice/productSlice'
import cartReducer from './slice/cartProductSlice'

export const store = configureStore({
    reducer:{
        user:userReducer,
        product:productReducer,
        cartItem : cartReducer,
    }
})