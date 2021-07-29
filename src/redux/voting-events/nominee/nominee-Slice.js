import { createSlice } from "@reduxjs/toolkit";

const votingEventCategoryNomineeSlice = createSlice({
  name: "Voting Nominee",
  initialState: {
    nomineeListing: [],
  },
  reducers: {
    getAllNominees(state, action) {
      state.nomineeListing = action.payload;
    },
  },
});

export const votingNomineeActions = votingEventCategoryNomineeSlice.actions;

export default votingEventCategoryNomineeSlice.reducer;
