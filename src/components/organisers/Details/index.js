import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import "./style.css";
import { connect } from "react-redux";
import Loader from "../../../commonComponents/loader";
import EventOrganiserCard from "./EventOrganiserCard";
import Sticky from "react-stickynode";
import Details from "./detailsPage";
import Reviews from "./reviews";
import ListView from "./listView";
import GridView from "./gridView";
import Banner from "./banner";
import EventsFilter from "./eventsFilter";
import DateFiliter from "./dateFilter";

class OrganiserDetails extends Component {
  state = {
    gridView: true,
    eventsBtn: true,
    offSet: true,
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
  componentDidMount() {
    if (window.screen.width < 768) this.setState({ gridView: false });
    window.addEventListener("resize", this.updateDimensions);

    if (window.screen.width < 1278) this.setState({ offSet: false });
    window.addEventListener("resize", this.updateDimensions);
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

  render() {
    const { eventOrganiser, processing, eventsList } = this.props;
    const { gridView, eventsBtn, detailsBtn, reviewsBtn } = this.state;
    if (processing) return <Loader style={{ marginTop: "170px" }} />;

    return (
      <div id="wrapper" className="textAlignLeft organiser-details">
        <Banner eventOrganiser={eventOrganiser} />{" "}
        {this.tabsContainer(eventsList)}
        {detailsBtn && <Details {...eventOrganiser} />}
        {reviewsBtn && <Reviews {...eventOrganiser} />}
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
                <EventsFilter />
                <DateFiliter />
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
                {gridView ? (
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
              Events ({eventsList.length})
            </button>
            <button
              onClick={this.setDetailsState}
              className={`customTabBtn ${
                detailsBtn ? "customTabBtnActive" : null
              }`}
            >
              Details
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
