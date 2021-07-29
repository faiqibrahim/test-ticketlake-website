import { createSlice } from "@reduxjs/toolkit";

const votingEventSlice = createSlice({
  name: "Voting Events",
  initialState: {
    eventsListing: [],
  },
  reducers: {
    getAllEvents(state, action) {
      state.eventsListing = action.payload;
    },
  },
});

export const votingEventActions = votingEventSlice.actions;

export default votingEventSlice.reducer;
