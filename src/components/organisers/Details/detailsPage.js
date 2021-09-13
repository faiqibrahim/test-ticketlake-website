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
    const { eventsOrganised, venue, description } = this.props;

    return (
      <div className="container mt-5 mb-5">
        <div className="row mb-5">
          <div className="col-md-8 col-sm-12 ">
            <p className={classes.detailsTitle}>Description</p>

            <div className={classes.description}>{description}</div>
          </div>
          <div className="col-md-4 col-sm-12 ">
            <div className={classes.veneueText}>
              Events Organised{" "}
              <span style={{ color: "#ec1b23" }}> {eventsOrganised} </span>{" "}
            </div>
            <div className={classes.veneueText}>
              Venue -<span style={{ color: "#ec1b23" }}>{venue}</span>
            </div>
          </div>
        </div>

        <p className={classes.detailsTitle}>Gallery</p>
        <div className={"Gallery-section "} id={"gallery"}>
          <Gallery images={this.getImages()} enableImageSelection={false} />
        </div>
      </div>
    );
  }
}

export default Details;
