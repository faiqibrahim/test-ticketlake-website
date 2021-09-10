// Library
import React, { Component, Fragment } from "react";
import moment from "moment";
import queryString from "query-string";
import ReactPaginate from "react-paginate";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { Row } from "reactstrap";
import { Modal, ModalHeader, ModalBody } from "reactstrap";
import {
  FacebookShareButton,
  TwitterShareButton,
  FacebookIcon,
  TwitterIcon,
} from "react-share";

// Component
import DefaultCard from "../../commonComponents/defaultCard";
import ResultForHeading from "../../commonComponents/resultForHeading";
import EventListingFilters from "../eventListingFilters";
import Loader from "../../commonComponents/loader";
import Heading from "../../commonComponents/heading";

//redux
import {
  getAllEventsDefault,
  resetEventsRedux,
} from "../../redux/event/event-actions";
import {
  getWishListIdsFromApi,
  wishListToggle,
} from "../../redux/wishlist/wishlist-actions";
import { Helmet } from "react-helmet";

// Helpers
import {
  dateSplitter,
  getCardDates,
  getMaxAndMinPrice,
  NOTIFICATION_TIME,
} from "../../utils/common-utils";

// Redux Action
import { getAllCategories } from "../../redux/category/category-actions";

import { NotificationManager } from "react-notifications";
import { filteredCities } from "../../utils/config";

let isWishlist = false;
let categoryKey = "eventsListing";

class EventListing extends Component {
  constructor(props) {
    super(props);
    const eventState = this.getEventListingState();
    this.state = {
      storeCategories: null,
      country: "",
      city: "",
      keyword: null,
      allSearchedEvents: [],
      start: moment().subtract(29, "days"),
      end: moment(),
      from: null,
      to: null,
      doSearch: false,
      title: "",
      activeModal: "",
      currentPage: 1,
      pageSize: 12,
      searchParam: false,
      isPromoted: Boolean(eventState && eventState.isPromoted),
    };
  }

  // Getting Category State and use Id
  getEventListingState = (navLink, categoryId) => {
    let categoryState = JSON.parse(sessionStorage.getItem(categoryKey));
    const { location } = this.props;

    if (location && location.state) {
      categoryState = location.state;
      categoryState.navLink = navLink;

      if (categoryId) {
        categoryState.parentCategory._id = categoryId;
      }
    }

    sessionStorage.setItem(categoryKey, JSON.stringify(categoryState));
    return categoryState;
  };

  componentWillMount() {
    sessionStorage.removeItem(categoryKey);
    let { location } = this.props;

    const query =
      location.search !== ""
        ? queryString.parse(location.search)
        : queryString.parseUrl(location.pathname).query;

    // const query = queryString.parse(this.props.location.search);

    let state = this.props.location.state;
    if (query.id || (state && state.parentCategory)) {
      let id = query.id || (state && state.parentCategory._id);
      this.setState({ storeCategories: id });
    }
    if (query.when) {
      const dates = query.when.split(" ");
      let momentFrom = moment(dates[0]);
      let momentTo = moment(dates[1]);

      this.setState({ start: momentFrom, end: momentTo });
    }
    if (query.location) {
      this.setState({ city: query.location });
    }

    if (query.keyword) {
      let keyword = query.keyword;
      this.setState({ title: keyword, keyword: keyword });
    }

    this.setState({
      currentPage: 1,
      pageSize: 12,
      doSearch: false,
    });
  }

  componentDidMount() {
    this.props.getAllCategories();
    if (this.props.wishLists === null && this.props.auth) {
      this.props.getWishListIdsFromApi();
    }

    this.fetchEvents(true, this.state.currentPage, this.state.pageSize);
  }

