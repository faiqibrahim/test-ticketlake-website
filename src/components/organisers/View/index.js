import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter, Link, NavLink } from "react-router-dom";
import Loader from "../../../commonComponents/loader";
import { Select } from "antd";
import BreadCrumb from "../../VotingModule/Header/BreadCrumb/BreadCrumb";
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
    const crumbsJSON = [
      { path: "/", crumbTitle: "Home" },
      { path: "/organisers", crumbTitle: "Event Organisers" },
    ];
    return (
      <div className="container-fluid breadcrumbContainer">
        <div className="container">
          <div className="row left">
            <div className="col-md-12">
              <BreadCrumb breadCrumbs={crumbsJSON} />
            </div>
          </div>
        </div>
      </div>
    );
  };

  getImageCards = () => {
    const { orgData } = this.state;
    return (
      <div className="container mb-100">
        <div className="row organiser-row">
          {orgData.map((data) => {
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
                    <p className="cardEventsText">{data.events} Events</p>
                  </div>
                </Card>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  renderCategoryFilter = () => {
    return (
      <div className="paddingOnSmallScreen  col-xl-2 col-lg-2 col-md-3 col-sm-12 col-xs-12 ">
        <div style={{ height: "100%" }}>
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
            className="chosen-select  filterDropDowns organiserCategorySelect customHeight"
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
    const { processing, country } = this.props;
    if (processing) return <Loader />;

    return (
      <div id="wrapper">
        <div className="content">
          {this.getbanner()}

          {this.getBreadcrumb()}

          <div className="container mt-6 mb-6">
            <div className="row left">
              <div className="col-xl-10  col-lg-10 col-md-9 col-sm-12 col-xs-12  mb0 ">
                <h2 className="organiser-title">
                  Showing Event Organisers In{" "}
                  <span className="seperatorColor">{country.label}</span>
                </h2>
              </div>

              {this.renderCategoryFilter()}
            </div>
          </div>

          {this.getImageCards()}
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
    processing: state.organiser.processing,
  };
};
const connectedComponent = connect(
  mapStateToProps,
  {
    getAllCategories,
  }
)(Organisers);
export default withRouter(connectedComponent);
