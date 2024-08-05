import { createSlice } from "@reduxjs/toolkit";

const ProductSlice = createSlice({
  name: "product",
  initialState: {
    product: [],
  },
  reducers: {
    addToCart: (state, action) => {
      state.product.push(action.payload);
    },
    removeProduct: (state, action) => {
      console.log(action.payload.id);
      state.product = state.product.filter(
        (prod) => prod.id !== action.payload.id
      );
    },
  },
});

export const { addToCart, removeProduct } = ProductSlice.actions;
export default ProductSlice.reducer;
