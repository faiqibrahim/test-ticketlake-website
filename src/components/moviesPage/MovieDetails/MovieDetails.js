import React, { Component } from "react";
import Error from "../../../commonComponents/error";
import Loader from "../../../commonComponents/loader/";
import { NavLink, withRouter } from "react-router-dom";
import { Breadcrumbs, BreadcrumbsItem } from "react-breadcrumbs-dynamic";
import CategoriesSection from "../CategoriesSection/CategoriesSection";
import { connect } from "react-redux";
import { dateAlreadyExists, getUniqueVenues } from "../helper";
import {
  getDateFromISO,
  getTimeFromISO,
  getDayFromISO,
} from "../../../utils/common-utils";
import { getAllSlotsDataOfEvent } from "../../../redux/event/event-actions";
import { Modal, ModalBody } from "reactstrap";
import { Link } from "react-scroll";
import MovieDetailSlider from "../../movieDetailSlider";

import { getSubCategoriesEvents } from "../../../redux/movies/movie-action";
import _ from "lodash";
import { Helmet } from "react-helmet";

class MovieDetails extends Component {
  state = {
    selectedDate: "",
    parentEventId: "",
    parentData: {},
    render: true,
    openIFrameModal: false,
    movieId: null,
  };

  componentDidMount() {
    this.getParentEventDetail();
  }
  componentDidUpdate() {
    const { match } = this.props;
    const { id } = match.params;
    const { movieId } = this.state;
    if (movieId && movieId !== id) {
      this.getParentEventDetail();
    }
  }

  getParentEventDetail = () => {
    let parentEventDetail = JSON.parse(
      sessionStorage.getItem("parentEventDetail")
    );

    const { match } = this.props;
    const { id: movieId } = match.params;

    const categories = [];
    _.forEach(parentEventDetail.categories, (category) => {
      categories.push(category._id);
    });

    this.setState({ parentData: parentEventDetail, movieId }, () => {
      this.props.getAllSlotsDataOfEvent(movieId);
      this.props.getSubCategoriesEvents(categories);
    });
  };

  getMovieState = () => {
    let categoryState = JSON.parse(sessionStorage.getItem("categoryState"));
    const {
      parentCategory: { _id: movieId },
    } = categoryState;

    return movieId;
  };

  pageTitle = () => {
    return (
      <Helmet>
        <title>Movie Detail</title>
      </Helmet>
    );
  };

  getBreadCrumbs = () => {
    const parentId = this.getParentState();
    return (
      <>
        <BreadcrumbsItem glyph="home" to="/">
          Home Page
        </BreadcrumbsItem>
        <BreadcrumbsItem glyph="movies" to={`/movies/?id=${parentId}`}>
          All Movies
        </BreadcrumbsItem>
        <BreadcrumbsItem to={"/event/detail/" + this.props.match.params.id}>
          Movie Detail
        </BreadcrumbsItem>

        <div className="breadcrumbs-hero-buttom fl-wrap">
          <div className="breadcrumbs">
            <Breadcrumbs
              compare={(a, b) => a.weight - b.weight}
              removeProps={{ weight: true }}
              item={NavLink}
              finalItem={"span"}
              finalProps={{
                style: { color: "#EC1C24" },
              }}
            />
          </div>
        </div>
      </>
    );
  };

  getCategoryId = () => {
    const { match } = this.props;
    return match.params.id;
  };

  onDateChange = (e) => {
    let { target } = e;
    let state = { ...this.state };
    state[target.name] = target.value;
    this.setState(state);
  };

  onMouseLeave = (e, id) => {
    let x = document.getElementById(id);
    x.pause();
  };

