// Axios
import axios from "../../utils/axios";
// URLs
import {
  EVENTS_GET_EVENT_DETAIL,
  EVENTS_GET_ALL_PUBLIC,
  GET_MOVIE_SLOT_DETAIL,
  GET_ALL_SLOTS_DATA_OF_EVENT,
} from "../../utils/config";
// Helpers
import {NOTIFICATION_TIME } from "../../utils/common-utils";
import { handleError } from "../../utils/store-utils";
import { NotificationManager } from "react-notifications";

// Actions
export const ALL_EVENTS = "ACTION_ALL_EVENTS";
export const PAGINATE_EVENTS = "ACTION_PAGINATE_EVENTS";
export const GET_EVENT_DETAIL = "ACTION_GET_EVENT_DETAIL";
export const PROCESSING = "ACTION_EVENT_PROCESSING";
export const PAGINATION_PROCESSING = "ACTION_EVENT_PAGINATION_PROCESSING";
export const SET_ERROR = "ACTION_EVENT_SET_ERROR";
export const SET_ERROR_MESSAGE = "ACTION_EVENT_SET_ERROR_MESSAGE";
export const SET_PROMOTED_EVENTS_FOR_HOME_PAGE =
  "ACTION_SET_PROMOTED_EVENTS_HOME";
export const SET_PROMOTED_EVENTS = "ACTION_SET_PROMOTED_EVENTS";
export const SET_UPCOMING_EVENTS_FOR_HOME = "ACTION_SET_UPCOMING_EVENTS_HOME";
export const SET_UPCOMING_EVENTS = "ACTION_SET_UPCOMING_EVENTS";
export const SET_SEARCH = "ACTION_SET_SEARCH";
export const SET_ALL_EVENTS_NULL = "ACTION_SET_ALL_EVENTS_NULL";
export const ALL_FILTER_EVENTS = "ACTION_ALL_FILTER_EVENTS";
export const MOVIE_SLOT_DETAIL = "MOVIE_SLOT_DETAIL";
export const SET_ALL_SLOTS_DATA_OF_EVENT = "SET_ALL_SLOTS_DATA_OF_EVENT";
export const RESET_EVENT_REDUX = "ACTION_RESET_EVENT_REDUX";
export const SEARCH_ALL_PUBLIC_EVENTS = "SEARCH_ALL_PUBLIC_EVENTS";
export const SET_CAST_AND_CREW = "ACTION_SET_CAST_AND_CREW";

export const setAllEventsNull = () => {
  return {
    type: SET_ALL_EVENTS_NULL,
    payload: null,
  };
};

export const resetEventsRedux = (key) => {
  return {
    type: RESET_EVENT_REDUX,
    payload: key,
  };
};
export const setUpcomingEventsForHome = (events) => {
  return {
    type: SET_UPCOMING_EVENTS_FOR_HOME,
    payload: events,
  };
};
export const setError = (error) => {
  return {
    type: SET_ERROR,
    payload: error,
  };
};

export const setErrorMessage = (errorMessage) => {
  return {
    type: SET_ERROR_MESSAGE,
    payload: errorMessage,
  };
};

const setAllEvents = (payload) => {
  return {
    type: ALL_EVENTS,
    payload,
  };
};

const setSearchAllPublicEvents = (payload) => {
  return {
    type: SEARCH_ALL_PUBLIC_EVENTS,
    payload,
  };
};

const _setAllFilterEvents = (payload) => {
  return {
    type: ALL_FILTER_EVENTS,
    payload,
  };
};

const setPaginateEvents = (payload) => {
  return {
    type: PAGINATE_EVENTS,
    payload,
  };
};

export const setProcessing = (processing) => {
  return {
    type: PROCESSING,
    payload: processing,
  };
};
const setPaginationProcessing = (processing) => {
  return {
    type: PAGINATION_PROCESSING,
    payload: processing,
  };
};

export const getEventDetail = (id) => {
  return (dispatch) => {
    dispatch(setProcessing(true));
    dispatch(setError(false));
    axios
      .get(EVENTS_GET_EVENT_DETAIL + id)
      .then((responce) => {
        dispatch(setError(false));

        // cb, paginate, page, pageSize, country, city, categories, from, to
        dispatch(
          getAllEvents(
            () => {}, //cb
            false, // paginate
            "", //page
            "", // pagesize
            responce.data.data.parentEventInfo.eventCategories,
            "",
            ""
          )
        );

        dispatch({
          type: GET_EVENT_DETAIL,
          payload: responce,
        });
        dispatch(setProcessing(false));
      })
      .catch((err) => {
        dispatch(setError(true));
        dispatch(setErrorMessage(err));
        dispatch(setProcessing(false));
      });
  };
};

const setPromotedEventsHome = (events) => {
  return {
    type: SET_PROMOTED_EVENTS_FOR_HOME_PAGE,
    payload: events,
  };
};

