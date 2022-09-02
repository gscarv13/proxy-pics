import { createSlice } from "@reduxjs/toolkit";

export const assigneeSlice = createSlice({
  name: "assignee",
  initialState: {
    value: { token: '' },
  },
  reducers: {
    signIn: (state, action) => {
      state.value = action.payload
    },
    signOut: (state) => {
      state.value = { token: '' }
    },
  },
})

export const { signIn, signOut } = assigneeSlice.actions;

export default assigneeSlice.reducer;
