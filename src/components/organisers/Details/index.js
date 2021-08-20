import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import "./style.css";
import { connect } from "react-redux";
import Loader from "../../../utils/loader";
import EventOrganiserCard from "./EventOrganiserCard";
import Sticky from "react-stickynode";
import Details from "./detailsPage";
import Reviews from "./reviews";
import ListView from "./listView";
import GridView from "./gridView";
import Banner from "./banner";
import EventsFilter from "./eventsFilter";
import DateFilter from "./dateFilter";
import CustomButton from "./customTabButton";
import { getOrganiserData, getOrganisationEvents } from "./api-handler";
import { NotificationManager } from "react-notifications";

class OrganiserDetails extends Component {
  state = {
    gridView: true,
    eventsBtn: true,
    offSet: true,
    loader: true,
    filterLoader: false,
    active: "all",
    timeFrame: "all",
  };

  setView = (view) => {
    if (view === true) this.setState({ gridView: true });
    else this.setState({ gridView: false });
  };

  updateDimensions = () => {
    if (window.innerWidth < 768 && this.state.gridView) {
      this.setState({ gridView: false });
    }

    if (window.innerWidth < 1278) {
      this.setState({ offSet: false });
    } else {
      this.setState({ offSet: true });
    }
  };

  fetchAllData = () => {
    this.fetchEventOrganiserData();
    this.fethEventsList();
  };

  fetchEventOrganiserData = async () => {
    const { match } = this.props;

    const { id } = match.params;

    try {
      const response = await getOrganiserData(id);
      const {
        name,
        description,
        imageURL,
        images,
        address,
        reviews,
        totalReviews,
        rating,
        eventsOrganized,
        _id,
      } = response.data.data;

      const eventOrganiser = {
        name,
        description,
        imageURL,
        images,
        venue: address.address,
        rating,
        totalReviews,
        eventsOrganised: eventsOrganized,
      };

      this.setState({
        eventOrganiser,
        _id,
        reviews,
      });
    } catch (err) {
      NotificationManager.error("Some Error Occured!", "Error");
    }
  };

  fethEventsList = async () => {
    const { match } = this.props;
    const { id } = match.params;

    const { active, timeFrame } = this.state;

    try {
      const response = await getOrganisationEvents(id, active, timeFrame);

      const eventsList = response.data.data;

      this.setState({
        eventsList,
        loader: false,
        filterLoader: false,
      });
    } catch (err) {
      NotificationManager.error("Some Error Occured!", "Error");
    }
  };