export const setPromotedEventsForHome = (pageSize = 5) => {
  return (dispatch, getState) => {
    let eventsCountry = getState().user.eventsCountry;
    dispatch(setProcessing(true));
    axios
      .post(EVENTS_GET_ALL_PUBLIC, {
        isFeatured: true,
        isPublished: true,
        isDraft: false,
        country: eventsCountry.label,
        city: "",
        categories: [],
        to: null,
        from: null,
        paginate: true,
        page: 1,
        skip: 0,
        pageSize,
      })
      .then((res) => {
        dispatch(setProcessing(false));
        dispatch(setPromotedEventsHome(res.data.data));
      })
      .catch((err) => {
        dispatch(setProcessing(false));
      });
  };
};

const setAllPromotedEvents = (events) => {
  return {
    type: SET_PROMOTED_EVENTS,
    payload: events,
  };
};

export const getAllPromotedEvents = (
  paginate,
  page,
  pageSize = 10,
  skip = 0,
  _categoryId
) => {
  return (dispatch, getState) => {
    if (parseInt(page) > 1) {
      dispatch(setPaginationProcessing(true));
    } else {
      dispatch(setProcessing(true));
    }

    let categoryId = _categoryId ? [_categoryId] : [];

    let eventsCountry = getState().user.eventsCountry;
    axios
      .post(EVENTS_GET_ALL_PUBLIC, {
        isFeatured: true,
        isPublished: true,
        isDraft: false,
        country: eventsCountry.label,
        city: "",
        categories: categoryId,
        to: null,
        from: null,
        paginate,
        page,
        skip,
        pageSize,
      })
      .then((res) => {
        if (parseInt(page) > 1) {
          dispatch(setPaginationProcessing(false));
        } else {
          dispatch(setProcessing(false));
        }
        dispatch(setAllPromotedEvents({ promotedEvents: res.data }));
      })
      .catch((err) => {
        if (parseInt(page) > 1) {
          dispatch(setPaginationProcessing(false));
        } else {
          dispatch(setProcessing(false));
        }
      });
  };
};

export const getUpcomingEventsForHome = (pageSize = 20) => {
  return (dispatch, getState) => {
    let eventsCountry = getState().user.eventsCountry;
    dispatch(setProcessing(true));
    axios
      .post(EVENTS_GET_ALL_PUBLIC, {
        isFeatured: false,
        isPublished: true,
        isDraft: false,
        country: eventsCountry.label,
        city: "",
        categories: [],
        to: null,
        from: null,
        paginate: true,
        page: 1,
        skip: 0,
        pageSize,
      })
      .then((res) => {
        dispatch(setProcessing(false));
        dispatch(setUpcomingEventsForHome(res.data.data));
      })
      .catch((err) => {
        dispatch(setProcessing(false));
      });
  };
};

export const getAllEventsDefault = (
  isFeatured = false,
  isPublished = true,
  isDraft = false,
  categories = [],
  to,
  from,
  city,
  paginate = false,
  page = 1,
  pageSize = 12,
  search,
  callBack
) => {
  return (dispatch, getState) => {
    // dispatch(setError(false));
    dispatch(setProcessing(true));
    let eventsCountry = getState().user.eventsCountry;
    axios
      .post(EVENTS_GET_ALL_PUBLIC, {
        isFeatured,
        isPublished,
        isDraft,
        categories,
        to,
        from,
        country: eventsCountry.label,
        city,
        paginate,
        page,
        pageSize,
        search,
      })
      .then((response) => {
        dispatch(setError(false));
        dispatch(setAllEvents(response));
        dispatch(setProcessing(false));
        callBack && callBack();
      })
      .catch((err) => {
        console.error("ERR: ", err);
        callBack && callBack();
      });
  };
};

export const getCityFilterEvents = (
  paginate,
  page,
  pageSize,
  city,
  citySearch,
  firstPaginate,
  from,
  to,
  categories
) => {
  const isFeatured = "false";
  const isPublished = "true";

  return (dispatch, getState) => {
    dispatch(setError(false));
    if (parseInt(page) > 1) {
      dispatch(setPaginationProcessing(true));
    } else {
      dispatch(setProcessing(true));
    }
    let eventsCountry = getState().user.eventsCountry;
    let axiosPromise = "";

    if (city !== "") {
      axiosPromise = axios.post(EVENTS_GET_ALL_PUBLIC, {
        isFeatured,
        isPublished,
        paginate,
        page,
        pageSize,
        country: eventsCountry.label,
        city,
        from,
        to,
        categories,
      });
    }

    axiosPromise
      .then((response) => {
        dispatch(setError(false));

        dispatch(
          setAllEvents({
            allEvents: response.data.data,
            city: city,
            citySearch: citySearch,
            firstPaginate: firstPaginate,
          })
        );

        dispatch(setPaginateEvents(response.data));

        if (parseInt(page) > 1) {
          dispatch(setPaginationProcessing(false));
        } else {
          dispatch(setProcessing(false));
        }
      })
      .catch((err) => {
        dispatch(setError(true));
        if (parseInt(page) > 1) {
          dispatch(setPaginationProcessing(false));
        } else {
          dispatch(setProcessing(false));
        }
        dispatch(setAllEvents({ allEvents: [] }));
      });
  };
};

