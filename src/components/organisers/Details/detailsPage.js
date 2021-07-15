import React from "react";
import classes from "./style.module.css";
import ModelGallery from "./ModelGallery";

const Details = (props) => {
  const { title, eventsOrganised, venue, description, gallaryImages } = props;
  return (
    <div className="container mt-5 mb-5">
      <p className={classes.detailsTitle}>{title}</p>
      <p className={classes.veneueText}>Events Organised {eventsOrganised}</p>
      <p className={classes.veneueText}>Venue - {venue}</p>
      <p className={classes.description}>{description}</p>
      <p className={classes.detailsTitle}>Gallery</p>
      <ModelGallery images={gallaryImages} />
    </div>
  );
};

export default Details;
