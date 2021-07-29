import { combineReducers } from "redux";
import votingEventSlice from "./event/event-Slice";
import votingEventCategorySlice from "./category/category-Slice";
import votingEventCategoryNomineeSlice from "./nominee/nominee-Slice";
import voteCastSlice from "./vote-cast/vote-cast-Slice";

const voting = combineReducers({
  event: votingEventSlice,
  category: votingEventCategorySlice,
  nominee: votingEventCategoryNomineeSlice,
  voteCast: voteCastSlice,
});

export default voting;
