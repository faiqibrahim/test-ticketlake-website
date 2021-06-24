import React from "react";
import "./style.css";
import ModelGallery from "./ModelGallery";
const EventOrganiserCard = ({ eventOrganiser }) => {
  return (
    <div className="eventOrganiserContainer">
      <img
        src={eventOrganiser.imgSrc}
        className="eventOrganiserImage"
        alt="event organiser"
      />

      <h4 className="cardTitle">{eventOrganiser.title}</h4>
      <p className="cardSubheading">
        Events Oraganised {eventOrganiser.eventsOrganised}
      </p>
      <p className="cardSubheading">Venue - {eventOrganiser.venue}</p>
      <p className="cardSubheading">
        <img src="/icons/star.svg" className="alignNone mr-2" alt="star" />
        <img src="/icons/star.svg" className="alignNone mr-2" alt="star" />
        <img src="/icons/star.svg" className="alignNone mr-2" alt="star" />
        <img src="/icons/star.svg" className="alignNone mr-2" alt="star" />
        <img
          src="/icons/empty star.svg"
          className="alignNone mr-2"
          alt="star"
        />
        {eventOrganiser.ratings} Out of 300 reviews
      </p>
      <br />
      <hr />
      <br />
      <p className="cardSubheading descriptionContainer">
        {eventOrganiser.description}
      </p>
      <ModelGallery images={eventOrganiser.gallaryImages} />
    </div>
  );
};

export default EventOrganiserCard;
