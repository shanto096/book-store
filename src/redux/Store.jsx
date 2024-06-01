import { configureStore } from "@reduxjs/toolkit";
import ProductsSlice from "./slice/ProductsSlice";

import BasketSlice from "./slice/BasketSlice";
import AuthSlice from "./slice/AuthSlice";






export const store = configureStore({
    reducer:{
        auth : AuthSlice,
        products: ProductsSlice,
        basket : BasketSlice,
        
    }
})