  componentDidUpdate(prevProps) {
    let { location } = this.props;
    let eventSession = JSON.parse(sessionStorage.getItem(categoryKey));

    const query =
      location.search !== ""
        ? queryString.parse(location.search)
        : queryString.parseUrl(location.pathname).query;

    let locationState = "";
    if (eventSession) {
      locationState = eventSession;
    } else {
      locationState = this.props.location.state;
    }

    let { storeCategories } = this.state;
    let notSameCountry =
      prevProps.eventsCountry.label !== this.props.eventsCountry.label;
    let canFetchEvents = Boolean(
      Object.keys(query).length &&
        locationState &&
        locationState.parentCategory &&
        locationState.navLink &&
        !notSameCountry
    );
    if (this.state.doSearch) {
      // This condition executes when user hits search button from search filters

      let category = null;
      let from = null;
      let to = null;
      let city = null;
      let keyword = null;
      let date = null;

      if (query.id) {
        category = query.id;
      }
      if (query.when) {
        const dates = query.when.split(" ");
        from = moment(dates[0]);
        to = moment(dates[1]);

        date = [
          new Date(moment(dates[0]).format()),
          new Date(moment(dates[1]).format()),
        ];
      }
      if (query.location) {
        city = query.location;
      }
      if (query.keyword) {
        keyword = query.keyword;
      }

      this.getEventListingState(false);
      this.setState({
        storeCategories: category,
        city: city,
        keyword: keyword,
        date: date,
        from: from,
        to: to,
        doSearch: false,
        title: keyword,
        currentPage: 1,
        searchParam: false,
      });

      this.fetchEvents(true, 1, this.state.pageSize, to, from, city, keyword);
    } else if (canFetchEvents) {
      let id = locationState.parentCategory._id;

      if (storeCategories && storeCategories !== id) {
        this.getEventListingState(true, id);
        this.setState({ storeCategories: id, searchParam: false }, () => {
          this.fetchEvents(true, this.state.currentPage, this.state.pageSize);
        });
      } else if (query.id && !storeCategories) {
        this.getEventListingState(true, query.id);
        this.setState({ storeCategories: query.id, searchParam: false }, () => {
          this.fetchEvents(true, this.state.currentPage, this.state.pageSize);
        });
      }
    } else if (notSameCountry) {
      if (query.location) {
        this.setState({ city: null }, () => {
          const urlObj = this.getUrl();
          const { location } = this.props;
          this.props.history.push(
            `${location.pathname}?` + urlObj.url.join("&")
          );
          if (!urlObj.isError) {
            this.fetchEvents(true, this.state.currentPage, this.state.pageSize);
          } else {
            NotificationManager.error(
              "From date can not greater than to date",
              "",
              NOTIFICATION_TIME
            );
          }
        });
      } else {
        this.fetchEvents(true, this.state.currentPage, this.state.pageSize);
      }
    }
  }

  /************************************ EVENTS ************************************/

  getUrl = () => {
    const url = [];

    if (this.state.keyword) {
      url.push("keyword=" + encodeURIComponent(this.state.keyword));
    }

    if (this.state.storeCategories) {
      url.push("id=" + this.state.storeCategories);
    }
    if (this.state.city) {
      url.push("location=" + this.state.city);
    }

    if (this.state.dates) {
      url.push("when=" + this.state.dates);
    }

    return {
      url,
    };
  };

  fetchEvents = (
    paginate = true,
    currentPage = this.state.currentPage,
    pageSize = this.state.pageSize,
    to = this.state.to,
    from = this.state.from,
    city = this.state.city,
    keyword = this.state.keyword,
    category = this.state.storeCategories
  ) => {
    let cat = category && category !== "All" ? [category] : null;

    const { isPromoted } = this.state;

    this.props.getAllEventsDefault(
      isPromoted, // IsFeatured
      true, // isPublished
      false, // isDraft
      cat, //Categories
      to, // To
      from, // From
      city === "All" ? null : city, // City
      paginate, // Paginate
      currentPage, // page
      pageSize, // PageSize
      keyword // search
    );
  };

  // Load More Events on pagination
  loadMoreEvents = (e) => {
    this.setState({ currentPage: e.selected + 1 }, () => {
      this.fetchEvents(true, this.state.currentPage, this.state.pageSize);
    });
  };

  handleDateChange = (start, end) => {
    const startDate = start._d;
    const endDate = end._d;
    const fromDateTime = dateSplitter(startDate);
    const toDateTime = dateSplitter(endDate);

    this.setState(
      { start, end, dates: encodeURI(fromDateTime + " " + toDateTime) },
      () => {
        console.log(this.state.dates);
      }
    );
  };

  // On Category Change
  onCategoryChange = (e) => {
    let storeCategory = "";
    let categoryId = "";

    if (e.target.value === "All") {
      storeCategory = "All";
    } else {
      storeCategory = e.target.value;
      categoryId = storeCategory;
    }

    this.getEventListingState(false, categoryId);
    this.setState({ storeCategories: storeCategory, searchParam: true });
  };

  // On Location Change
  onLocationChange = (e) => {
    if (e.target.value === "All") {
      this.getEventListingState(false);
      this.setState({ city: "All", searchParam: true });
    } else {
      this.getEventListingState(false);
      this.setState({ city: e.target.value, searchParam: true });
    }
  };

