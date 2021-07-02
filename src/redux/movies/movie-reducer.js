import * as actions from "./movie-action-types";
import { PROCESSING } from "../user/user-actions";
import { CINEMA_DATA } from "./movie-action-types";

const initState = {
  trendingEvents: [],
  showingInCinemasEvents: [],
  upcomingEvents: [],
  nearByEvents: [],
  allSubCategories: [],
  subCategoryEvents: [],
  showingInCinemaEvents: [],
  upcomingEventsForCinema: [],
  promotedEventsForCinema: [],
  trendingEventsForCinema: [],
  processing: false,
  cinemaInfo: {},
  sectionId: null,
  categoryId: null,
};

const reducer = (state = initState, action) => {
  let newState = { ...state };

  switch (action.type) {
    case actions.ALL_TRENDING_EVENTS:
      setTrendingEvents(newState, action.payload);
      break;
    case actions.ALL_SHOWING_IN_CINEMAS_EVENTS:
      setShowingInCinemasEvents(newState, action.payload);
      break;
    case actions.ALL_UPCOMING_EVENTS:
      setUpcomingEvents(newState, action.payload);
      break;
    case actions.ALL_NEAR_BY_EVENTS:
      setNearByEvents(newState, action.payload);
      break;
    case actions.SET_ALL_SUB_CATEGORIES:
      setAllSubCategories(newState, action.payload);
      break;
    case actions.SET_SUB_CATEGORY_EVENTS:
      setSubCategoryEvents(newState, action.payload);
      break;
    case actions.SET_SHOWING_IN_CINEMA_INFO:
      setShowingInCinemaInfo(newState, action.payload);
      break;
    case actions.SET_UPCOMING_EVENTS_FOR_CINEMA:
      setUpcomingEventsForCinema(newState, action.payload);
      break;
    case actions.SET_PROMOTED_EVENTS_FOR_CINEMA:
      setPromotedEventsForCinema(newState, action.payload);
      break;
    case actions.SET_TRENDING_EVENTS_FOR_CINEMA:
      setTrendingEventsForCinema(newState, action.payload);
      break;
    case actions.SET_CATEGORY_AND_SECTION_ID:
      setCategoryAndSectionId(newState, action.payload);
      break;
    case actions.PROCESSING:
      setProcessing(newState, action.payload);
      break;
    case CINEMA_DATA:
      cinemaData(newState, action.payload);
      break;
    default: {
      // do nothing
    }
  }
  return newState;
};

const setTrendingEvents = (state, data) => {
  state.trendingEvents = data;
};

const setShowingInCinemasEvents = (state, data) => {
  state.showingInCinemasEvents = data;
};

const setUpcomingEvents = (state, data) => {
  state.upcomingEvents = data;
};

const setNearByEvents = (state, data) => {
  state.nearByEvents = data;
};

const setAllSubCategories = (state, data) => {
  state.allSubCategories = data;
};

const setSubCategoryEvents = (state, data) => {
  state.subCategoryEvents = data;
};

const setShowingInCinemaInfo = (state, data) => {
  state.showingInCinemaEvents = data;
};

const setUpcomingEventsForCinema = (state, data) => {
  state.upcomingEventsForCinema = data;
};

const setPromotedEventsForCinema = (state, data) => {
  state.promotedEventsForCinema = data;
};

const setTrendingEventsForCinema = (state, data) => {
  state.trendingEventsForCinema = data;
};
const setCategoryAndSectionId = (state, data) => {
  state.sectionId = data.sectionId;
  state.categoryId = data.categoryId;
  sessionStorage.setItem("categoryId", data.categoryId);
  sessionStorage.setItem("sectionId", data.sectionId);
};

const setProcessing = (state, processing) => {
  state.processing = processing;
};

const cinemaData = (state, data) => {
  localStorage.setItem("cinemaInfo", JSON.stringify(data));
};

export default reducer;
