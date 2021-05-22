import {
  ALL_EVENTS,
  GET_EVENT_DETAIL,
  PROCESSING,
  SET_ERROR,
  PAGINATE_EVENTS,
  SET_ERROR_MESSAGE,
  SET_PROMOTED_EVENTS_FOR_HOME_PAGE,
  PAGINATION_PROCESSING,
  SET_UPCOMING_EVENTS_FOR_HOME,
  SET_PROMOTED_EVENTS,
  SET_ALL_EVENTS_NULL,
  SET_SEARCH,
  ALL_FILTER_EVENTS,
  RESET_EVENT_REDUX,
  MOVIE_SLOT_DETAIL,
  SET_ALL_SLOTS_DATA_OF_EVENT,
  SEARCH_ALL_PUBLIC_EVENTS,
  SET_CAST_AND_CREW,
} from "./event-actions";

const initState = {
  allEvents: null,
  paginateEvents: [],
  singleEventDetail: null,
  processing: false,
  paginationProcessing: false,
  error: false,
  errorMessage: null,
  promotedEvents: null,
  upcomingEvents: null,
  promotedEventsHome: null,
  upcomingEventsHome: null,
  search: false,
  categories: [],
  from: "",
  to: "",
  city: "",
  allFilters: false,
  movieSlotDetail: {},
  allSlotsDataOfEvent: [],
  searchAllPublicEvents: null,
  castAndCrewMembers: [],
};

const reducer = (state = initState, action) => {
  let newState = { ...state };

  switch (action.type) {
    case ALL_EVENTS:
      setAllEvents(newState, action.payload);
      break;
    case PAGINATE_EVENTS:
      setPaginateEvents(newState, action.payload);
      break;
    case GET_EVENT_DETAIL:
      getEventDetail(newState, action.payload);
      break;
    case ALL_FILTER_EVENTS:
      setAllFilterEvents(newState, action.payload);
      break;
    case SET_SEARCH:
      setSearch(newState, action.payload);
      break;
    case PROCESSING:
      setProcessing(newState, action.payload);
      break;
    case PAGINATION_PROCESSING:
      setPaginationProcessing(newState, action.payload);
      break;
    case SET_ERROR:
      setError(newState, action.payload);
      break;
    case SET_ERROR_MESSAGE:
      setErrorMessage(newState, action.payload);
      break;
    case SET_PROMOTED_EVENTS_FOR_HOME_PAGE:
      setPromotedEventsHome(newState, action.payload);
      break;
    case SET_UPCOMING_EVENTS_FOR_HOME:
      setUpcomingEventsForHome(newState, action.payload);
      break;
    case SET_PROMOTED_EVENTS:
      setPromotedEvents(newState, action.payload);
      break;
    case SET_ALL_EVENTS_NULL:
      setAllEventsNull(newState);
      break;
    case MOVIE_SLOT_DETAIL:
      setMovieSlotDetail(newState, action.payload);
      break;
    case SET_CAST_AND_CREW:
      setCastAndCrewMembers(newState, action.payload);
      break;
    case SET_ALL_SLOTS_DATA_OF_EVENT:
      setAllSlotsDataOfEvent(newState, action.payload);
      break;
    case RESET_EVENT_REDUX:
      resetEventRedux(newState, action.payload);
      break;
    case SEARCH_ALL_PUBLIC_EVENTS:
      setSearchAllPublicEvents(newState, action.payload);
      break;
    default: {
      // do nothing
    }
  }
  return newState;
};

const setAllEventsNull = (state) => {
  state.allEvents = [];
  state.paginateEvents = [];
};

const setUpcomingEventsForHome = (state, events) => {
  state.upcomingEventsHome = events;
};
const setPromotedEvents = (state, events) => {
  state.promotedEvents = events;
};
const setPromotedEventsHome = (state, events) => {
  state.promotedEventsHome = events;
};

const getEventDetail = (state, data) => {
  state.singleEventDetail = data;
};

const setSearch = (state, data) => {
  state.search = data;
};

const setAllEvents = (state, data) => {
  state.allEvents = data;
};

const setAllFilterEvents = (state, data) => {
  state.allEvents = data.allEvents;
  state.allFilters = data.allFilters;
};

const setPaginateEvents = (state, data) => {
  state.paginateEvents = data;
};

const setProcessing = (state, processing) => {
  state.processing = processing;
};
const setPaginationProcessing = (state, processing) => {
  state.paginationProcessing = processing;
};

const setError = (state, args) => {
  state.error = args;
};
const setErrorMessage = (state, args) => {
  state.errorMessage = args;
};
const resetEventRedux = (state, key) => {
  state[key] = null;
};

const setMovieSlotDetail = (state, data) => {
  state.movieSlotDetail = data;
};

const setCastAndCrewMembers = (state, data) => {
  state.castAndCrewMembers = [...data];
};
const setAllSlotsDataOfEvent = (state, data) => {
  state.allSlotsDataOfEvent = data;
};

const setSearchAllPublicEvents = (state, data) => {
  state.searchAllPublicEvents = data;
};

export default reducer;
