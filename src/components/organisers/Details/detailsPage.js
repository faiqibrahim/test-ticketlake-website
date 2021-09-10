import React, { Component } from "react";
import classes from "./style.module.css";
import Gallery from "react-grid-gallery";

class Details extends Component {
  getImages = () => {
    const { images } = this.props;
    const arrangeImages = images.map((image) => ({
      src: image.imageUrl,
      thumbnail: image.imageUrl,
    }));
    return arrangeImages;
  };

  render() {
    const { name, eventsOrganised, venue, description } = this.props;

    return (
      <div className="container mt-5 mb-5">
        <p className={classes.detailsTitle}>{name}</p>
        <p className={classes.veneueText}>Events Organised {eventsOrganised}</p>
        <p className={classes.veneueText}>Venue - {venue}</p>
        <div className="col-md-8 col-sm-12 p-0">
          <p className={classes.description}>{description}</p>
        </div>
        <p className={classes.detailsTitle}>Gallery</p>
        <div className={"Gallery-section"} id={"gallery"}>
          <Gallery
            className={classes.galleryImages}
            images={this.getImages()}
            enableImageSelection={false}
          />
        </div>
      </div>
    );
  }
}

export default Details;
