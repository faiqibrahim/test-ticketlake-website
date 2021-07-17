import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter, NavLink } from "react-router-dom";
import Loader from "../../../commonComponents/loader";
import { Icon, Select } from "antd";
import BreadCrumb from "../../VotingModule/Header/BreadCrumb/BreadCrumb";
import "./style.css";
import { Card } from "react-bootstrap";

import { getAllCategories } from "../../../redux/category/category-actions";
import {Helmet} from "react-helmet";

const { Option } = Select;

class Organisers extends Component {
  state = {
    orgData: [],
  };

  componentDidMount = () => {
    const { organiserList, country, getAllCategories } = this.props;
    const filteredOrganisers = organiserList.filter(
      (data) => data.location === country.label
    );
    getAllCategories();
    this.setState({
      orgData: filteredOrganisers,
    });
  };

  componentDidUpdate(prevProps) {
    const { country, organiserList } = this.props;
    if (prevProps.country.label !== country.label) {
      const filteredOrganisers = organiserList.filter(
        (data) => data.location === country.label
      );
      this.setState({
        orgData: filteredOrganisers,
      });
    }
  }

  getBanner = () => {
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

  pageTitle = () => {
    return (
        <Helmet>
          <title>Organisers</title>
        </Helmet>
    )
  }

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
                <NavLink
                  to={{
                    pathname: "/organisers/details",
                    state: { detail: data.id },
                  }}
                >
                  <Card className="cardStyling">
                    <Card.Img
                      className="cardImage"
                      variant="top"
                      src={data.imgSrc}
                    />
                    <div>
                      <p className="cardTitle">{data.title}</p>

                      <p className="cardSubheading">{data.location}</p>
                      <p className="cardEventsText">{data.events} Events</p>
                    </div>
                  </Card>
                </NavLink>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  renderCategoryFilter = () => {
    const { categories } = this.props;

    return (
      <div className="category-filter  col-xl-2 col-lg-2 col-md-3 col-sm-12 col-xs-12 ">
        <div>
          <div className="inpt_dec  filtersIcons dropdownIcon">
            <img
              className="categoryIconStyling"
              alt={"categories"}
              src={window.location.origin + "/icons/category-red.svg"}
            />
          </div>
          <Select
            suffixIcon={<Icon type="caret-down" />}
            placeholder="Category"
            name="categories"
            className="chosen-select  organiserCategorySelect filterDropDowns customHeight"
          >
            <Option value="all">All</Option>

            {categories.map((category) => (
              <Option key={category.id} value={category.name}>
                {category.name}
              </Option>
            ))}
          </Select>
        </div>
      </div>
    );
  };

  render() {
    const { processing, country } = this.props;
    if (processing) return <Loader />;

    return (
      <div id="wrapper">
        <div className="content">
          {this.pageTitle()}

          {this.getBanner()}

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
