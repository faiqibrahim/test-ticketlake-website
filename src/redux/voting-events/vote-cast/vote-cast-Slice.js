import { createSlice } from "@reduxjs/toolkit";

const voteCastSlice = createSlice({
  name: "Vote Cast",
  initialState: {
    voteCastResponse: [],
    error: [],
  },
  reducers: {
    castFreeVote(state, action) {
      state.voteCastResponse = action.payload;
    },
    castPaidVote(state, action) {
      state.voteCastResponse = action.payload;
    },
    eventNotStarted(state, action) {
      state.error = action.payload;
    },
  },
});

export const voteCastActions = voteCastSlice.actions;

export default voteCastSlice.reducer;
