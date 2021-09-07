import React, { Component } from "react";
import PrettyRating from "pretty-rating-react";
import { faStar, faStarHalfAlt } from "@fortawesome/free-solid-svg-icons";
import { faStar as farStar } from "@fortawesome/free-regular-svg-icons";
import "./style.css";
import ModelGallery from "./ModelGallery";

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

class EventOrganiserCard extends Component {
  render() {
    const { eventOrganiser, style, handleDetails, handleReviews } = this.props;
    let description = eventOrganiser.description;
    const characterArray = eventOrganiser.description.split("");
    let readMore = false;

    if (characterArray.length > 110) {
      description = description.slice(0, 110);
      description += "...";
      readMore = true;
    }

    const {
      imageURL,
      name,
      eventsOrganised,
      venue,
      rating,
      totalReviews,
      images,
    } = eventOrganiser;

    return (
      <div className="eventOrganiserContainer" style={style}>
        <img
          src={imageURL}
          className="eventOrganiserImage"
          alt="event organiser"
        />

        <h4 className="organiserCardTitle">{name}</h4>
        <p className="cardSubheading">Events Oraganised {eventsOrganised}</p>
        <p className="cardSubheading ">Venue - {venue}</p>
        <div className="cardSubheading borderBottom">
          <PrettyRating
            value={rating}
            icons={icons.star}
            colors={colors.star}
          />{" "}
          {rating || 0} Out of {totalReviews || 0}{" "}
          <u style={{ cursor: "pointer" }} onClick={handleReviews}>
            reviews
          </u>
        </div>
        {readMore ? (
          <>
            {" "}
            <p className="cardSubheading descriptionContainer">{description}</p>
            <button onClick={handleDetails} className="readMoreBtn">
              read more
            </button>{" "}
          </>
        ) : (
          <p className="cardSubheading descriptionContainer">{description}</p>
        )}

        <ModelGallery setDetailsView={handleDetails} images={images} />
      </div>
    );
  }
}

export default EventOrganiserCard;
