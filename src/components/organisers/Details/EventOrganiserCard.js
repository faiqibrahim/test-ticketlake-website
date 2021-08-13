import React, { Component } from "react";
import "./style.css";
import ModelGallery from "./ModelGallery";

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

    return (
      <div className="eventOrganiserContainer" style={style}>
        <img
          src={eventOrganiser.imageURL}
          className="eventOrganiserImage"
          alt="event organiser"
        />

        <h4 className="cardTitle">{eventOrganiser.title}</h4>
        <p className="cardSubheading">
          Events Oraganised {eventOrganiser.eventsOrganised}
        </p>
        <p className="cardSubheading ">Venue - {eventOrganiser.venue}</p>
        <p className="cardSubheading borderBottom">
          {/* {eventOrganiser.ratingImages.map((image, index) => (
            <img
              src={image.src}
              className="alignNone mr-2"
              key={index}
              alt="star"
            />
          ))} */}
          {eventOrganiser.rating} Out of {eventOrganiser.totalReviews}{" "}
          <u style={{ cursor: "pointer" }} onClick={handleReviews}>
            reviews
          </u>
        </p>
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

        <ModelGallery images={eventOrganiser.images} />
      </div>
    );
  }
}

export default EventOrganiserCard;
