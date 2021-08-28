// Library
import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

// Component
import SectionHeading from "../../commonComponents/sectionHeading";
import CardSlider from "../../commonComponents/cardSlider";
import {
  getWishListIdsFromApi,
  wishListToggle,
} from "../../redux/wishlist/wishlist-actions";
import DefaultCardMovieDetail from "../../commonComponents/defaultCardMovieDetail";
import { buttonSettings, sliderSettings } from "../../utils/config";

class MovieDetailSlider extends Component {
  state = {
    activeModal: "",
    width: window.innerWidth,
    path: null,
    longitude: null,
    latitude: null,
  };

  componentDidMount() {
    window.addEventListener("resize", this.resize.bind(this));
    this.resize();
    this.getCurrentPosition();
  }

  getCurrentPosition = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          this.getLatLong(position.coords.latitude, position.coords.longitude);
        },
        () => {
          // this.handleLocationError();
        },
        {
          enableHighAccuracy: true,
        }
      );
    }
  };

  getLatLong = (a, b) => {
    this.setState({
      latitude: a,
      longitude: b,
    });
  };

  resize() {
    this.setState({ width: window.innerWidth });
  }

  onClickWrp = (card) => {
    sessionStorage.setItem("parentEventDetail", JSON.stringify(card));
    if (card && card._id) {
      const cardId = card._id;
      this.props.history.push(`/movie/detail/${cardId}`);
    }
  };

  /******************** Settings *************************/
  // Slider Settings
  mainSliderSettings = {
    ...sliderSettings,
    initialSlide: 0,
    cssEase: "ease-in",
    centerMode: true,
    centerPadding: "0px",
    lazyLoad: true,
    autoplaySpeed: 0,
  };

  /******************** End *************************/

  distance(lat1, lat2, lon1, lon2) {
    // The math module contains a function
    // named toRadians which converts from
    // degrees to radians.
    lon1 = (lon1 * Math.PI) / 180;
    lon2 = (lon2 * Math.PI) / 180;
    lat1 = (lat1 * Math.PI) / 180;
    lat2 = (lat2 * Math.PI) / 180;

    // Haversine formula
    let dlon = lon2 - lon1;
    let dlat = lat2 - lat1;
    let a =
      Math.pow(Math.sin(dlat / 2), 2) +
      Math.cos(lat1) * Math.cos(lat2) * Math.pow(Math.sin(dlon / 2), 2);

    let c = 2 * Math.asin(Math.sqrt(a));

    let r = 6371;

    // calculate the result
    return (c * r).toFixed(2);
  }

  render() {
    const { heading, text, cards } = this.props;
    const { longitude, latitude } = this.state;
    const cardDisplay = [];

    Array.isArray(cards) &&
      cards.forEach((card, i) => {
        const venueObjects = [];
        const { venues } = card;
        let nearestVenue = null;
        if (longitude && latitude) {
          venues.forEach((venue) => {
            const { latitude: venueLat, longitude: venueLong } = venue;
            const venueDistance = this.distance(
              latitude,
              venueLat,
              longitude,
              venueLong
            );

            venueObjects.push({ distance: venueDistance, name: venue.name });
          });

          nearestVenue = venueObjects.sort(
            (one, other) => one.distance - other.distance
          )[0];
        }
        const venueName = nearestVenue ? nearestVenue.name : venues[0].name;
        const distance = nearestVenue ? nearestVenue.distance : null;

        cardDisplay.push(
          <div className="slick-slide-item" key={card._id}>
            <>
              <DefaultCardMovieDetail
                key={i}
                gridLg={12}
                gridMd={12}
                gridSm={12}
                cardTitle={card.title}
                venueName={venueName}
                distance={distance}
                image={
                  (card.bannerImageKey && card.bannerImageKey.imageUrl) ||
                  (card.imageKey && card.imageKey.imageUrl)
                }
                startDate={card.startDateTime}
                endDate={card.endDateTime}
                onClickWrp={this.onClickWrp}
                buttonMaximumTicketPrice={card.eventMaximumTicketClassPrice}
                buttonMinimumTicketPrice={card.eventMinimumTicketClassPrice}
                buttonLink={`/buy-ticket/${card._id}`}
                description={card.description}
                id={card._id}
                data={card}
              />
            </>
          </div>
        );
      });

    this.mainSliderSettings.infinite =
      cards.length > this.mainSliderSettings.slidesToShow;
    buttonSettings.display =
      this.state.width > 1024
        ? cards.length > this.mainSliderSettings.slidesToShow
        : true;

    return (
      <section>
        <SectionHeading heading={heading} text={text && text ? text : ""} />

        <div className="list-carousel fl-wrap card-listing ">
          <div className="listing-carousel  fl-wrap ">
            <CardSlider
              settings={this.mainSliderSettings}
              buttons={buttonSettings}
            >
              {cardDisplay}
            </CardSlider>
          </div>
        </div>
      </section>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    wishLists: state.wishlist.wishListIds,
    auth: state.user.authenticated,
  };
};

const connectedComponent = connect(mapStateToProps, {
  getWishListIdsFromApi,
  wishListToggle,
})(MovieDetailSlider);
export default withRouter(connectedComponent);
