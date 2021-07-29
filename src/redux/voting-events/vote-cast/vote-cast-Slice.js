import { createSlice } from "@reduxjs/toolkit";

const voteCastSlice = createSlice({
  name: "Vote Cast",
  initialState: {
    voteCastResponse: [],
  },
  reducers: {
    castFreeVote(state, action) {
      state.voteCastResponse = action.payload;
    },
  },
});

export const voteCastActions = voteCastSlice.actions;

export default voteCastSlice.reducer;