export const getDateFilterEvents = (
  paginate,
  page,
  pageSize,
  from,
  to,
  dateTimeSearch,
  firstPaginate,
  categories,
  city
) => {
  const isFeatured = "false";
  const isPublished = "true";

  return (dispatch, getState) => {
    dispatch(setError(false));
    if (parseInt(page) > 1) {
      dispatch(setPaginationProcessing(true));
    } else {
      dispatch(setProcessing(true));
    }
    let eventsCountry = getState().user.eventsCountry;
    let axiosPromise = axios.post(EVENTS_GET_ALL_PUBLIC, {
      isFeatured,
      isPublished,
      paginate,
      page,
      pageSize,
    });

    if (from !== "" && to !== "") {
      axiosPromise = axios.post(EVENTS_GET_ALL_PUBLIC, {
        isFeatured,
        isPublished,
        paginate,
        page,
        pageSize,
        from,
        to,
        categories,
        country: eventsCountry.label,
        city,
      });
    }

    axiosPromise
      .then((response) => {
        dispatch(setError(false));

        dispatch(
          setAllEvents({
            allEvents: response.data.data,
            dateTimeSearch: dateTimeSearch,
            firstPaginate: firstPaginate,
            from: from,
            to: to,
          })
        );

        dispatch(setPaginateEvents(response.data));

        if (parseInt(page) > 1) {
          dispatch(setPaginationProcessing(false));
        } else {
          dispatch(setProcessing(false));
        }
      })
      .catch((err) => {
        dispatch(setError(true));
        if (parseInt(page) > 1) {
          dispatch(setPaginationProcessing(false));
        } else {
          dispatch(setProcessing(false));
        }
        dispatch(setAllEvents({ allEvents: [] }));
      });
  };
};

export const getAllFiltersEvents = (
  paginate,
  page,
  pageSize,
  categories,
  city,
  from,
  to,
  search,
  allFilters
) => {
  const isFeatured = "false";
  const isPublished = "true";

  return (dispatch, getState) => {
    dispatch(setError(false));
    if (parseInt(page) > 1) {
      dispatch(setPaginationProcessing(true));
    } else {
      dispatch(setAllEventsNull());
      dispatch(setProcessing(true));
    }

    let axiosPromise = "";
    let eventsCountry = getState().user.eventsCountry;
    axiosPromise = axios.post(EVENTS_GET_ALL_PUBLIC, {
      isFeatured,
      isPublished,
      paginate,
      page,
      pageSize,
      categories,
      city,
      country: eventsCountry.label,
      from,
      to,
      search,
    });

    axiosPromise
      .then((response) => {
        dispatch(setError(false));

        dispatch(
          _setAllFilterEvents({
            allEvents: response.data.data,
            allFilters: allFilters,
            search: search,
          })
        );

        dispatch(setPaginateEvents(response.data));
        if (parseInt(page) > 1) {
          dispatch(setPaginationProcessing(false));
        } else {
          dispatch(setProcessing(false));
        }
      })
      .catch((err) => {
        dispatch(setError(true));
        if (parseInt(page) > 1) {
          dispatch(setPaginationProcessing(false));
        } else {
          dispatch(setProcessing(false));
        }
        dispatch(setAllEvents({ allEvents: [] }));
      });
  };
};

