// Library
import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { Tabs, TabLink, TabContent } from "react-tabs-redux";
// Components
import Loader from "../../commonComponents/loader/";

import TopHeadingComponent from "../../commonComponents/topHeadingComponent";
// Redux
import { connect } from "react-redux";
import {
  fetchChildCategories,
  fetchParentCategories,
} from "../../redux/category/category-actions";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import {
  getTrendingEvents,
  getShowingInCinemasEvents,
  getUpcomingEvents,
  getNearByEvents,
  getAllSubCategories,
  getSubCategoriesEvents,
  setCatSecId,
} from "../../redux/movies/movie-action";
import CardWithHoverAnimation from "../../commonComponents/cardWithHoverAnimation";
import { Modal, ModalBody } from "reactstrap";
import CardWithInfo from "../../commonComponents/cardWithInfo";
import { Helmet } from "react-helmet";

let categoryKey = "categoryState";
let updateSubCategory = true;
let categoryId = null;

class Movies extends Component {
  state = {
    activeCategory: null,
    allTab: true,
    parentId: null,
    currentCrumbs: [],
    selectedTab: true,
    selectedTabVal: "tab1",
    tabContentVisible: false,
    processing: false,
    noTabSelected: true,
    openIFrameModal: false,
    youtubeVideoId: null,
  };

  componentDidMount() {
    let categoryState = this.getCategoryState();
    categoryId = this.getCategoryId();
    if (categoryState && categoryId) {
      this.getChildCategories(categoryId, categoryState.breadCrumbs);
    }
    this.props.getTrendingEvents(categoryId);
    this.props.getShowingInCinemasEvents(categoryId);
    this.props.getNearByEvents(categoryId);
    this.props.getUpcomingEvents(categoryId);
    this.props.getAllSubCategories(categoryId);
    this.props.getSubCategoriesEvents(categoryId);
  }

  componentDidUpdate(prevProps) {
    let { location } = this.props;
    let { parentId } = this.state;
    let categoryId = this.getCategoryId();
    if (prevProps.eventsCountry !== this.props.eventsCountry) {
      this.props.getTrendingEvents(categoryId);
      this.props.getShowingInCinemasEvents(categoryId);
      this.props.getNearByEvents(categoryId);
      this.props.getUpcomingEvents(categoryId);
      this.props.getAllSubCategories(categoryId);
      this.getSubCategories(parentId, location);
      this.props.getSubCategoriesEvents(categoryId);
    }
    this.getSubCategories(parentId, location);
  }

  getSubCategories = (parentId, location) => {
    if (
      updateSubCategory &&
      this.props.allSubCategories &&
      this.props.allSubCategories.length > 0
    ) {
      updateSubCategory = false;
    }
    if (categoryId && location && location.state) {
      let canUpdate = parentId && categoryId !== parentId;
      if (canUpdate) {
        let { parentCategory, breadCrumbs } = location.state;
        this.getChildCategories(parentCategory._id, breadCrumbs);
      }
    }
  };

  // Getting Category State and use Id
  getCategoryState = () => {
    let categoryState = JSON.parse(sessionStorage.getItem(categoryKey));

    const { location } = this.props;

    if (location && location.state) {
      categoryState = location.state;
    }
    sessionStorage.setItem(categoryKey, JSON.stringify(categoryState));

    return categoryState;
  };

  getCategoryId = () => {
    let url_string = window.location.href;
    let url = new URL(url_string);
    const id = url.searchParams.get("id");
    return id;
  };

  /******************* EVENTS **********************/
  getChildCategories = (parentId, breadCrumbs) => {
    this.props.fetchChildCategories(parentId, () => {
      this.setState({
        parentId,
        currentCrumbs: breadCrumbs,
        activeCategory: null,
        sameLink: false,
      });
    });
  };

