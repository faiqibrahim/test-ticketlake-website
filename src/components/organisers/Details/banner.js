import React from "react";
import { Rate } from "antd";

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
        <div className="ratingStarText pb-5 mb-0">
          <Rate allowHalf disabled defaultValue={4.5} /> {eventOrganiser.rating}{" "}
          Out of {eventOrganiser.totalReviews} <u>reviews</u>
        </div>
      </div>
    </div>
  );
};

export default Banner;
