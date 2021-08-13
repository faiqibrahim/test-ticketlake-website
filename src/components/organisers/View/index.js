import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter, NavLink } from "react-router-dom";
import { Icon, Select } from "antd";
import BreadCrumb from "../../VotingModule/Header/BreadCrumb/BreadCrumb";
import ReactPaginate from "react-paginate";
import "./style.css";
import { NotificationManager } from "react-notifications";
import { Card } from "react-bootstrap";
import { getAllCategories } from "../../../redux/category/category-actions";
import { Helmet } from "react-helmet";
import { getOrganisationdata } from "./api-handler";
import Loader from "../../../utils/loader";

const { Option } = Select;

class Organisers extends Component {
  state = {
    orgData: [],
    loader: true,
    page: 1,
  };

  async componentDidMount() {
    const { country, getAllCategories } = this.props;
    const { countryCode } = country;
    const { page } = this.state;

    console.log("country=", country);
    const response = await getOrganisationdata(countryCode, page);
    if (response === "error") {
      NotificationManager.error("Some Error Occured !", "Error");
      this.setState({ loader: false });
    } else {
      getAllCategories();
      this.setState({
        orgData: response.data.orgnizationData.itemsList,
        loader: false,
      });
    }
    console.log("reponse of success=", response);
  }

  async componentDidUpdate(prevProps) {
    const { countryCode, label } = this.props.country;
    const { page } = this.state;

    if (prevProps.country.label !== label) {
      this.setState({ loader: true });
      const response = await getOrganisationdata(countryCode, page);
      if (response === "error") {
        NotificationManager.error("Some Error Occured !", "Error");
        this.setState({ loader: false });
      } else {
        getAllCategories();
        this.setState({
          orgData: response.data.orgnizationData.itemsList,
          loader: false,
        });
      }
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
    if (orgData.length === 0) {
      return (
        <h5 className="seperatorColor mb-5">No event organisers available </h5>
      );
    }

    console.log("org data=", orgData);
    const { label } = this.props.country;
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
                    pathname: `/organisers/details/?_id=${data._id}`,
                    state: { detail: data.id },
                  }}
                >
                  <Card className="cardStyling">
                    <Card.Img
                      className="cardImage"
                      variant="top"
                      src={data.imageURL}
                    />
                    <div>
                      <p className="cardTitle">{data.name}</p>

                      <p className="cardSubheading">{label}</p>
                      <p className="cardEventsText">{data.eventCount} Events</p>
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

  loadMoreEvents = (e) => {
    this.setState({ currentPage: e.selected + 1 }, () => {
      this.fetchEvents(true, this.state.currentPage, this.state.pageSize);
    });
  };

  render() {
    const { country } = this.props;
    const { loader } = this.state;

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

          {loader ? (
            <Loader />
          ) : (
            <>
              {" "}
              {this.getImageCards()}
              <div className="row">
                <div className="col-lg-12 float-left">
                  <div className="d-flex">
                    <ReactPaginate
                      previousLabel={<i className="fa fa-angle-left" />}
                      nextLabel={<i className="fa fa-angle-right" />}
                      breakLabel={"..."}
                      breakClassName={"break-me"}
                      pageCount={this.state.totalPages}
                      marginPagesDisplayed={2}
                      pageRangeDisplayed={5}
                      onPageChange={(data) => this.loadMoreEvents(data)}
                      containerClassName={
                        "list-inline mx-auto justify-content-center pagination"
                      }
                      subContainerClassName={
                        "list-inline-item pages pagination"
                      }
                      activeClassName={"active"}
                    />
                  </div>
                </div>
              </div>{" "}
            </>
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
  };
};
const connectedComponent = connect(mapStateToProps, {
  getAllCategories,
})(Organisers);
export default withRouter(connectedComponent);