  handleCategoryClick = (category) => {
    let { activeCategory } = this.state;
    if (!category) return null;
    let { history } = this.props;
    let currentCrumbs = [...this.state.currentCrumbs];

    // Condition not to push same bread crumb in bread crumbs array
    if (
      (activeCategory && activeCategory._id !== category._id) ||
      !activeCategory
    ) {
      currentCrumbs.push({
        category,
        url: `${currentCrumbs[0].mainLink}/?id=${category._id}`,
        mainLink: currentCrumbs[0].mainLink,
      });
    }

    let sessionState = { parentCategory: category, breadCrumbs: currentCrumbs };

    sessionStorage.setItem(categoryKey, JSON.stringify(sessionState));
    if (
      history.location &&
      history.location.state &&
      history.location.state.breadCrumbs
    ) {
      const state = { ...history.location.state };
      state.breadCrumbs = currentCrumbs;
      history.replace({ ...history.location, state });
    }

    this.props.history.push({
      pathname: `${currentCrumbs[0].mainLink}/?id=${category._id}`,
      state: { ...sessionState },
    });
    //
    // this.setState({
    //     activeCategory: category,
    //     allTab,
    //     currentCrumbs,
    // });
  };
  /******************* END **********************/

  getCardList = (eventsArray, tabCards) => {
    return (
      <div className="card-wrp">
        <CardWithHoverAnimation
          cards={eventsArray}
          tabCards={tabCards}
          firstBtnTitle={"Play Trailer"}
          secondBtnTitle={"Buy Tickets"}
          key={Math.random(0, eventsArray.length)}
        />
      </div>
    );
  };

  onCategoryTabClick = (subCategory, selectedTabVal, tabContentVisible) => {
    this.setState({
      selectedTab: false,
      noTabSelected: false,
      selectedTabVal,
      tabContentVisible,
    });
    this.props.getSubCategoriesEvents(subCategory && subCategory._id);
  };

  onClickViewMore = (event, sectionId) => {
    let categoryId = this.getCategoryId();
    let obj = {
      categoryId: categoryId,
      sectionId: sectionId,
    };
    this.props.setCatSecId(obj, () => {
      this.props.history.push("/movies/viewMore");
    });
  };

  onFetchAllCategories = () => {
    this.props.getSubCategoriesEvents(categoryId);
  };

  playTrailerInIFrame = (youtubeId) => {
    this.setState({
      openIFrameModal: !this.state.openIFrameModal,
      youtubeVideoId: youtubeId,
    });
  };

  pageTitle = () => {
    return (
      <Helmet>
        <title>Movies</title>
      </Helmet>
    );
  };

  onClickWrp = (card) => {
    sessionStorage.setItem("parentEventDetail", JSON.stringify(card));
    if (card && card._id) {
      this.props.history.push({
        pathname: `/movie/detail/${card._id}`,
        data: card,
      });
    }
  };

