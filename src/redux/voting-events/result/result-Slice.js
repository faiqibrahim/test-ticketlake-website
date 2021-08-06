import { createSlice } from "@reduxjs/toolkit";

const resultSlice = createSlice({
  name: "result Slice",
  initialState: {
    resultListing: [],
  },
  reducers: {
    getResultListing(state, action) {
      state.resultListing = action.payload;
    },
  },
});

export const resultSliceActions = resultSlice.actions;

export default resultSlice.reducer;
