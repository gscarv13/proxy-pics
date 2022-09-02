import { createSlice } from "@reduxjs/toolkit";

export const requesterSlice = createSlice({
  name: "requester",
  initialState: {
    value: { token: '' },
    assignees: [{}],
  },
  reducers: {
    signIn: (state, action) => {
      state.value = action.payload
    },
    signOut: (state) => {
      state.value = { token: '' }
    },
    assignees: (state, action) => {
      state.assignees = action.payload
    }
  },
})

export const { signIn, signOut, assignees } = requesterSlice.actions;

export default requesterSlice.reducer;
