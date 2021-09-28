import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter, NavLink } from "react-router-dom";
import { Icon, Select } from "antd";
import ReactPaginate from "react-paginate";
import "./style.css";
import { NotificationManager } from "react-notifications";
import { Card } from "react-bootstrap";
import { getAllCategories } from "../../../redux/category/category-actions";
import { Helmet } from "react-helmet";
import { getOrganisationdata } from "./api-handler";
import Loader from "../../../utils/loader";
import Banner from "./banner";
import BreadCrumbs from "./breadCrumbs";

const { Option } = Select;

class Organisers extends Component {
  state = {
    orgData: [],
    loader: true,
    page: 1,
    pageCount: 0,
  };

  componentDidMount() {
    this.fetcData();
  }

  fetcData = async () => {
    const { country, getAllCategories } = this.props;
    const { countryCode } = country;
    const { page } = this.state;

    try {
      const response = await getOrganisationdata(countryCode, page);
      getAllCategories();
      const { itemsList, paginator } = response.data.orgnizationData;
      const { pageCount } = paginator;
      this.setState({
        orgData: itemsList,
        loader: false,
        pageCount,
      });
    } catch (error) {
      NotificationManager.error("Some Error Occured !", "Error");
      this.setState({ loader: false });
    }
  };

  componentDidUpdate(prevProps) {
    const { label } = this.props.country;

    if (prevProps.country.label !== label) {
      this.fetcData();
    }
  }

  pageTitle = () => {
    return (
      <Helmet>
        <title>Organisers</title>
      </Helmet>
    );
  };

  getImageCards = () => {
    const { orgData } = this.state;
    if (orgData.length === 0) {
      return (
        <h5 className="seperatorColor mb-5">No event organisers available </h5>
      );
    }
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
                    pathname: `/organisers/details/${data._id}`,
                  }}
                >
                  <Card className="cardStyling">
                    <Card.Img
                      className="cardImage"
                      variant="top"
                      src={data.imageURL}
                    />
                    <div>
                      <p className="organiserCardTitle">{data.name}</p>

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
              <Option key={category._id} value={category._id}>
                {category.name}
              </Option>
            ))}
          </Select>
        </div>
      </div>
    );
  };

  loadMoreEvents = (e) => {
    const { selected } = e;
    this.setState({ page: selected + 1 }, () => {
      this.fetcData();
    });
  };

  render() {
    const { country } = this.props;
    const { loader, pageCount } = this.state;

    return (
      <div id="wrapper">
        <div className="content">
          {this.pageTitle()}
          <Banner />
          <BreadCrumbs />
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
              {pageCount > 1 && (
                <div className="row">
                  <div className="col-lg-12 float-left">
                    <div className="d-flex">
                      <ReactPaginate
                        previousLabel={<i className="fa fa-angle-left" />}
                        nextLabel={<i className="fa fa-angle-right" />}
                        breakLabel={"..."}
                        breakClassName={"break-me"}
                        pageCount={pageCount}
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
                </div>
              )}
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