  getForm = () => {
    let { childCategories, trendingEvents } = this.props;
    let { activeCategory } = this.state;
    let events = [];
    let subCategoryEventsArray =
      this.props.subCategoryEvents && this.props.subCategoryEvents;

    if (childCategories) {
      let currentCategory = !activeCategory ? childCategories : activeCategory;
      events = [...currentCategory.events];
      currentCategory.children.forEach((childCategory) => {
        events = [...events, ...childCategory.events];
      });
    }

    return (
      <div id="wrapper">
        {childCategories ? (
          <div className="content">
            {this.props.trendingEvents &&
            this.props.trendingEvents.length > 0 ? (
              <>
                <Splide
                  options={{
                    type: "loop",
                    autoplay: true,
                    interval: 5000,
                    perPage: 1,
                    pauseOnHover: false,
                    gap: "2rem",
                    pagination: false,
                    padding: {
                      right: "15rem",
                      left: "15rem",
                    },
                    breakpoints: {
                      "1024": {
                        perPage: 1,
                        gap: "1rem",
                        padding: {
                          right: "3rem",
                          left: "3rem",
                        },
                      },
                      "768": {
                        perPage: 1,
                        gap: "1rem",
                        padding: {
                          right: "1rem",
                          left: "1rem",
                        },
                      },
                      "600": {
                        perPage: 1,
                        gap: "1rem",
                        padding: {
                          right: "1rem",
                          left: "1rem",
                        },
                      },
                      "400": {
                        perPage: 1,
                        gap: "1rem",
                        padding: {
                          right: "1rem",
                          left: "1rem",
                        },
                      },
                      "320": {
                        perPage: 1,
                        gap: "1rem",
                        padding: {
                          right: "1rem",
                          left: "1rem",
                        },
                      },
                    },
                  }}
                >
                  {this.props.trendingEvents &&
                    this.props.trendingEvents.map((data, index) => {
                      let youtubeLink =
                        data && data.youtubeLink && data.youtubeLink;
                      let youtubeVideoId;
                      if (youtubeLink) {
                        let video_id = youtubeLink.split("v=")[1];
                        if (video_id === undefined) {
                          youtubeVideoId = "";
                        } else {
                          let ampersandPosition = video_id.indexOf("&");
                          if (ampersandPosition !== -1) {
                            video_id = video_id.substring(0, ampersandPosition);
                          }
                          youtubeVideoId = video_id;
                        }
                      }
                      return (
                        <SplideSlide key={index}>
                          <CardWithInfo
                            imageSrc={
                              data.bannerImageKey &&
                              data.bannerImageKey.imageUrl
                            }
                            title={data.title}
                            categoriesArr={data.categories && data.categories}
                            smallBtn="Play Trailer"
                            largeBtn={
                              data.eventMaximumTicketClassPrice
                                ? data.eventMaximumTicketClassPrice ===
                                  data.eventMinimumTicketClassPrice
                                  ? `Buy Tickets from GHS${data.eventMaximumTicketClassPrice}`
                                  : `Buy Tickets from GHS${data.eventMinimumTicketClassPrice} - GHS${data.eventMaximumTicketClassPrice}`
                                : "Buy Tickets"
                            }
                            youtubeVideoId={youtubeVideoId}
                            smallBtnAction={this.playTrailerInIFrame}
                            onClickWrp={this.onClickWrp}
                            data={data}
                          />
                        </SplideSlide>
                      );
                    })}
                </Splide>
              </>
            ) : null}
            <Modal
              isOpen={this.state.openIFrameModal}
              toggle={() => this.playTrailerInIFrame()}
              className={"modal-danger trailer-modal"}
              style={{ width: "100%", maxWidth: "1100px" }}
            >
              <button
                type="button"
                className="close trailer-close"
                onClick={() => this.playTrailerInIFrame()}
                data-dismiss="trailer-modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>

              <ModalBody>
                <iframe
                  title="Movies-Frame"
                  width="100%"
                  height="350px"
                  src={`https://www.youtube.com/embed/${this.state.youtubeVideoId}`}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </ModalBody>
            </Modal>

            <div className="movies-card-main-wrapper">
              <div className="container">
                <div className="row">
                  {this.props.trendingEvents &&
                  this.props.trendingEvents.length > 0 ? (
                    <TopHeadingComponent
                      title={"Trending Now"}
                      onClick={(event) => this.onClickViewMore(event, 1)}
                      array={this.props.trendingEvents}
                    >
                      {this.getCardList(trendingEvents)}
                    </TopHeadingComponent>
                  ) : null}

                  {this.props.showingInCinemasEvents &&
                  this.props.showingInCinemasEvents.length > 0 ? (
                    <TopHeadingComponent
                      title={"Showing in Cinemas"}
                      onClick={(event) => this.onClickViewMore(event, 2)}
                      array={this.props.showingInCinemasEvents}
                    >
                      {this.props.showingInCinemasEvents.length &&
                        this.getCardList(this.props.showingInCinemasEvents)}
                    </TopHeadingComponent>
                  ) : null}

                  {this.props.allSubCategories &&
                  this.props.allSubCategories.length > 0 ? (
                    <div className={"component-wrp ta-l"}>
                      <Tabs
                        selectedTab={
                          this.state.noTabSelected
                            ? null
                            : this.state.selectedTab
                            ? "all"
                            : null
                        }
                      >
                        <div className={"tab-heading"}>Categories</div>
                        <TabLink
                          to={"all"}
                          onClick={() => this.onFetchAllCategories()}
                        >
                          All
                        </TabLink>
                        {this.props.allSubCategories &&
                          this.props.allSubCategories.map((subCategory, i) => {
                            let index = i + 1;
                            let tab = "tab" + index;
                            return (
                              <TabLink
                                key={index}
                                to={tab}
                                onClick={() =>
                                  this.onCategoryTabClick(
                                    subCategory,
                                    tab,
                                    true
                                  )
                                }
                              >
                                {subCategory.name}
                              </TabLink>
                            );
                          })}

                        <TabContent
                          for={this.state.selectedTabVal}
                          className="display"
                        >
                          <div className="Card-container">
                            {this.getCardList([], subCategoryEventsArray)}
                          </div>
                        </TabContent>
                      </Tabs>
                    </div>
                  ) : null}
                  {this.props.upcomingEvents &&
                  this.props.upcomingEvents.length > 0 ? (
                    <TopHeadingComponent
                      title={"Upcoming Movies"}
                      onClick={(event) => this.onClickViewMore(event, 3)}
                      array={this.props.upcomingEvents}
                    >
                      {this.getCardList(
                        this.props.upcomingEvents && this.props.upcomingEvents
                      )}
                    </TopHeadingComponent>
                  ) : null}

                  {this.props.nearByEvents &&
                  this.props.nearByEvents.length > 0 ? (
                    <TopHeadingComponent
                      title={"Shows Near You"}
                      onClick={(event) => this.onClickViewMore(event, 4)}
                      array={this.props.nearByEvents}
                    >
                      {this.getCardList(
                        this.props.nearByEvents && this.props.nearByEvents
                      )}
                    </TopHeadingComponent>
                  ) : null}
                </div>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    );
  };

  render() {
    if (this.props.processing) {
      return (
        <div id="wrapper">
          <div className="content">
            {this.pageTitle()}
            <Loader style={{ marginBottom: "20%" }} />
          </div>
        </div>
      );
    } else {
      return <>{this.getForm()}</>;
    }
  }
}

const mapStateToProps = (state) => {
  return {
    processing: state.category.categoryProcessing,
    parentCategories: state.category.parentCategories,
    childCategories: state.category.childCategories,
    promotedEvents: state.event.promotedEvents,
    trendingEvents: state.movies.trendingEvents,
    showingInCinemasEvents: state.movies.showingInCinemasEvents,
    upcomingEvents: state.movies.upcomingEvents,
    nearByEvents: state.movies.nearByEvents,
    allSubCategories: state.movies.allSubCategories,
    subCategoryEvents: state.movies.subCategoryEvents,
    eventsCountry: state.user.eventsCountry,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchAllParentCategories: () => dispatch(fetchParentCategories()),
    fetchChildCategories: (parentId, cb) =>
      dispatch(fetchChildCategories(parentId, cb)),
    getTrendingEvents: (categoryId) => dispatch(getTrendingEvents(categoryId)),
    getShowingInCinemasEvents: (categoryId) =>
      dispatch(getShowingInCinemasEvents(categoryId)),
    getNearByEvents: (categoryId) => dispatch(getNearByEvents(categoryId)),
    getUpcomingEvents: (categoryId) => dispatch(getUpcomingEvents(categoryId)),
    getAllSubCategories: (categoryId) =>
      dispatch(getAllSubCategories(categoryId)),
    setCatSecId: (ids, cb) => dispatch(setCatSecId(ids, cb)),
    getSubCategoriesEvents: (categoryId, paginate, page, skip, pageSize) =>
      dispatch(
        getSubCategoriesEvents(categoryId, paginate, page, skip, pageSize)
      ),
  };
};

const connectedComponent = connect(mapStateToProps, mapDispatchToProps)(Movies);
export default withRouter(connectedComponent);
