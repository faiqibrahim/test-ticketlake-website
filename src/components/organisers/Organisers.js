import React, { Component } from "react";
import _ from "lodash";
import { connect } from "react-redux";
import { withRouter, Link, NavLink } from "react-router-dom";
import Loader from "../../commonComponents/loader";
import { Select } from "antd";
import axios from "../../utils/axios";
import { Breadcrumb } from "antd";
import "./organisers.css";
import { Card } from "react-bootstrap";
const { Option } = Select;

class Organisers extends Component {
  state = {
    orgData: [],
    baseData: [],
    loadOrgData: true, //set false when done
    countries: [],
    orgDataFilter: [],
    totalCountries: 0,
  };
  handleCountryChange = (value) => {
    let orgDataFilter = _.map(this.state.baseData, function(o) {
      if (o.address.country === value) return o;
    });

    orgDataFilter = _.without(orgDataFilter, undefined);

    this.setState({
      orgData: orgDataFilter,
    });
    if (value === "All") {
      this.setState({
        orgData: this.state.baseData,
      });
    }
  };

  componentDidMount = () => {
    axios
      .get("/organizations/get-organizations")
      .then((response) => {
        console.log("response: organisaton", response.data.data);
        let getCountries = [];
        // getCountries.push({address:{country:'All'}})
        getCountries.unshift("All");

        // let getCountriesUnique = _.uniq(_.map(res, 'address.country'))
        let getCountriesUnique = _.uniq(getCountries);
        getCountries.push(getCountriesUnique);
        let filteredorganisers = response.data.data.filter(
          (data) => data.address.country === this.props.country.label
        );

        console.log("filtered", filteredorganisers);
        this.setState({
          orgData: filteredorganisers,
          baseData: response.data.data,
          countries: getCountries,
          loadOrgData: response.data.data,
          totalCountries: getCountriesUnique,
        });
      })
      .catch((err) => {
        console.error("Err:", err);
      });
  };

  componentDidUpdate(prevProps) {
    if (prevProps.country.label !== this.props.country.label) {
      let filteredorganisers = this.state.baseData.filter(
        (data) => data.address.country === this.props.country.label
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
        style={{ zIndex: "90" }}
      >
        <div className="bg par-elem bannerStyling" />
        <div className="list-single-hero-title fl-wrap remove-padding">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <div className="title-new-padding">
                  <h2 style={{ marginBottom: "0" }}>
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
        <div className="container">
          <Breadcrumb
            separator={
              <i
                class="fa fa-angle-right seperatorColor "
                aria-hidden="true"
              ></i>
            }
            className="breadcrumbStyling"
          >
            <Breadcrumb.Item>
              <Link to={"/"} className="hoverItem ">
                Home
              </Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>Event Organisers </Breadcrumb.Item>
          </Breadcrumb>
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
                  className="col-lg-3 col-xs-6 col-sm-6"
                  style={{ marginBottom: "124px" }}
                >
                  <Card className="cardStyling">
                    <Card.Img
                      className="cardImage"
                      variant="top"
                      src={
                        data.imageURL !== undefined
                          ? data.imageURL.length !== 0
                            ? data.imageURL
                            : "images/placeholder.jpg"
                          : "images/placeholder.jpg"
                      }
                    />
                    <div style={{ paddingLeft: "10px" }}>
                      <NavLink
                        to={{
                          pathname: "/organisers/details",
                          state: { detail: data._id },
                        }}
                      >
                        <p className="cardTitle">{data.name}</p>
                      </NavLink>
                      <p className="cardSubheading">
                        {data.address.city}, {data.address.country}
                      </p>
                      <p className="cardEventsText">{data.eventCount}</p>
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

  getSelectMenu = () => {
    return (
      <div className="paddingOnSmallScreen col-xl-2 col-lg-3 col-md-3 col-sm-6 col-xs-6 ">
        <div>
          <div className="inpt_dec  filtersIcons iconMarginLeft">
            <img
              style={{ display: "block", paddingBottom: "2px" }}
              alt={"categories"}
              src={window.location.origin + "/icons/category.svg"}
            />
          </div>
          <Select
            placeholder="Category"
            name="categories"
            style={{}}
            className="chosen-select  filterDropDowns"
          >
            <Option value="all">All</Option>
            <Option value="a12ll">Events</Option>
            <Option value="all1245">category</Option>
          </Select>
        </div>
      </div>
    );
  };

  render() {
    return (
      <>
        <div id="wrapper">
          <div className="content">
            {this.state.loadOrgData ? (
              <>
                {this.getbanner()}

                {this.getBreadcrumb()}

                <div className="container mt-5">
                  <div className="row left">
                    <div className="col-xl-10 col-md-9 col-lg-9 col-sm-12 col-xs-12 section-title mb0">
                      <h2>
                        Showing Event Organisers In{" "}
                        <span
                          style={{
                            color: "#EC1B23",
                          }}
                        >
                          {this.props.country.label}
                        </span>
                      </h2>
                    </div>

                    {this.getSelectMenu()}
                  </div>
                </div>

                {this.getImageCards()}
              </>
            ) : (
              <Loader />
            )}
          </div>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return { country: state.user.eventsCountry };
};
const connectedComponent = connect(
  mapStateToProps,
  {}
)(Organisers);
export default withRouter(connectedComponent);
