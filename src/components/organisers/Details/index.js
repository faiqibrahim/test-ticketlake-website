import React, { Component } from "react";
import { Breadcrumb } from "antd";
import { Link } from "react-router-dom";
import "./style.css";
import { Select } from "antd";

const { Option } = Select;

class OrganiserDetails extends Component {
  state = {
    image: "",
    eventName: "",
    eventType: "",
    timings: "",
    noOfShows: "",
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

  getFilter = () => {
    return (
      <div className="paddingOnSmallScreen  col-xl-3 col-lg-3 col-md-3 col-sm-6 col-xs-6 ">
        <Select
          placeholder="Sort By"
          name="categories"
          className="chosen-select  filterDropDowns  customHeight"
        >
          <Option value="all">All</Option>
        </Select>
      </div>
    );
  };

  render() {
    return (
      <div id="wrapper" className="textAlignLeft">
        <div className="bannerBackground">
          <div className="container ">
            <h2 className="bannerHeading">Popsugar Events Planner</h2>
            {this.getBreadcrumb()}
          </div>
        </div>
        <div className="container  ">
          <div className="row customBorder">
            <p className="fontSetting col-xl-9 col-lg-9 col-md-9 col-sm-6 col-xs-6">
              30 Events
            </p>
            {this.getFilter()}
            <hr />
          </div>
        </div>
        <div className="container">
          <h1>List view</h1>
        </div>
      </div>
    );
  }
}

export default OrganiserDetails;
