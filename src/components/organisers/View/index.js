import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter, Link, NavLink } from "react-router-dom";
import Loader from "../../../commonComponents/loader";
import { Select } from "antd";
import { Breadcrumb } from "antd";
import "./style.css";
import { Card } from "react-bootstrap";
import { getAllCategories } from "../../../redux/category/category-actions";

const { Option } = Select;

class Organisers extends Component {
  state = {
    orgData: [],
    baseData: [],
    loadOrgData: false,
    orgDataFilter: [],
  };

  componentDidMount = () => {
    let filteredorganisers = this.props.organiserList.filter(
      (data) => data.location === this.props.country.label
    );
    this.props.getAllCategories();
    console.log("filtered", filteredorganisers);
    this.setState({
      orgData: filteredorganisers,
      baseData: this.props.organiserList,
      loadOrgData: this.props.organiserList,
    });
  };

  componentDidUpdate(prevProps) {
    if (prevProps.country.label !== this.props.country.label) {
      let filteredorganisers = this.state.baseData.filter(
        (data) => data.location === this.props.country.label
      );
      this.setState({
        orgData: filteredorganisers,
      });
    }
  }

  getbanner = () => {
    return (
      <section
        className="list-single-hero organiser-sec"
        data-scrollax-parent="true"
        id="sec1"
      >
        <div className="bg par-elem bannerStyling" />
        <div className="list-single-hero-title fl-wrap remove-padding">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <div className="title-new-padding">
                  <h2 className="mb-0">
                    <span>Event Organisers</span>
                  </h2>
                  <p className="bannerText">
                    Get more out of your favourite event planners with
                    Ticketlake
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  };

  getBreadcrumb = () => {
    return (
      <div className="container-fluid breadcrumbContainer">
        <div className=" customContainer container">
          <div className="row left">
            <Breadcrumb
              separator={
                <i
                  class="fa fa-angle-right seperatorColor "
                  aria-hidden="true"
                ></i>
              }
              className="breadcrumbStyling fontSize"
            >
              <Breadcrumb.Item>
                <Link to="/" className="hoverItem">
                  Home
                </Link>
              </Breadcrumb.Item>
              <Breadcrumb.Item>Event Organisers </Breadcrumb.Item>
            </Breadcrumb>
          </div>
        </div>
      </div>
    );
  };

  getImageCards = () => {
    return (
      <div className="container mb-100">
        <div className="row organiser-row">
          {this.state.loadOrgData ? (
            this.state.orgData.map((data) => {
              return (
                <div
                  className="col-lg-3 col-xs-6 col-sm-6 marginBottom"
                  key={data.id}
                >
                  <Card className="cardStyling">
                    <Card.Img
                      className="cardImage"
                      variant="top"
                      src={data.imgSrc}
                    />
                    <div>
                      <NavLink
                        to={{
                          pathname: "/organisers/details",
                          state: { detail: data.id },
                        }}
                      >
                        <p className="cardTitle">{data.title}</p>
                      </NavLink>
                      <p className="cardSubheading">{data.location}</p>
                      <p className="cardEventsText">{data.events}</p>
                    </div>
                  </Card>
                </div>
              );
            })
          ) : (
            <Loader />
          )}
        </div>
      </div>
    );
  };

  getFilter = () => {
    return (
      <div className="paddingOnSmallScreen  col-xl-3 col-lg-3 col-md-3 col-sm-6 col-xs-6 ">
        <div>
          <div className="inpt_dec  filtersIcons iconMarginLeft">
            <img
              className="categoryIconStyling"
              alt={"categories"}
              src={window.location.origin + "/icons/category.svg"}
            />
          </div>
          <Select
            placeholder="Category"
            name="categories"
            className="chosen-select  filterDropDowns organiserCategory customHeight"
          >
            <Option value="all">All</Option>

            {this.props.categories.map((category) => (
              <Option value={category.name}>{category.name}</Option>
            ))}
          </Select>
        </div>
      </div>
    );
  };

  render() {
    console.log("render props=", this.props);
    return (
      <div id="wrapper">
        <div className="content">
          {this.state.loadOrgData ? (
            <>
              {this.getbanner()}

              {this.getBreadcrumb()}

              <div className="container mt-5">
                <div className="row left">
                  <div className="col-xl-9 col-md-9 col-lg-9 col-sm-12 col-xs-12  mb0 ">
                    <h2>
                      Showing Event Organisers In{" "}
                      <span className="seperatorColor">
                        {this.props.country.label}
                      </span>
                    </h2>
                  </div>

                  {this.getFilter()}
                </div>
              </div>

              {this.getImageCards()}
            </>
          ) : (
            <Loader />
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    country: state.user.eventsCountry,
    categories: state.category.categories,
    organiserList: state.organiser.organiserList,
  };
};
const connectedComponent = connect(
  mapStateToProps,
  {
    getAllCategories,
  }
)(Organisers);
export default withRouter(connectedComponent);
