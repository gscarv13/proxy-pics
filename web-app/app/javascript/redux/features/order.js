import { createSlice } from "@reduxjs/toolkit";

export const orderSlice = createSlice({
  name: "order",
  initialState: {
    value: [],
  },
  reducers: {
    allOrders: (state, action) => {
      state.value = action.payload
    },
    order: (state, action) => {
      state.value = action.payload
    }
  },
})

export const { allOrders, order } = orderSlice.actions;

export default orderSlice.reducer;
