import { createSlice } from "@reduxjs/toolkit";

const votingEventCategorySlice = createSlice({
  name: "Voting Categories",
  initialState: {
    categoryListing: [],
  },
  reducers: {
    getAllCategories(state, action) {
      state.categoryListing = action.payload;
    },
  },
});

export const votingCategoryActions = votingEventCategorySlice.actions;

export default votingEventCategorySlice.reducer;
