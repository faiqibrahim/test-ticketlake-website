// library
import React from "react";
import moment from "moment";
import { dateRanges } from "../../utils/common-utils";
import ReactDateRangePicker from "../../commonComponents/reactDateRangePicker";

class eventListingFilters extends React.Component {
  constructor(props) {
    super(props);
    const { start, end } = props;
    this.state = {
      startDate: (start || moment()).toDate(),
      endDate: (end || moment()).toDate(),
    };
  }
  toggleShowOnMobile = () => {
    const container = document.getElementById("filtersContainer");
    if (container.style.display === "" || container.style.display === "none") {
      container.style.display = "block";
    } else {
      container.style.display = "none";
    }
  };

  render() {
    const { categories, city, changeDate } = this.props;
    const { startDate, endDate } = this.state;
    const defaultCity = city.length && city[0].label;
    return (
      <>
        <div
          className="mobile-list-controls fl-wrap mar-bot-cont"
          onClick={this.toggleShowOnMobile}
        >
          <div className="mlc show-list-wrap-search fl-wrap">
            <i className="fa fa-filter" style={{ color: "white" }} /> Filter
          </div>
        </div>
        <div
          className="list-wrap-search lisfw fl-wrap lws_mobile"
          id={"filtersContainer"}
        >
          <div className="col-md-5ths list-search-box fullWidthOnSmallScreen">
            <div className="col-list-search-input-item fl-wrap location autocomplete-container">
              <label>Keyword</label>
              <input
                type="text"
                placeholder="Search anything ..."
                className="autocomplete-input filterDropDowns"
                id="autocompleteid3"
                style={{ padding: "12px 10px 11px 10px", height: "49px" }}
                onChange={(e) => this.props.handleChange(e)}
                value={this.props.search}
              />
            </div>
          </div>
          <div className="col-sm-5ths list-search-box fullWidthOnSmallScreen">
            <div className="col-list-search-input-item fl-wrap location autocomplete-container">
              <label>Event Category</label>
              <span className="inpt_dec top-postion filtersIcons">
                <img
                  alt={"categories"}
                  src={window.location.origin + "/icons/group-icon.svg"}
                />
              </span>
              <select
                data-placeholder="Category"
                name="categories"
                onChange={(e) => this.props.changeCategory(e)}
                className="chosen-select  filterDropDowns"
              >
                <option disabled selected>
                  Category
                </option>
                <option
                  selected={this.props.category === "All" ? "selected" : null}
                >
                  All
                </option>
                {Array.isArray(categories) &&
                  categories.map((x, i) => {
                    return (
                      <option
                        key={i}
                        selected={
                          this.props.category === x._id ? "selected" : null
                        }
                        value={x._id}
                      >
                        {x.name}
                      </option>
                    );
                  })}
              </select>
            </div>
          </div>
          <div className="col-md-5ths list-search-box fullWidthOnSmallScreen">
            <div className="col-list-search-input-item fl-wrap location autocomplete-container">
              <label>City</label>
              <span className="inpt_dec top-postion filtersIcons">
                <img
                  alt={"location"}
                  src={window.location.origin + "/icons/location-icon.svg"}
                />
              </span>
              <select
                data-placeholder="City"
                name="city"
                onChange={(e) => this.props.changeCity(e)}
                className="chosen-select filterDropDowns"
              >
                defaultValue={defaultCity}
                {city &&
                  city.map((x, i) => {
                    return (
                      <option
                        key={i}
                        selected={
                          this.props.location === x.label ? "selected" : null
                        }
                        value={x.value}
                      >
                        {x.label}
                      </option>
                    );
                  })}
              </select>
            </div>
          </div>
          <div className="col-md-5ths list-search-box fullWidthOnSmallScreen">
            <div className="col-list-search-input-item fl-wrap location autocomplete-container">
              <label>Date </label>
              <span className="inpt_dec top-postion filtersIcons">
                <img
                  src={window.location.origin + "/icons/clock-icon.svg"}
                  alt={"clock"}
                />
              </span>

              <ReactDateRangePicker
                startDate={startDate}
                endDate={endDate}
                onChange={changeDate}
                dateRanges={dateRanges}
              />
            </div>
          </div>

          <div className="col-md-5ths fullWidthOnSmallScreen custom-btn">
            <div className="col-list-search-input-item fl-wrap">
              <button
                className="header-search-button"
                id={"searchButton"}
                onClick={this.props.handleSearch}
                style={{ height: "50px" }}
              >
                <i className="fas fa-search" />
                Search
              </button>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default eventListingFilters;