  componentDidMount() {
    if (window.screen.width < 768) this.setState({ gridView: false });
    window.addEventListener("resize", this.updateDimensions);

    if (window.screen.width < 1278) this.setState({ offSet: false });
    window.addEventListener("resize", this.updateDimensions);
    this.fetchAllData();
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateDimensions);
  }

  setDetailsState = () => {
    this.setState({
      eventsBtn: false,
      detailsBtn: true,
      reviewsBtn: false,
    });
  };

  getGridBtn = () => {
    const { gridView } = this.state;
    return (
      <button
        className="btnGrid "
        onClick={() => {
          this.setView(true);
        }}
      >
        {gridView ? (
          <img src="/icons/grid-active.svg" height="52px" alt="list icon" />
        ) : (
          <img src="/icons/grid.svg" height="52px" alt="grid icon" />
        )}
      </button>
    );
  };

  getListBtn = () => {
    const { gridView } = this.state;
    return (
      <button
        className="btnGrid"
        onClick={() => {
          this.setView(false);
        }}
      >
        {gridView ? (
          <img src="/icons/list.svg" height="52px" alt="list icon" />
        ) : (
          <img src="/icons/list-active.svg" height="52px" alt="list icon" />
        )}
      </button>
    );
  };

  setEventsState = () => {
    this.setState({
      eventsBtn: true,
      detailsBtn: false,
      reviewsBtn: false,
    });
  };

  setReviewsState = () => {
    this.setState({
      eventsBtn: false,
      detailsBtn: false,
      reviewsBtn: true,
    });
  };

  setEventsFilter = (e) => {
    let disable = false;

    if (e === "false") {
      disable = true;
    }
    this.setState(
      { active: e, disable, timeFrame: "all", filterLoader: true },
      () => {
        this.fethEventsList();
      }
    );
  };

  setDateFilter = (e) => {
    this.setState({ timeFrame: e, active: true, filterLoader: true }, () => {
      this.fethEventsList();
    });
  };

  render() {
    const {
      gridView,
      eventsBtn,
      detailsBtn,
      reviewsBtn,
      loader,
      eventOrganiser,
      reviews,
      _id,
      eventsList,
      disable,
      filterLoader,
    } = this.state;

    if (loader) return <Loader />;

    return (
      <div id="wrapper" className="textAlignLeft organiser-details">
        <Banner
          handleReviews={this.setReviewsState}
          eventOrganiser={eventOrganiser}
        />{" "}
        {this.tabsContainer(eventsList)}
        {detailsBtn && <Details {...eventOrganiser} />}
        {reviewsBtn && (
          <Reviews
            _id={_id}
            fetchUpdatedData={this.fetchEventOrganiserData}
            reviews={reviews}
          />
        )}
        {eventsBtn && (
          <>
            <div className="container  ">
              <div className=" customBorder row">
                <p className="fontSetting col-xl-3 col-lg-3 col-md-3 col-sm-12 ">
                  {eventsList.length} Events
                </p>
                <div className="marginLeftAuto">
                  {this.getListBtn()}
                  {this.getGridBtn()}
                </div>
                <EventsFilter setEventFilterValue={this.setEventsFilter} />
                <DateFilter
                  disable={disable}
                  setDateFilterValue={this.setDateFilter}
                />
              </div>
              <hr />
            </div>

            <div className="container ">
              <EventOrganiserCard
                style={{ marginTop: !gridView ? "40px" : "0px" }}
                eventOrganiser={eventOrganiser}
                handleDetails={this.setDetailsState}
                handleReviews={this.setReviewsState}
              />

              <div className="">
                {filterLoader ? (
                  <Loader />
                ) : gridView ? (
                  <GridView eventsList={eventsList} />
                ) : (
                  <ListView eventsList={eventsList} />
                )}
              </div>
            </div>
          </>
        )}
      </div>
    );
  }

  tabsContainer = (eventsList) => {
    const { eventsBtn, detailsBtn, reviewsBtn, offSet } = this.state;

    return (
      <Sticky enabled={true} top={offSet ? 60 : 110} innerZ={6}>
        <div className="tabsBackground ">
          <div className="container  tabscontainer ">
            <div className="row">
              <div className="col-lg-2 col-md-3 col-sm-4 col-4 pr-0">
                <CustomButton
                  value={`Events (${eventsList.length})`}
                  handleClick={this.setEventsState}
                  active={eventsBtn}
                  styling={"eventsBtnBorderRadius"}
                />
              </div>
              <div className="col-lg-2 col-md-3 col-sm-4 col-4 p-0">
                <CustomButton
                  value={"Details"}
                  handleClick={this.setDetailsState}
                  active={detailsBtn}
                  styling={""}
                />{" "}
              </div>
              <div className="col-lg-2 col-md-3 col-sm-4 col-4 p-0 borderRadiusAndColor">
                <CustomButton
                  value={"Reviews"}
                  handleClick={this.setReviewsState}
                  active={reviewsBtn}
                  styling={"reviewsBtnBorderRadius"}
                />
              </div>
              <div className="col-lg-6 col-md-3 emptyColumn p-0"></div>
            </div>
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

const connectedComponent = connect(mapStateToProps)(OrganiserDetails);

export default withRouter(connectedComponent);