  showCustomTrailersSection = (customURLs) => {
    return (
      <div className="show-movies-trailers-wrp">
        <div className="container">
          <div className="video-trailers-wrp">
            <div className="heading-wrp">
              <div className={"heading-text"}>Movie Trailers</div>
              <div className="trailers-wrp">
                {customURLs &&
                  customURLs.map((data, index) => {
                    return (
                      <div
                        className="trailer-box col-md-3"
                        onMouseLeave={(e) => {
                          this.onMouseLeave(e, index);
                        }}
                      >
                        <video id={index} width="320" height="240" controls>
                          <source src={data.videoURL} type="video/mp4" />
                        </video>
                      </div>
                    );
                  })}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  showTimingSection = (uniqueDates, uniqueVenues) => {
    return (
      <div className="show-movies-timing-wrp" id={"timing-slot"}>
        <div className="container">
          <div className="heading-wrp">
            <div className={"heading-text"}>Show Timings</div>
            <div className="timing-filter-wrp">
              <select
                name="selectedDate"
                defaultValue={this.state.selectedDate}
                style={{
                  width: "100%",
                  padding: "0px 0px 0px 10px",
                  height: "40px",
                }}
                onChange={(e) => this.onDateChange(e)}
                className="filterDropDowns chosen-select"
              >
                {uniqueDates &&
                  uniqueDates.map((data) => {
                    return <option>{data}</option>;
                  })}
              </select>
            </div>
          </div>
          <div className="table-wrp">
            {uniqueVenues &&
              uniqueVenues.map((data, i) => {
                return (
                  <div className="table-view-box" key={i}>
                    <div className="left-content">
                      <div className="event-title heading-text">
                        {data.label}
                      </div>
                    </div>
                    <div className="right-content">
                      {data &&
                        data.data.map((timeSlot) => {
                          return (
                            <span
                              className="slots-box pointer"
                              onClick={() =>
                                this.props.history.push(
                                  `/buy-ticket/${timeSlot.data.eventSlotId}`
                                )
                              }
                            >
                              {getTimeFromISO(
                                timeSlot.data &&
                                  timeSlot.data.eventDateTimeSlot &&
                                  timeSlot.data.eventDateTimeSlot.eventStartTime
                              )}
                            </span>
                          );
                        })}
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    );
  };

  getUniqueDates = (dataArray) => {
    let uniqueDates = [];
    if (typeof dataArray !== "undefined") {
      for (let i = 0; i < dataArray.length; i++) {
        if (!dateAlreadyExists(uniqueDates, dataArray[i])) {
          uniqueDates.push(
            `${getDayFromISO(
              dataArray[i].eventDateTimeSlot.eventStartTime
            )}, ${getDateFromISO(
              dataArray[i].eventDateTimeSlot.eventStartTime
            )}`
          );
        }
      }
    }
    return uniqueDates;
  };

  getRelatedEvents = (relatedEvents, id) => {
    const uniqueEvent = [];
    if (typeof relatedEvents !== "undefined") {
      for (let i = 0; i < relatedEvents.length; i++) {
        if (id && id !== relatedEvents[i]._id) {
          uniqueEvent.push(relatedEvents[i]);
        }
      }
      return uniqueEvent.length > 0 ? (
        <MovieDetailSlider
          heading={"Related Movies"}
          text={"Explore Some More Movies related to this Category"}
          cards={uniqueEvent}
        />
      ) : null;
    }
  };

  getEventSlots = (selectedDate, dataArray) => {
    let eventSlotsArray = [];
    if (typeof dataArray !== "undefined") {
      for (let i = 0; i < dataArray.length; i++) {
        let dateValue = `${getDayFromISO(
          dataArray[i].eventDateTimeSlot &&
            dataArray[i].eventDateTimeSlot.eventStartTime
        )}, ${getDateFromISO(
          dataArray[i].eventDateTimeSlot &&
            dataArray[i].eventDateTimeSlot.eventStartTime
        )}`;
        if (selectedDate === dateValue) {
          eventSlotsArray.push(dataArray[i]);
        }
      }
    }
    return eventSlotsArray;
  };

  playTrailerInIFrame = () => {
    this.setState({ openIFrameModal: !this.state.openIFrameModal });
  };

  render() {
    const { castAndCrewMembers } = this.props;

    let uniqueDates = this.getUniqueDates(this.props.allSlotsDataOfEvent);
    let parentData = this.state.parentData && this.state.parentData;
    let bannerImage =
      parentData &&
      parentData.bannerImageKey &&
      parentData.bannerImageKey.imageUrl;
    let customURLs = parentData && parentData.customURLs;
    let youtubeLink = parentData && parentData.youtubeLink;
    let youtubeVideoId;
    if (youtubeLink) {
      let video_id = youtubeLink.split("v=")[1];
      if (video_id === undefined) {
        youtubeVideoId = "";
      } else {
        let ampersandPosition = video_id.indexOf("&");
        if (ampersandPosition !== -1) {
          video_id = video_id.substring(0, ampersandPosition);
        }
        youtubeVideoId = video_id;
      }
    }
    let eventSlots;
    if (this.state.selectedDate || (uniqueDates && uniqueDates[0])) {
      let date = this.state.selectedDate
        ? this.state.selectedDate
        : uniqueDates && uniqueDates[0];
      eventSlots = this.getEventSlots(date, this.props.allSlotsDataOfEvent);
    }

    let uniqueVenues = getUniqueVenues(eventSlots && eventSlots);
    let ticketPriceRange = `${
      parentData.eventMaximumTicketClassPrice
        ? parentData.eventMaximumTicketClassPrice ===
          parentData.eventMinimumTicketClassPrice
          ? `Buy Tickets from GHS${parentData.eventMaximumTicketClassPrice}`
          : `Buy Tickets from GHS${parentData.eventMinimumTicketClassPrice} - GHS${parentData.eventMaximumTicketClassPrice}`
        : "Buy Tickets"
    }`;

    if (this.props.processing) {
      return (
        <div id="wrapper">
          <div className="content">
            {this.pageTitle()}
            <Loader style={{ marginBottom: "20%" }} />
          </div>
        </div>
      );
    } else {
      if (this.props.error) {
        return <Error />;
      } else {
        return (
          <div id="wrapper">
            <div className="content">
              <section
                className="list-single-hero"
                data-scrollax-parent="true"
                id="sec1"
              >
                <div
                  className="bg par-elem"
                  style={{
                    float: "left",
                    translateY: "30%",
                  }}
                >
                  <img
                    src={bannerImage}
                    alt="Image1"
                    style={{ width: "100%", height: "100%" }}
                  />
                </div>
                <div className="list-single-hero-title fl-wrap">
                  <div className="container custom-container">
                    <div className="row">
                      <div className="col-md-12">
                        <div className="listing-rating-wrap">
                          <div
                            className="listing-rating card-popup-rainingvis"
                            data-starrating2={5}
                          />
                        </div>
                        <h2 style={{ marginBottom: "0" }}>
                          <span>{parentData && parentData.title}</span>
                        </h2>
                        <p
                          style={{
                            textAlign: "left",
                            color: "#ffffff",
                            paddingBottom: "0px",
                          }}
                        >
                          {parentData &&
                            parentData.categories &&
                            parentData.categories.map((category, i) => {
                              return (
                                <span key={i}>
                                  {category.title}{" "}
                                  {i === parentData.categories.length - 1
                                    ? " "
                                    : i === parentData.categories.length - 2
                                    ? "& "
                                    : ", "}
                                </span>
                              );
                            })}
                        </p>
                        <div className={"row"}>
                          <div className={"col-md-12"}>
                            <div className="movie-detail-description fl-wrap">
                              {parentData && parentData.description}
                            </div>
                          </div>
                          <div className={"col-md-12"}>
                            <div className={"row"}>
                              <div className={"col-md-12 movie-detail-btn-wrp"}>
                                <Link
                                  to={"timing-slot"}
                                  spy={true}
                                  smooth={true}
                                >
                                  <button
                                    className="simpleButton  backgroundColorRed"
                                    style={{ marginRight: "12px" }}
                                  >
                                    {ticketPriceRange}
                                  </button>
                                </Link>
                                <button
                                  className="simpleButton"
                                  onClick={() => this.playTrailerInIFrame()}
                                >
                                  <i
                                    className="fas fa-play"
                                    style={{ marginRight: "7px" }}
                                  />
                                  Play Trailer
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    {this.getBreadCrumbs()}
                  </div>
                </div>
              </section>

              <CategoriesSection childs={castAndCrewMembers} />

              {customURLs && customURLs.length > 0
                ? this.showCustomTrailersSection(customURLs)
                : null}

              {uniqueDates.length > 0 || uniqueVenues.length > 0
                ? this.showTimingSection(uniqueDates, uniqueVenues)
                : null}

              <div className={"related-events-wrp"}>
                {this.props.subCategoryEvents &&
                this.props.subCategoryEvents.length > 0
                  ? this.getRelatedEvents(
                      this.props.subCategoryEvents,
                      parentData._id
                    )
                  : null}
              </div>
            </div>
            <div className="limit-box fl-wrap" />
            <Modal
              isOpen={this.state.openIFrameModal}
              className={"modal-danger trailer-modal"}
              style={{ width: "100%", maxWidth: "1100px" }}
            >
              <button
                type="button"
                className="close trailer-close"
                onClick={() => this.playTrailerInIFrame()}
                data-dismiss="trailer-modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>

              <ModalBody>
                <iframe
                  title="Video Player"
                  width="100%"
                  height="350px"
                  src={`https://www.youtube.com/embed/${youtubeVideoId}`}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </ModalBody>
            </Modal>
          </div>
        );
      }
    }
  }
}

const mapStateToProps = (state) => {
  return {
    movieSlotDetail: state.event.movieSlotDetail,
    allSlotsDataOfEvent: state.event.allSlotsDataOfEvent,
    processing: state.event.processing,
    subCategoryEvents: state.movies.subCategoryEvents,
    castAndCrewMembers: state.event.castAndCrewMembers,
    error: state.event.error,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getSubCategoriesEvents: (categoryId, paginate, page, skip, pageSize) =>
      dispatch(
        getSubCategoriesEvents(categoryId, paginate, page, skip, pageSize)
      ),
    getAllSlotsDataOfEvent: (id) => dispatch(getAllSlotsDataOfEvent(id)),
  };
};

const connectedComponent = connect(
  mapStateToProps,
  mapDispatchToProps
)(MovieDetails);
export default withRouter(connectedComponent);