export const getAllEvents = (
  cb,
  paginate,
  page,
  pageSize,
  categories,
  from,
  to,
  search,
  firstPaginate,
  all,
  city
) => {
  const isFeatured = "false";
  const isPublished = "true";

  return (dispatch, getState) => {
    dispatch(setError(false));
    if (parseInt(page) > 1) {
      dispatch(setPaginationProcessing(true));
    } else {
      dispatch(setAllEventsNull());
      dispatch(setProcessing(true));
    }

    let axiosPromise = "";
    let eventsCountry = getState().user.eventsCountry;
    let country = eventsCountry.label;
    if (search) {
      if (categories.length > 0) {
        axiosPromise = axios.post(EVENTS_GET_ALL_PUBLIC, {
          isFeatured,
          isPublished,
          paginate,
          page,
          pageSize,
          categories,
          country,
          city,
          from,
          to,
        });
      }
    } else {
      axiosPromise = axios.post(EVENTS_GET_ALL_PUBLIC, {
        isFeatured,
        isPublished,
        paginate,
        page,
        pageSize,
        categories,
        country,
        city,
        from,
        to,
      });
    }

    axiosPromise
      .then((response) => {
        dispatch(setError(false));
        if (search) {
          dispatch(
            setAllEvents({
              allEvents: response.data.data,
              search: true,
              firstPaginate: firstPaginate,
              categories: categories,
            })
          );
          dispatch({
            type: SET_SEARCH,
            payload: false,
          });
        } else if (all) {
          dispatch(setAllEvents({ allEvents: response.data.data, all: all }));
        } else {
          dispatch(setAllEvents({ allEvents: response.data.data }));
        }

        dispatch(setPaginateEvents(response.data));
        if (parseInt(page) > 1) {
          dispatch(setPaginationProcessing(false));
        } else {
          dispatch(setProcessing(false));
        }
        cb && cb();
      })
      .catch((err) => {
        dispatch(setError(true));
        if (parseInt(page) > 1) {
          dispatch(setPaginationProcessing(false));
        } else {
          dispatch(setProcessing(false));
        }
        dispatch(setAllEvents({ allEvents: [] }));
      });
  };
};

export const searchEvents = (searchStr, searchParams = []) => {
  return (dispatch, getState) => {
    const eventsState = getState().event;

    let Events = eventsState._events || eventsState.allEvents;

    Events = [...Events];

    if (searchStr) {
      let filteredEvents = [];
      Events.forEach((event) => {
        for (let index = 0; index < searchParams.length; index++) {
          let param = searchParams[index];

          const _val = getObjectValue(event, param);
          if (
            _val &&
            _val.toLowerCase().indexOf(searchStr.toLowerCase()) > -1
          ) {
            filteredEvents.push(event);
            break;
          }
        }
      });
      dispatch(setAllEvents({ _events: Events, allEvents: filteredEvents }));
    } else {
      dispatch(setAllEvents({ _events: undefined, allEvents: Events }));
    }
  };
};

export const searchAllPublicEvents = (
  search,
  paginate = false,
  page = 1,
  skip = 0,
  pageSize = 50,
  cb
) => {
  return (dispatch, getState) => {
    let countryLabel =
      getState().user.eventsCountry && getState().user.eventsCountry.label;
    let JSONObj = {
      paginate: paginate,
      page: page,
      skip: skip,
      pageSize: pageSize,
      search: search,
      country: countryLabel,
      categories: [],
    };
    axios
      .post(EVENTS_GET_ALL_PUBLIC, JSONObj)
      .then((response) => {
        const data = response.data && response.data.data;
        dispatch(setSearchAllPublicEvents(data));
        cb && cb(data);
      })
      .catch((err) => {
        console.error("err", err);
        let errorMessage = handleError(err);
        NotificationManager.error(errorMessage, "", NOTIFICATION_TIME);
      });
  };
};

const getObjectValue = (obj, path) => {
  let val = null;

  if (path.indexOf(".") > -1) {
    let paths = path.split(".");
    val = obj;
    paths.forEach((_path) => {
      val = val[_path];
    });
  } else {
    val = obj[path];
  }

  return val;
};

export const getMovieSlotDetails = (id) => {
  return (dispatch) => {
    dispatch(setProcessing(true));
    dispatch(setError(false));
    axios
      .get(GET_MOVIE_SLOT_DETAIL + id)
      .then((response) => {
        dispatch(setError(false));
        const { data } = response.data;
        dispatch(setMovieSlotDetail(data));
        dispatch(setProcessing(false));
      })
      .catch((err) => {
        dispatch(setError(true));
        dispatch(setErrorMessage(err));
        dispatch(setProcessing(false));
      });
  };
};

export const getAllSlotsDataOfEvent = (id) => {
  return (dispatch) => {
    dispatch(setProcessing(true));
    dispatch(setError(false));
    axios
      .get(GET_ALL_SLOTS_DATA_OF_EVENT + id)
      .then((response) => {
        dispatch(setError(false));
        const { data } = response.data;
        const castSection = data.sort(
          (one, other) => other.sections.length - one.sections.length
        )[0];
        dispatch(setAllSlotsDataOfEvent(data));
        dispatch(setCastAndCrewData(castSection ? castSection.sections : []));

        dispatch(setProcessing(false));
      })
      .catch((err) => {
        dispatch(setError(true));
        dispatch(setErrorMessage(err));
        dispatch(setProcessing(false));
      });
  };
};

const setMovieSlotDetail = (payload) => {
  return {
    type: MOVIE_SLOT_DETAIL,
    payload,
  };
};

const setAllSlotsDataOfEvent = (payload) => {
  return {
    type: SET_ALL_SLOTS_DATA_OF_EVENT,
    payload,
  };
};

const setCastAndCrewData = (payload) => {
  return {
    type: SET_CAST_AND_CREW,
    payload,
  };
};
