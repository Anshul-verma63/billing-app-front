import { configureStore } from "@reduxjs/toolkit";
import ProductSlice from "./slices/ProductSlice";
import CustomerSlice from "./slices/CustomerSlice";

const Store = configureStore({
  reducer: {
    product: ProductSlice,
    customer: CustomerSlice,
  },
});
export default Store;
