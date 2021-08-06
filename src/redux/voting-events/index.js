import { combineReducers } from "redux";
import votingEventSlice from "./event/event-Slice";
import votingEventCategorySlice from "./category/category-Slice";
import votingEventCategoryNomineeSlice from "./nominee/nominee-Slice";
import voteCastSlice from "./vote-cast/vote-cast-Slice";
import resultSlice from "./result/result-Slice";
import breadCrumbSlice from "./bread-crumbs/bread-crumb-Slice";

const voting = combineReducers({
  event: votingEventSlice,
  category: votingEventCategorySlice,
  nominee: votingEventCategoryNomineeSlice,
  voteCast: voteCastSlice,
  result: resultSlice,
  breadCrumbs: breadCrumbSlice,
});

export default voting;
