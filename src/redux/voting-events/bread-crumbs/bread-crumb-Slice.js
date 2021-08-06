import { createSlice } from "@reduxjs/toolkit";

const breadCrumbsSlice = createSlice({
  name: "Bread Crumbs Slice",
  initialState: {
    breadCrumbs: [],
  },
  reducers: {
    getBreadCrumbs(state, action) {
      state.breadCrumbs = action.payload;
    },
  },
});

export const breadCrumbsAction = breadCrumbsSlice.actions;

export default breadCrumbsSlice.reducer;
