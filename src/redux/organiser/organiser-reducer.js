import * as actions from "./organiser-action-types";
const initState = {
  organiserList: [
    {
      id: 1,
      imgSrc: "/images/votingimages/image1.png",
      title: "Pop sugar Event planner",
      location: "Ghana",
      events: 20,
    },
    {
      id: 2,
      imgSrc: "/images/votingimages/image1_2.png",
      title: "Pop sugar Event planner",
      location: "Ghana",
      events: 20,
    },
    {
      id: 3,
      imgSrc: "/images/votingimages/image3.png",
      title: "Mugler Angel Events",
      location: "Ghana",

      events: 20,
    },
    {
      id: 4,
      imgSrc: "/images/votingimages/image4.png",
      title: "Flowater Event Planner",
      location: "Ghana",

      events: 20,
    },
    {
      id: 5,
      imgSrc: "/images/votingimages/image5.png",
      title: "Synology Events",
      location: "Ghana",
      events: 20,
    },
    {
      id: 6,
      imgSrc: "/images/votingimages/image6.png",
      title: "Camellia Blossom Events",
      location: "Ghana",

      events: 20,
    },
    {
      id: 7,
      imgSrc: "/images/votingimages/image7.png",
      title: "Fitness Freaks Nationwe",
      location: "Ghana",
      events: 20,
    },
    {
      id: 8,
      imgSrc: "/images/votingimages/image8.png",
      title: "Camellia Blossom Events",
      location: "Ghana",
      events: 20,
    },
  ],
  eventsList: [
    {
      id: 1,
      type: "Action & Thriller",
      startTime: "Fri, May 6",
      endTime: "Sun, July 4",
      imgSrc: "/images/events/enemylines.png",
      title: "Enemy Lines",
      shows: 7,
    },
    {
      id: 2,
      type: "Action & Thriller",
      startTime: "Fri, May 6",
      endTime: "Sun, July 4",
      imgSrc: "/images/events/badboys.png",
      title: "Bad Boys for Life",
      shows: 7,
    },
    {
      id: 3,
      type: "Action & Thriller",
      startTime: "Fri, May 6",
      endTime: "Sun, July 4",
      imgSrc: "/images/events/drive.png",
      title: "Drive",
      shows: 7,
    },
    {
      id: 4,
      type: "Action & Thriller",
      startTime: "Fri, May 6",
      endTime: "Sun, June 24",
      imgSrc: "/images/events/actiongirls.png",
      title: "Action Girls",
      shows: 7,
    },
    {
      id: 5,
      type: "Action & Thriller",
      startTime: "Fri, May 6",
      endTime: "Sun, June 4",
      imgSrc: "/images/events/enemylines.png",
      title: "Enemy Lines",
      shows: 7,
    },
    {
      id: 6,
      type: "Action & Thriller",
      startTime: "Fri, May 6",
      endTime: "Sun, July 4",
      imgSrc: "/images/events/badboys.png",
      title: "Bad Boys for Life",
      shows: 7,
    },
    {
      id: 7,
      type: "Action & Thriller",
      startTime: "Fri, May 6",
      endTime: "Sun, June 4",
      imgSrc: "/images/events/drive.png",
      title: "Drive",
      shows: 7,
    },
    {
      id: 8,
      type: "Action & Thriller",
      startTime: "Fri, May 6",
      endTime: "Sun, June 4",
      imgSrc: "/images/events/actiongirls.png",
      title: "Action Girls",
      shows: 7,
    },
  ],

  eventOrganiser: {
    title: "Pop Sugar Event Planner",
    eventsOrganised: 50,
    venue: "Capri Complex, D4, Texas",
    ratings: 4,
    description:
      "PopSugar Inc. is an American media & technology company that is the parent to the media property PopSugar and a monthly…read more.",
    imgSrc: "/images/events/drive.png",
    gallaryImages: [
      "/images/events/actiongirls.png",
      "/images/events/drive.png",
      "/images/events/badboys.png",
      "/images/events/enemylines.png",
      "/images/events/drive.png",
      "/images/events/actiongirls.png",
    ],
  },
  processing: false,
};

const reducer = (state = initState, action) => {
  let newState = { ...state };

  switch (action.type) {
    case actions.SET_ORGANISER_PROCESSING:
      setProcessing(newState, action.payload);
      break;
    default:
      break;
  }

  return newState;
};

const setProcessing = (state, payload) => {
  state.processing = payload;
};

export default reducer;
