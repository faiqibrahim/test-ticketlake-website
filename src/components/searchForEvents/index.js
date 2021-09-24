// Library
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

import moment from "moment";
// Importing Config
import { filteredCities } from "../../utils/config";
// Components
import HeroBanner from "../../commonComponents/heroBanner";
import ReactDateRangePicker from "../../commonComponents/reactDateRangePicker";
// Icons
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import SectionHeading from "../../commonComponents/sectionHeading";
import { dateRanges, dateSplitter, NOTIFICATION_TIME } from "../../utils/common-utils";
// Redux
import { getAllCategories } from "../../redux/category/category-actions";

import Scrollchor from "react-scrollchor";
import { NotificationManager } from "react-notifications";

class SearchFormEvents extends React.Component {
  state = {
    location: null,
    dates: null,
    datesInput: null,
    categories: null,
    keyword: null,
    start: moment().toDate(),
    end: moment()
      .add(29, "days")
      .toDate(),
  };

  componentDidMount() {
    this.props.getAllCategories();
  }

  handleDateChange = (start, end) => {
    const startDate = start._d;
    const endDate = end._d;
    const fromDateTime = dateSplitter(startDate);
    const toDateTime = dateSplitter(endDate);
    this.setState({
      start,
      end,
      dates: encodeURI(fromDateTime + " " + toDateTime),
    });
  };

  handleChange = (event) => {
    this.setState({
      keyword: event.target.value,
    });
  };
  onCategoryChange = (e) => {
    this.setState({ categories: e.target.value });
  };
  onLocationChange = (e) => {
    this.setState({ location: e.target.value });
  };

  handleSubmit = (e) => {
    const category = this.state.categories;
    const location = this.state.location;
    const dates = this.state.dates;
    const keyword = this.state.keyword;

    const url = [];
    let isError = false;

    if (category) {
      url.push("id=" + category);
    }
    if (location) {
      url.push("location=" + location);
    }
    if (keyword) {
      url.push("keyword=" + encodeURIComponent(keyword));
    }
    if (dates) {
      url.push("when=" + dates);
    }

    if (!isError) {
      this.props.history.push("events/listing/?" + url.join("&"));
    } else {
      NotificationManager.error(
        "From date can not greater than to date",
        "",
        NOTIFICATION_TIME
      );
    }
  };

  easeOutQuint = (x, t, b, c, d) => {
    return c * ((t = t / d - 1) * t * t * t * t + 1) + b;
  };

  render() {
    let cities = filteredCities();
    const { categories } = this.props;
    const defaultCity = cities.length && cities[0].label;
    const { start, end } = this.state;
    return (
      <HeroBanner
        backgroundImage={window.location.origin + "/images/banner_1.png"}
        transformStyle={"translateZ(0px) translateY(-59.1398px)"}
      >
        <div className="hero-section-wrap fl-wrap">
          <div className="container">
            <SectionHeading
              heading="Ticketlake - Book Tickets Online"
              text="“The trusted name in all things ticket”"
              fontSize={40}
              mainClass={"home-intro"}
              textColor={"#FFFFFF"}
              separatorClass={"home-separator"}
            />
            <div className="main-search-input-wrap">
              <div className="main-search-input fl-wrap">
                {/* Any Keyword Search Field */}
                <div className="main-search-input-item location autocomplete-container banner-seach-field">
                  <input
                    type="text"
                    placeholder="Search anything ..."
                    className="autocomplete-input"
                    id="autocompleteid3"
                    onChange={(e) => this.handleChange(e)}
                    value={this.state.keyword}
                  />
                </div>
                {/* Categories  Field */}
                <div className="main-search-input-item">
                  <div className="qty-dropdown fl-wrap">
                    <span className="inpt_dec filtersIcons">
                      <img
                        alt={"categories"}
                        src={window.location.origin + "/icons/group-icon.svg"}
                      />
                    </span>
                    <select
                      data-placeholder="Category"
                      name="categories"
                      defaultValue={"Category"}
                      onChange={this.onCategoryChange}
                      className="main-search-select"
                    >
                      <option disabled value={"Category"}>
                        Category
                      </option>
                      <option>All</option>
                      {Array.isArray(categories) &&
                        categories.map((x, i) => {
                          return (
                            <option key={i} value={x._id}>
                              {x.name}
                            </option>
                          );
                        })}
                    </select>
                  </div>
                </div>
                <div
                  className="main-search-input-item location"
                  id="autocomplete-container"
                >
                  <span className="inpt_dec filtersIcons">
                    <img
                      alt={"location"}
                      src={window.location.origin + "/icons/location-icon.svg"}
                    />
                  </span>

                  <select
                    placeholder="City"
                    name="city"
                    defaultValue={defaultCity}
                    className="main-search-select"
                    onChange={this.onLocationChange}
                  >
                    {cities.map((city, index) => {
                      if (city.label !== "") {
                        return (
                          <option key={index} value={city.value}>
                            {city.label}
                          </option>
                        );
                      } else return null;
                    })}
                  </select>
                </div>
                <div className="main-search-input-item main-date-parent main-search-input-item_small">
                  <span className="inpt_dec filtersIcons">
                    <img
                      src={window.location.origin + "/icons/clock-icon.svg"}
                      alt={"clock"}
                    />
                  </span>

                  <ReactDateRangePicker
                    startDate={start}
                    endDate={end}
                    dateRanges={dateRanges}
                    onChange={this.handleDateChange}
                  />
                  
                </div>
                <button
                  className="main-search-button color2-bg"
                  onClick={this.handleSubmit}
                >
                  <FontAwesomeIcon icon={faSearch} />
                  &emsp; Search
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="header-sec-link">
          <div className="container">
            <Scrollchor
              to={`#sec2`}
              animate={{
                offset: -110,
                duration: 1000,
                easing: this.easeOutQuint,
              }}
              className={"custom-scroll-link color-bg"}
            >
              <i className={"fa fa-angle-double-down"} />
            </Scrollchor>
          </div>
        </div>
      </HeroBanner>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    categories: state.category.categories,
    eventsCountry: state.user.eventsCountry,
  };
};
const connectedComponent = connect(mapStateToProps, { getAllCategories })(
  SearchFormEvents
);
export default withRouter(connectedComponent);
