import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import "./style.css";
import { Select } from "antd";
import { connect } from "react-redux";
import Loader from "../../../commonComponents/loader";
import { Card } from "react-bootstrap";
import moment from "moment";
import EventOrganiserCard from "./EventOrganiserCard";
import Sticky from "react-stickynode";
import Details from "./detailsPage";
import Reviews from "./reviews";

const { Option } = Select;

class OrganiserDetails extends Component {
  state = {
    gridView: true,
    filteredEvents: [],
    eventsBtn: true,
  };

  renderDateFilter = () => {
    return (
      <div className="category-filter  col-xl-2 col-lg-3 col-md-3 col-sm-6 col-xs-6 ">
        <div>
          <Select
            defaultValue="all"
            placeholder="filter by"
            className="chosen-select  filterDropDowns organiserCategorySelect filterBy customHeight"
          >
            <Option value="all">All</Option>
            <Option value="today">Today</Option>
            <Option value="yesterday">Tomorrow</Option>
            <Option value="last7Days">Next 7 days</Option>
            <Option value="last30Days">Next 30 days</Option>
          </Select>
        </div>
      </div>
    );
  };

  setEvents = (eventType) => {
    const { eventsList } = this.props;

    if (eventType === "all") {
      return this.setState({ filteredEvents: [] });
    }

    const currentMonth = moment().get("month") + 1;
    const date = moment().get("date");
    let filteredEvents;

    if (eventType === "active") {
      filteredEvents = eventsList.filter((event) => {
        let dateArray = event.endTime.split(" ");

        const eventMonth = moment()
          .month(dateArray[1])
          .format("M");

        if (currentMonth < eventMonth) {
          return event;
        }

        if (currentMonth > eventMonth) {
          return null;
        } else {
          if (date < dateArray[2]) {
            return event;
          } else return null;
        }
      });
    } else {
      filteredEvents = eventsList.filter((event) => {
        let dateArray = event.endTime.split(" ");

        const eventMonth = moment()
          .month(dateArray[1])
          .format("M");

        if (currentMonth > eventMonth) {
          return event;
        }

        if (currentMonth < eventMonth) {
          return null;
        } else {
          if (date > dateArray[2]) {
            return event;
          } else return null;
        }
      });
    }

    this.setState({ filteredEvents });
  };

  renderEventFilter = () => {
    return (
      <div className="category-filter  col-xl-2 col-lg-3 col-md-3 col-sm-6 col-xs-6  ">
        <div>
          <Select
            defaultValue="all"
            placeholder="Events"
            className="chosen-select  filterDropDowns organiserCategorySelect events customHeight"
            onChange={(eventType) => this.setEvents(eventType)}
          >
            <Option value="all">All</Option>
            <Option value="active">Active</Option>
            <Option value="past">Past</Option>
          </Select>
        </div>
      </div>
    );
  };