  // On Text Change (When a user enters text)
  handleChange = (event) => {
    this.setState({
      keyword: event.target.value,
    });
  };

  sharingSocial = (id) => {
    if (id) {
      this.setState({ activeModal: id });
    } else {
      this.setState({ activeModal: "" });
    }
  };

  wishListToggleLink = (eventSlotId) => {
    if (this.props.auth) {
      this.props.wishListToggle(eventSlotId);
    }
  };

  // Handle Search event
  handleSearch = () => {
    this.setState({
      pageSize: 12,
      totalPages: 0,
      currentPage: 1,
    });
    const urlObj = this.getUrl();

    this.setState({
      doSearch: true,
      date: this.state.date,
      searchParam: false,
    });
    const { location } = this.props;
    this.props.history.push(`${location.pathname}?` + urlObj.url.join("&"));
  };

  // Rendering Social Media Links
  renderSocialModal = (data, shareUrl) => {
    return (
      <Modal
        isOpen={this.state.activeModal === data._id}
        toggle={this.sharingSocial}
        className={this.props.className + " social-sharing-model"}
      >
        <ModalHeader toggle={this.sharingSocial}>{data.eventTitle}</ModalHeader>
        <ModalBody>
          <h4>Share this event on:</h4>
          <row className={"social-icons-wrp"}>
            <FacebookShareButton
              url={shareUrl}
              quote={data.eventTitle}
              className="Demo__some-network__share-button"
            >
              <FacebookIcon size={40} round />
            </FacebookShareButton>
            <TwitterShareButton
              url={shareUrl}
              title={data.eventTitle}
              className="Demo__some-network__share-button"
            >
              <TwitterIcon size={40} round />
            </TwitterShareButton>
          </row>
        </ModalBody>
      </Modal>
    );
  };

  // Getting search title => Results for (Title);
  getSearchTitle = () => {
    let categoryName = "All";
    let { location } = this.props;
    const query =
      location.search !== ""
        ? queryString.parse(location.search)
        : queryString.parseUrl(location.pathname).query;

    let storeCategories = query.id;

    let { categories } = this.props;
    let { city, title } = this.state;

    if (title && title !== "") {
      categoryName = title;
    } else if (city !== "" || storeCategories) {
      if (storeCategories && categories.length) {
        let selectedCategory = categories.filter(
          (categ) => categ._id === storeCategories
        );

        if (selectedCategory && selectedCategory.length) {
          categoryName = selectedCategory[0].name;
        }
      }
    }

    return categoryName;
  };

  pageTitle = () => {
    return (
      <Helmet>
        <title>Events Listing</title>
      </Helmet>
    );
  };

  /************************************ END ************************************/

