import React, { Component } from "react";
import { Breadcrumb } from "antd";
import { Link, withRouter } from "react-router-dom";
import "./style.css";
import { Select } from "antd";
import { connect } from "react-redux";
import Loader from "../../../commonComponents/loader";
import { Card } from "react-bootstrap";
import moment from "moment";
import EventOrganiserCard from "./EventOrganiserCard";
const { Option } = Select;

class OrganiserDetails extends Component {
  state = {
    eventsList: "",
    gridView: true,
    processing: true,
  };

  getBreadcrumb = () => {
    return (
      <Breadcrumb className="itemColor" separator="//">
        <Breadcrumb.Item>
          <Link to={"/"}>Home</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          <Link to={"/organisers"}>Event Organisers</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>Pop sugar </Breadcrumb.Item>
      </Breadcrumb>
    );
  };

  handleDateChange = (e) => {};

  renderDateFilter = () => {
    return (
      <div className="category-filter  col-xl-3 col-lg-3 col-md-6 col-sm-12 col-xs-12 ">
        <div>
          <Select
            defaultValue="all"
            placeholder="filter by"
            className="chosen-select  filterDropDowns organiserCategorySelect filterBy customHeight"
            onChange={(e) => this.handleDateChange(e)}
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

  setEvents = (e) => {
    const { eventsList } = this.props;

    if (e === "all") {
      return this.setState({ eventsList });
    }

    const currentMonth = moment().get("month") + 1;
    const date = moment().get("date");
    let filteredEvents;
    if (e === "active") {
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

    this.setState({ eventsList: filteredEvents });
  };

  renderEventFilter = () => {
    return (
      <div className="category-filter  col-xl-3 col-lg-3 col-md-6 col-sm-12 col-xs-12 ">
        <div>
          <Select
            defaultValue="all"
            placeholder="Events"
            className="chosen-select  filterDropDowns organiserCategorySelect events customHeight"
            onChange={(e) => this.setEvents(e)}
          >
            <Option value="all">All</Option>
            <Option value="active">Active</Option>
            <Option value="past">Past</Option>
          </Select>
        </div>
      </div>
    );
  };

  componentDidMount() {
    const { eventsList } = this.props;
    this.setState({ eventsList, processing: false });
  }

  getImageCards = () => {
    const { eventsList } = this.state;
    return (
      <div className="mb-100">
        <div className="row organiser-row">
          {eventsList.map((event) => {
            return (
              <div
                className="col-xl-3 col-lg-3 col-md-4 col-xs-6 col-sm-6 marginBottom"
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
                    <p className="cardSubheading">
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

  listView = () => {
    const { eventsList } = this.state;
    return eventsList.map((event) => (
      <div className="listViewCard" key={event.id}>
        <div className="card">
          <div className="row no-gutters">
            <div className="col-auto">
              <img src={event.imgSrc} height="135px" alt="" />
            </div>
            <div className="col">
              <div className="card-block px-4">
                <h4 className="cardTitle">{event.title}</h4>
                <p className="cardSubheading">{event.type}</p>
                <p className="cardSubheading">
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

  render() {
    const { eventOrganiser } = this.props;
    const { gridView, processing } = this.state;
    if (processing) return <Loader style={{ marginTop: "170px" }} />;

    return (
      <div id="wrapper" className="textAlignLeft">
        <div className="bannerBackground">
          <div className="container ">
            <h2 className="bannerHeading">Popsugar Events Planner</h2>
            {this.getBreadcrumb()}
          </div>
        </div>

        <div className="container  ">
          <div className=" customBorder row">
            <p className="fontSetting col-xl-3 col-lg-3 col-md-8 col-sm-6 col-xs-6">
              30 Events
            </p>
            <div className="marginLeftAuto">
              <button
                className={
                  "btnChanging btnGrid " +
                  (this.state.gridView ? "active" : null)
                }
                onClick={() => {
                  this.setView(true);
                }}
              >
                <i className="fas fa-th-large "></i>
              </button>
              <button
                className={
                  "btnChanging btnGrid " +
                  (!this.state.gridView ? "active" : null)
                }
                onClick={() => {
                  this.setView(false);
                }}
              >
                <i className="fas fa-list " />
              </button>
            </div>
            {this.renderEventFilter()}
            {this.renderDateFilter()}
          </div>
          <hr className="setHrWidth" />
        </div>
        <div className="container ">
          <div className="setWidth">
            {gridView ? this.getImageCards() : this.listView()}
          </div>
        </div>
        <EventOrganiserCard eventOrganiser={eventOrganiser} />
      </div>
    );
  }
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
