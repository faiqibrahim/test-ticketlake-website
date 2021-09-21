import { createSlice } from "@reduxjs/toolkit";

const votingEventSlice = createSlice({
  name: "Voting Events",
  initialState: {
    eventsListing: [],
    singleEvent: null,
    eventStatus: null,
  },
  reducers: {
    setAllEvents(state, action) {
      state.eventsListing = action.payload;
    },
    setSingleEvent(state, action) {
      state.singleEvent = action.payload;
    },
    setEventStatus(state, action) {
      state.eventStatus = action.payload;
    },
  },
});

export const votingEventActions = votingEventSlice.actions;

export default votingEventSlice.reducer;
