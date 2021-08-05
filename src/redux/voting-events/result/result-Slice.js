import { createSlice } from "@reduxjs/toolkit";

const resultSlice = createSlice({
  name: "result Slice",
  initialState: {
    resultListing: [],
  },
  reducers: {
    resultListing(state, action) {
      state.resultListing = action.payload;
    },
  },
});

export const resultSliceActions = resultSlice.actions;

export default resultSlice.reducer;
