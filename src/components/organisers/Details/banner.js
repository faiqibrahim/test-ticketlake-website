import React from "react";
import PrettyRating from "pretty-rating-react";
import { faStar, faStarHalfAlt } from "@fortawesome/free-solid-svg-icons";
import { faStar as farStar } from "@fortawesome/free-regular-svg-icons";

const icons = {
  star: {
    complete: faStar,
    half: faStarHalfAlt,
    empty: farStar,
  },
};

const colors = {
  star: ["FFB500", "FFB500", "FFB500"],
};

const Banner = (props) => {
  const { handleReviews, eventOrganiser } = props;

  const { imageURL, name, rating, totalReviews } = eventOrganiser;

  return (
    <div className="bannerBackground">
      <div className="container ">
        <img
          src={imageURL}
          className="mt-5 mb-3 eventOrganiserTopImage "
          alt="event planner"
        />
        <p className="bannerHeading">{name}</p>
        <div className="ratingStarText pb-5 mb-0">
          <PrettyRating
            value={rating}
            icons={icons.star}
            colors={colors.star}
          />
          {rating ? rating : 0} Out of {totalReviews ? totalReviews : 0}{" "}
          <u style={{ cursor: "pointer" }} onClick={handleReviews}>
            reviews
          </u>
        </div>
      </div>
    </div>
  );
};

export default Banner;
