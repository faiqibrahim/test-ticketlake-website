import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter, Link, NavLink } from "react-router-dom";
import Loader from "../../commonComponents/loader";
import { Select } from "antd";
import axios from "../../utils/axios";
import { Breadcrumb } from "antd";
import "./organisers.css";
import { Card } from "react-bootstrap";
import { getAllCategories } from "../../redux/category/category-actions";

const { Option } = Select;

class Organisers extends Component {
  state = {
    orgData: [],
    baseData: [],
    loadOrgData: false,
    orgDataFilter: [],
  };

  componentDidMount = () => {
    axios
      .get("/organizations/get-organizations")
      .then((response) => {
        let filteredorganisers = response.data.data.filter(
          (data) => data.address.country === this.props.country.label
        );
        this.props.getAllCategories();
        console.log("filtered", filteredorganisers);
        this.setState({
          orgData: filteredorganisers,
          baseData: response.data.data,
          loadOrgData: response.data.data,
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
            className="breadcrumbStyling fontSize"
          >
            <Breadcrumb.Item>
              <Link to={"/"} className="hoverItem">
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
                <div className="col-lg-3 col-xs-6 col-sm-6 marginBottom">
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
                    <div>
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

  getFilter = () => {
    return (
      <div className="paddingOnSmallScreen col-xl-3 col-lg-3 col-md-3 col-sm-6 col-xs-6 ">
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
            className="chosen-select  filterDropDowns customHeight"
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
                    <div className="col-xl-9 col-md-9 col-lg-9 col-sm-12 col-xs-12 section-title mb0">
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
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    country: state.user.eventsCountry,
    categories: state.category.categories,
  };
};
const connectedComponent = connect(
  mapStateToProps,
  {
    getAllCategories,
  }
)(Organisers);
export default withRouter(connectedComponent);
