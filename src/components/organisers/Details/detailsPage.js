import React, { Component } from "react";
import classes from "./style.module.css";

class Details extends Component {
  state = { count: 4 };

  render() {
    const { count } = this.state;
    const { name, eventsOrganised, venue, description, images } = this.props;

    let loadMore = false;
    let showImages = [];
    if (images) {
      showImages = images.slice(0, count);
      if (images.length > showImages.length) {
        loadMore = true;
        showImages = images.slice(0, count);
      }
    }

    return (
      <div className="container mt-5 mb-5">
        <p className={classes.detailsTitle}>{name}</p>
        <p className={classes.veneueText}>Events Organised {eventsOrganised}</p>
        <p className={classes.veneueText}>Venue - {venue}</p>
        <div className="col-md-8 col-sm-12 p-0">
          <p className={classes.description}>{description}</p>
        </div>
        <p className={classes.detailsTitle}>Gallery</p>
        <div className="row">
          {showImages.map((image, index) => (
            <div className="col-lg-3 col-md-4 col-sm-6  mb-3" key={index}>
              <img
                src={image.imageUrl}
                className={classes.galleryImages}
                alt="gallery"
              />
            </div>
          ))}
        </div>
        {loadMore ? (
          <button
            onClick={() => {
              this.setState({ count: count + 4 });
            }}
            className={classes.loadMoreBtn}
          >
            Load More
          </button>
        ) : null}
      </div>
    );
  }
}

export default Details;
