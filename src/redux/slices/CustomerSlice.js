import { createSlice } from "@reduxjs/toolkit";

const CustomerSlice = createSlice({
  name: "customer",
  initialState: {
    customer: null,
  },
  reducers: {
    addCustomer: (state, action) => {
      state.customer = action.payload;
    },
  },
});

export const { addCustomer } = CustomerSlice.actions;
export default CustomerSlice.reducer;
