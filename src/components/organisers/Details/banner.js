import React from "react";

const Banner = ({ eventOrganiser }) => {
  return (
    <div className="bannerBackground">
      <div className="container ">
        <img
          src={eventOrganiser.imageURL}
          className="mt-5 mb-3 eventOrganiserTopImage "
          alt="event planner"
        />
        <p className="bannerHeading">{eventOrganiser.name}</p>
        <p className="ratingStarText pb-5 mb-0">
          {/* {eventOrganiser.ratingImages.map((image, index) => (
            <img
              src={image.src}
              className="alignNone mr-2"
              key={index}
              alt="star"
            />
          ))} */}
          {eventOrganiser.rating} Out of {eventOrganiser.totalReviews}{" "}
          <u>reviews</u>
        </p>
      </div>
    </div>
  );
};

export default Banner;
