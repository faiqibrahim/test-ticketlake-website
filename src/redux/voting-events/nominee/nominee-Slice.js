import { createSlice } from "@reduxjs/toolkit";

const votingEventCategoryNomineeSlice = createSlice({
  name: "Voting Nominee",
  initialState: {
    nomineeListing: [],
    updatedVoteCount: 0,
  },
  reducers: {
    getAllNominees(state, action) {
      state.nomineeListing = action.payload;
    },
    getUpdatedNomineeVoteCount(state, action) {
      state.updatedVoteCount = action.payload;
    },
  },
});

export const votingNomineeActions = votingEventCategoryNomineeSlice.actions;

export default votingEventCategoryNomineeSlice.reducer;