  // Rendering Method
  render() {
    let cities = filteredCities();
    const { isPromoted } = this.state;
    let dataIs =
      this.props.allEvents &&
      this.props.allEvents.data &&
      this.props.allEvents.data.data;
    let obj = [];

    if (dataIs) {
      this.props.allEvents.data.data.map((dat) => obj.push(dat));
    }
    let pages = this.props.allEvents && this.props.allEvents.data;

    let allEvents = obj;
    if (pages) {
      if (this.state.totalPages !== pages.totalPages) {
        this.setState({ totalPages: pages.totalPages });
      }
    }

    let shareUrl = "http://google.com/";
    const cardDisplayJSX =
      Array.isArray(obj) &&
      obj.map((data, i) => {
        shareUrl =
          window.location.protocol +
          "//" +
          window.location.host +
          "/event/detail/" +
          data.eventSlotId;
        if (this.props.auth) {
          isWishlist =
            this.props.wishLists &&
            this.props.wishLists !== "" &&
            this.props.wishLists.includes(data.eventSlotId);
        }

        let link = `/event/detail/${data.eventSlotId}`;
      
        if (isPromoted) {
          link = {
            state: {isPromoted},
            pathname: link,
          };
        }
      
        return (
          <Fragment key={i}>
            <DefaultCard
              key={i}
              gridMd={3}
              auth={this.props.auth}
              cardTitle={data.eventTitle}
              venueName={data.venue && data.venue.name}
              image={data.bannerImageKey.imageUrl}
              cardLink={"#"}
              dates={getCardDates(data.eventDateTimeSlot)}
              isWishList={isWishlist}
              wishlistLink={() => this.wishListToggleLink(data.eventSlotId)}
              cardAddress={data.venue ? data.venue.address : ""}
              country={data.venue ? data.venue.country : []}
              city={data.venue ? data.venue.city : []}
              onClick={() =>this.props.history.push(link)}
              buttonText={getMaxAndMinPrice(data)}
              buttonLink={`/buy-ticket/${data.eventSlotId}`}
              sharing={this.sharingSocial}
              description={
                data.parentEventInfo && data.parentEventInfo.description
              }
              id={data._id}
            />

            {this.renderSocialModal(data, shareUrl)}
          </Fragment>
        );
      });

    const hrefLink = "#";
    if (allEvents) {
      return (
        <div id="wrapper">
          <div className="content">
            {this.pageTitle()}
            <section
              className="light-red-bg small-padding event-listing-wrp"
              id="sec1"
              style={{ paddingTop: "30px", paddingBottom: "10px" }}
            >
              <div className="container custom-container">
                {isPromoted && (
                  <Heading
                    style={{ marginBottom: "0px", textAlign: "left" }}
                    heading={"Top Events"}
                    text={
                      "Navigate through number of outrageous events happening around"
                    }
                  />
                )}
                <div className="row">
                  <div className="col-md-12">
                    <EventListingFilters
                      changeCategory={this.onCategoryChange}
                      changeCity={this.onLocationChange}
                      changeDate={this.handleDateChange}
                      handleChange={this.handleChange}
                      categories={this.props.categories}
                      handleSearch={this.handleSearch}
                      city={cities}
                      category={this.state.storeCategories}
                      location={this.state.city}
                      search={this.state.keyword}
                      start={this.state.start}
                      end={this.state.end}
                    />
                    {this.props.processing ? (
                      <Loader />
                    ) : (
                      <div className="col-list-wrap fw-col-list-wrap">
                        <div className="list-main-wrap fl-wrap card-listing">
                          <ResultForHeading
                            firstText={"Result for : "}
                            secondText={this.getSearchTitle()}
                            thirdText={`(${this.props.allEvents &&
                              this.props.allEvents.data &&
                              this.props.allEvents.data.totalDocs} Results)`}
                          />

                          {!allEvents.length ? (
                            <div className={"Error-msg-wrp w100"}>
                              <div className={"Error-heading"}>
                                Sorry, No Event Found.
                              </div>
                              <span className={"Error-sub-heading"}>
                                We found no matches for the{" "}
                                {` "${this.getSearchTitle()}"`}
                              </span>
                              <span className={"Error-heading display-block"}>
                                Search Suggestions
                              </span>
                              <div className={"suggestion-point-wrp"}>
                                <ul>
                                  <li> Try updating your location</li>
                                  <li> Try expanding your date range</li>
                                  <li> Check your spelling</li>
                                  <li> Try using more general keywords</li>
                                </ul>
                              </div>
                            </div>
                          ) : (
                            <>
                              {" "}
                              {allEvents ? (
                                <Row className={"w100"}>{cardDisplayJSX}</Row>
                              ) : (
                                "no data"
                              )}
                              {allEvents.length > 0 ? (
                                this.props.paginateEvents.hasNextPage ===
                                true ? (
                                  <a
                                    className="load-more-button"
                                    href={hrefLink}
                                    onClick={(e) => this.loadMoreEvents(e)}
                                  >
                                    Load more
                                    {this.props.paginationProcessing ? (
                                      <i className="fas fa-spinner" />
                                    ) : null}
                                  </a>
                                ) : null
                              ) : (
                                <div>{/* No Events */}</div>
                              )}
                            </>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                <div className="row">
                  <div className="col-lg-12 float-left">
                    <div className="d-flex">
                      {this.state.totalPages > 1 ? (
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
                      ) : null}
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      );
    } else {
      return <Loader />;
    }
  }
}

const mapStateToProps = (state) => {
  return {
    allEvents: state.event.allEvents,
    search: state.event.search,
    allFilters: state.event.allFilters,
    dateTimeSearch: state.event.dateTimeSearch,
    citySearch: state.event.citySearch,
    city: state.event.city,
    from: state.event.from,
    to: state.event.to,
    categories: state.category.categories,
    paginateEvents: state.event.paginateEvents,
    processing: state.event.processing,
    auth: state.user.authenticated,
    wishLists: state.wishlist.wishListIds,
    paginationProcessing: state.event.paginationProcessing,
    eventsCountry: state.user.eventsCountry,
  };
};

const connectedComponent = connect(mapStateToProps, {
  getAllEventsDefault,
  getWishListIdsFromApi,
  getAllCategories,
  wishListToggle,
  resetEventsRedux,
})(EventListing);
export default withRouter(connectedComponent);
