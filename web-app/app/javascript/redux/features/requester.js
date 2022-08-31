import { createSlice } from "@reduxjs/toolkit";

export const requesterSlice = createSlice({
  name: "requester",
  initialState: {
    value: { id: '' },
  },
  reducers: {
    signIn: (state, action) => {
      state.value = action.payload
    },
    signOut: () => {
      state.value = { id: '' }
    }
  },
})

export const { signIn, signOut } = requesterSlice.actions;

export default requesterSlice.reducer;
