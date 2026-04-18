import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../client/features/auth/authSlice.js";
import cartReducer from "../client/features/cart/cartSlice.js";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        cart: cartReducer
    }
})