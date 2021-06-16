import React, { Component } from "react";
import { Breadcrumb } from "antd";
import { Link, withRouter } from "react-router-dom";
import "./style.css";
import { Select } from "antd";
import { connect } from "react-redux";
import Loader from "../../../commonComponents/loader";
import { Card } from "react-bootstrap";

const { Option } = Select;

class OrganiserDetails extends Component {
  state = {
    eventsList: "",
    gridView: true,
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

  renderFilter = () => {
    return (
      <div className="category-filter  col-xl-2 col-lg-2 col-md-3 col-sm-12 col-xs-12 ">
        <div>
          <Select
            placeholder="Sort by"
            name="categories"
            className="chosen-select  filterDropDowns organiserCategorySelect sortBy customHeight"
          >
            <Option value="all">All</Option>
          </Select>
        </div>
      </div>
    );
  };

  getImageCards = () => {
    const { eventsList } = this.props;
    return (
      <div className="mb-100">
        <div className="row organiser-row">
          {eventsList.map((item) => {
            return (
              <div
                className="col-lg-3 col-xs-6 col-sm-6 marginBottom"
                key={item.id}
              >
                <Card className="cardStyling">
                  <Card.Img
                    className="eventCardImage"
                    variant="top"
                    src={item.imgSrc}
                  />
                  <div>
                    <p className="cardTitle">{item.title}</p>
                    <p className="cardSubheading">{item.type}</p>
                    <p className="cardSubheading">{item.timings}</p>

                    <p className="cardEventsText">{item.shows} Shows</p>
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
    const { eventsList } = this.props;
    return eventsList.map((item) => (
      <div className="card">
        <div className="row no-gutters">
          <div className="col-auto">
            <img src={item.imgSrc} height="165px" alt="" />
          </div>
          <div class="col">
            <div className="card-block px-2">
              <h4 className="card-title">{item.title}</h4>
              <p className="card-text">{item.type}</p>
              <p className="card-text">{item.timings}</p>
              <p className="card-text">{item.shows}</p>
            </div>
          </div>
        </div>
      </div>
    ));
  };

  render() {
    console.log("props=", this.props);
    const { prosessing } = this.props;
    const { gridView } = this.state;

    if (prosessing) return <Loader />;

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
            <p className="fontSetting col-xl-7 col-lg-7 col-md-7 col-sm-6 col-xs-6">
              30 Events
            </p>
            <button
              className={
                "btnChanging btn2 " + (this.state.gridView ? "active" : null)
              }
              onClick={() => {
                this.setView(true);
              }}
            >
              <i class="fa fa-th-large" /> Grid View
            </button>
            <button
              className={
                "btnChanging btn2 " + (!this.state.gridView ? "active" : null)
              }
              onClick={() => {
                this.setView(false);
              }}
            >
              <i class="fa fa-bars" /> List View
            </button>
            {this.renderFilter()}
          </div>
        </div>
        <div className="container mt-5">
          {gridView ? this.getImageCards() : this.listView()}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    eventsList: state.organiser.eventsList,
    processing: state.organiser.processing,
  };
};

const connectedComponent = connect(
  mapStateToProps,
  {}
)(OrganiserDetails);

export default withRouter(connectedComponent);
