const initState = {
  organiserList: [
    {
      id: 1,
      imgSrc: "/images/votingimages/image1.png",
      title: "Pop sugar Event planner",
      location: "Ghana",
      events: "20",
    },
    {
      id: 2,
      imgSrc: "/images/votingimages/image1_2.png",
      title: "Pop sugar Event planner",
      location: "Ghana",
      events: "20",
    },
    {
      id: 3,
      imgSrc: "/images/votingimages/image3.png",
      title: "Mugler Angel Events",
      location: "Ghana",

      events: "20",
    },
    {
      id: 4,
      imgSrc: "/images/votingimages/image4.png",
      title: "Flowater Event Planner",
      location: "Ghana",

      events: "20",
    },
    {
      id: 5,
      imgSrc: "/images/votingimages/image5.png",
      title: "Synology Events",
      location: "Ghana",
      events: "20",
    },
    {
      id: 6,
      imgSrc: "/images/votingimages/image6.png",
      title: "Camellia Blossom Events",
      location: "Ghana",

      events: "20",
    },
    {
      id: 7,
      imgSrc: "/images/votingimages/image7.png",
      title: "Fitness Freaks Nationwe",
      location: "Ghana",
      events: "20",
    },
    {
      id: 8,
      imgSrc: "/images/votingimages/image8.png",
      title: "Camellia Blossom Events",
      location: "Ghana",
      events: "20",
    },
  ],
};

const reducer = (state = initState, action) => {
  let newState = { ...state };

  switch (action.type) {
  }

  return newState;
};

export default reducer;
