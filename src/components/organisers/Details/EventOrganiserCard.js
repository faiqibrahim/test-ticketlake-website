import React, { Component } from "react";
import "./style.css";
import ModelGallery from "./ModelGallery";

class EventOrganiserCard extends Component {
  state = {
    hide: false,
  };

  render() {
    const { eventOrganiser, style } = this.props;
    const { hide } = this.state;
    console.log("stye", style);
    if (hide) return null;

    return (
      <div className="eventOrganiserContainer" style={style}>
        <img
          src={eventOrganiser.imgSrc}
          className="eventOrganiserImage"
          alt="event organiser"
        />

        <h4 className="cardTitle">{eventOrganiser.title}</h4>
        <p className="cardSubheading">
          Events Oraganised {eventOrganiser.eventsOrganised}
        </p>
        <p className="cardSubheading ">Venue - {eventOrganiser.venue}</p>
        <p className="cardSubheading borderBottom">
          {eventOrganiser.ratingImages.map((image) => (
            <img src={image.src} className="alignNone mr-2" alt="star" />
          ))}
          {eventOrganiser.ratings} Out of {eventOrganiser.totalReviews}{" "}
          <u>reviews</u>
        </p>

        <p className="cardSubheading descriptionContainer">
          {eventOrganiser.description}
        </p>
        <ModelGallery images={eventOrganiser.gallaryImages} />
      </div>
    );
  }
}

export default EventOrganiserCard;