  getImageCards = (eventsList) => {
    return (
      <div className="mb-100 setWidth">
        <div className="row organiser-row">
          {eventsList.map((event) => {
            return (
              <div
                className="col-xl-3 col-lg-4 col-md-6 marginBottom"
                key={event.id}
              >
                <Card key={event.id} className="cardStyling">
                  <Card.Img
                    className="eventCardImage"
                    variant="top"
                    src={event.imgSrc}
                  />
                  <div>
                    <p className="cardTitle">{event.title}</p>
                    <p className="cardSubheading">{event.type}</p>
                    <p className="cardSubheading" style={{ color: "#EC1B23" }}>
                      {event.startTime}-{event.endTime}
                    </p>
                    <p className="cardSubheading">{event.shows} Shows</p>
                  </div>
                </Card>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  setView = (view) => {
    if (view === true) this.setState({ gridView: true });
    else this.setState({ gridView: false });
  };

  listView = (eventsList) => {
    return eventsList.map((event) => (
      <div className="listViewCard" key={event.id}>
        <div className="card">
          <div className="row no-gutters">
            <div className="col-auto">
              <img src={event.imgSrc} className="listViewImage" alt="" />
            </div>
            <div className="col">
              <div className="card-block px-4">
                <h4 className="cardTitle">{event.title}</h4>
                <p className="cardSubheading">{event.type}</p>
                <p className="cardSubheading" style={{ color: "#EC1B23" }}>
                  {event.startTime}-{event.endTime}
                </p>
                <p className="cardSubheading">{event.shows} Shows</p>
              </div>
            </div>
          </div>
        </div>
        <hr />
      </div>
    ));
  };

  updateDimensions = () => {
    if (window.innerWidth < 768 && this.state.gridView) {
      this.setState({ gridView: false });
      console.log("grid vview");
    }
  };
  componentDidMount() {
    if (window.screen.width < 768) this.setState({ gridView: false });
    window.addEventListener("resize", this.updateDimensions);
  }
  componentWillUnmount() {
    window.removeEventListener("resize", this.updateDimensions);
  }

  setDetailsState = () => {
    this.setState(
      this.setState({
        eventsBtn: false,
        detailsBtn: true,
        reviewsBtn: false,
      })
    );
  };

  render() {
    const { eventOrganiser, processing, eventsList } = this.props;
    const {
      gridView,
      filteredEvents,
      eventsBtn,
      detailsBtn,
      reviewsBtn,
    } = this.state;
    console.log("state", this.state);
    const organiserEvents = filteredEvents.length ? filteredEvents : eventsList;
    if (processing) return <Loader style={{ marginTop: "170px" }} />;

    return (
      <div id="wrapper" className="textAlignLeft organiser-details">
        {this.getBanner(eventOrganiser)}
        {this.tabsContainer(organiserEvents)}
        {detailsBtn && <Details {...eventOrganiser} />}
        {reviewsBtn && <Reviews {...eventOrganiser} />}
        {eventsBtn && (
          <>
            <div className="container  ">
              <div className=" customBorder row">
                <p className="fontSetting col-xl-3 col-lg-3 col-md-3 col-sm-12 ">
                  {organiserEvents.length} Events
                </p>
                <div className="marginLeftAuto">
                  <button
                    className="btnGrid"
                    onClick={() => {
                      this.setView(false);
                    }}
                  >
                    {gridView ? (
                      <img
                        src="/icons/list.svg"
                        height="52px"
                        alt="list icon"
                      />
                    ) : (
                      <img
                        src="/icons/list-active.svg"
                        height="52px"
                        alt="list icon"
                      />
                    )}
                  </button>
                  <button
                    className="btnGrid "
                    onClick={() => {
                      this.setView(true);
                    }}
                  >
                    {gridView ? (
                      <img
                        src="/icons/grid-active.svg"
                        height="52px"
                        alt="list icon"
                      />
                    ) : (
                      <img
                        src="/icons/grid.svg"
                        height="52px"
                        alt="grid icon"
                      />
                    )}
                  </button>
                </div>
                {this.renderEventFilter()}
                {this.renderDateFilter()}
              </div>
              <hr />
            </div>

            <div className="container ">
              <EventOrganiserCard
                style={{ marginTop: !gridView ? "40px" : "0px" }}
                eventOrganiser={eventOrganiser}
                handleDetails={this.setDetailsState}
              />

              <div className="">
                {gridView
                  ? this.getImageCards(organiserEvents)
                  : this.listView(organiserEvents)}
              </div>
            </div>
          </>
        )}
      </div>
    );
  }

  getBanner(eventOrganiser) {
    return (
      <div className="bannerBackground">
        <div className="container ">
          <img
            src={eventOrganiser.imgSrc}
            className="mt-5 mb-3 eventOrganiserTopImage "
            alt="event planner"
          />
          <p className="bannerHeading">{eventOrganiser.title}</p>
          <p className="eventTypesText">{eventOrganiser.eventTypes}</p>
          <p className="ratingStarText pb-5 mb-0">
            {eventOrganiser.ratingImages.map((image) => (
              <img src={image.src} className="alignNone mr-2" alt="star" />
            ))}
            {eventOrganiser.ratings} Out of {eventOrganiser.totalReviews}{" "}
            <u>reviews</u>
          </p>
        </div>
      </div>
    );
  }

  tabsContainer = (organiserEvents) => {
    const { eventsBtn, detailsBtn, reviewsBtn } = this.state;

    return (
      <Sticky enabled={true} top={50} innerZ={10}>
        <div className="tabsBackground ">
          <div className="container  tabscontainer">
            <button
              onClick={() => {
                this.setState({
                  eventsBtn: true,
                  detailsBtn: false,
                  reviewsBtn: false,
                });
              }}
              className={`customTabBtn eventsBtnBorderRadius ${
                eventsBtn ? "customTabBtnActive" : null
              }`}
            >
              Events ({organiserEvents.length})
            </button>
            <button
              onClick={() => {
                this.setState({
                  eventsBtn: false,
                  detailsBtn: true,
                  reviewsBtn: false,
                });
              }}
              className={`customTabBtn ${
                detailsBtn ? "customTabBtnActive" : null
              }`}
            >
              Details{" "}
            </button>
            <button
              onClick={() => {
                this.setState({
                  eventsBtn: false,
                  detailsBtn: false,
                  reviewsBtn: true,
                });
              }}
              className={`customTabBtn reviewsBtnBorderRadius ${
                reviewsBtn ? "customTabBtnActive" : null
              }`}
            >
              Reviews{" "}
            </button>
          </div>
        </div>
      </Sticky>
    );
  };
}

const mapStateToProps = (state) => {
  return {
    eventsList: state.organiser.eventsList,
    processing: state.organiser.processing,
    eventOrganiser: state.organiser.eventOrganiser,
  };
};

const connectedComponent = connect(
  mapStateToProps,
  {}
)(OrganiserDetails);

export default withRouter(connectedComponent);
