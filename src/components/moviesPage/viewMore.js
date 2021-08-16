// Library
import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { withRouter } from "react-router-dom";
import { Breadcrumbs, BreadcrumbsItem } from "react-breadcrumbs-dynamic";
import ReactPaginate from "react-paginate";

// Component
import Heading from "../../commonComponents/heading";
import { CardWithHoverEffect } from "../../commonComponents/CardWithHoverEffect";
import {
  getTrendingEvents,
  getShowingInCinemasEvents,
  getUpcomingEvents,
  getNearByEvents,
  getSubCategoriesEvents,
} from "../../redux/movies/movie-action";
import Loader from "../../commonComponents/loader/";

// Redux
import { connect } from "react-redux";

class ViewMore extends Component {
  state = {
    events: [],
    pageTitle: "Page Title",
    processing: true,
    playVideo: false,
    onPlayHideBtn: false,
    playVideoWithIndexes: [],
    youtubeVideoId: null,
    playTrailerOnMouseHover: false,
    onHover: false,
    currentPage: 1,
    pageSize: 12,
    totalPages: 0,
    sectionId: null,
    categoryId: null,
    subCategoryId: null,
  };

  componentDidMount() {
    let categoryId = this.props.categoryId;
    let sectionId = this.props.sectionId;
    this.setState({ sectionId: sectionId, categoryId: categoryId }, () =>
      this.setEventsData()
    );
  }

  setEventsData = () => {
    let categoryId = sessionStorage.getItem("categoryId");
    let sectionId = JSON.parse(sessionStorage.getItem("sectionId"));
    let subCategoryItem = JSON.parse(sessionStorage.getItem("subCategoryItem"));
    switch (sectionId) {
      case 1:
        this.props.getTrendingEvents(
          categoryId,
          true,
          this.state.currentPage,
          "",
          this.state.pageSize,
          (data) => {
            let eventData = data && data.data;
            this.setState({
              events: eventData,
              pageTitle: "Trending Events",
              processing: false,
              totalPages: data && data.totalPages,
            });
            sessionStorage.setItem("sectionId", null);
          }
        );
        break;
      case 2:
        this.props.getShowingInCinemasEvents(
          categoryId,
          true,
          this.state.currentPage,
          "",
          this.state.pageSize,
          (data) => {
            let eventData = data && data.data;
            this.setState({
              events: eventData,
              pageTitle: "Showing in Cinema",
              processing: false,
              totalPages: data && data.totalPages,
            });
            sessionStorage.setItem("sectionId", null);
          }
        );
        break;
      case 3:
        this.props.getUpcomingEvents(
          categoryId,
          true,
          this.state.currentPage,
          "",
          this.state.pageSize,
          (data) => {
            let eventData = data && data.data;
            this.setState({
              events: eventData,
              pageTitle: "Upcoming Events",
              processing: false,
              totalPages: data && data.totalPages,
            });
            sessionStorage.setItem("sectionId", null);
          }
        );
        break;
      case 4:
        this.props.getNearByEvents(
          categoryId,
          true,
          this.state.currentPage,
          "",
          this.state.pageSize,
          (data) => {
            let eventData = data && data.data;
            this.setState({
              events: eventData,
              pageTitle: "Shows Near You",
              processing: false,
              totalPages: data && data.totalPages,
            });
            sessionStorage.setItem("sectionId", null);
          }
        );
        break;
      default: {
        if (subCategoryItem) {
          this.props.getSubCategoriesEvents(
            subCategoryItem._id,
            true,
            this.state.currentPage,
            "",
            this.state.pageSize,
            (data) => {
              let eventData = data && data.data;
              this.setState({
                events: eventData,
                categoryId,
                pageTitle: subCategoryItem.name,
                processing: false,
                totalPages: data && data.totalPages,
              });
            }
          );
        } else {
          this.setState({ events: [], pageTitle: "Events", processing: false });
        }
      }
    }
  };

  playVideoTrailer = (index, youtubeUrl) => {
    let array = [];
    array.push(index);
    let youtubeVideoId = "";
    if (youtubeUrl) {
      let video_id = youtubeUrl.split("v=")[1];
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
    this.setState({
      onPlayHideBtn: !this.state.onPlayHideBtn,
      playVideoWithIndexes: array,
      youtubeVideoId: youtubeVideoId,
    });
  };

  onMouseOver = (e, youtubeVideoId) => {
    e.preventDefault();
    if (youtubeVideoId) {
      this.setState({ playTrailerOnMouseHover: true });
    }
  };

  onMouseOut = (e, youtubeVideoId) => {
    e.preventDefault();
    if (youtubeVideoId) {
      this.setState({
        playTrailerOnMouseHover: false,
        playVideoWithIndexes: [],
      });
    }
  };

  onMovieCardClick = (card) => {
    sessionStorage.setItem("parentEventDetail", JSON.stringify(card));
    if (card && card._id) {
      this.props.history.push({
        pathname: `/movie/detail/${card._id}`,
        data: card,
      });
    }
  };

  loadMoreEvents = (e) => {
    this.setState({ currentPage: e.selected + 1 }, () => {
      this.setEventsData();
    });
  };

  getCategoryId = () => {
    let url_string = window.location.href;
    let url = new URL(url_string);
    const id = url.searchParams.get("id");
    return id;
  };

  render() {
    const { categoryId, pageTitle } = this.state;
    return (
      <div id="wrapper" key={2}>
        <div className="content">
          {this.state.processing ? (
            <Loader />
          ) : (
            <section
              id="sec2"
              style={{ paddingTop: "30px", paddingBottom: "10px" }}
              className={"light-red-bg"}
            >
              <div className={"container custom-container"}>
                <div className="row">
                  <div className="col-md-12">
                    <Heading
                      style={{ marginBottom: "0px", textAlign: "left" }}
                      className="section-title"
                      heading={pageTitle}
                    />
                  </div>
                </div>
                <div className="row padding-bottom-10 border-bottom">
                  <div className="col-md-6">
                    <div className="zero breadcrumbs-hero-buttom fl-wrap">
                      <div className="breadcrumbs">
                        <BreadcrumbsItem glyph="home" to="/">
                          Home
                        </BreadcrumbsItem>

                        <BreadcrumbsItem
                          glyph="movies"
                          to={`/movies/?id=${categoryId}`}
                        >
                          Movies
                        </BreadcrumbsItem>

                        <BreadcrumbsItem
                          to={`/movies/viewMore/?id=${pageTitle}`}
                        >
                          {pageTitle}
                        </BreadcrumbsItem>

                        <Breadcrumbs
                          compare={(a, b) => a.weight - b.weight}
                          removeProps={{ weight: true }}
                          item={NavLink}
                          finalItem={"span"}
                          finalProps={{
                            style: { color: "#EC1C24" },
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row see-more-events-wrp">
                <div className="container">
                  <div className="row">
                    <div className="card-wrp">
                      {this.state.events && this.state.events.length > 0 ? (
                        <>
                          {this.state.events.map((event, index) => {
                            let title = event.title;
                            let imageUrl =
                              event.bannerImageKey &&
                              event.bannerImageKey.imageUrl;
                            let youtubeUrl = event.youtubeLink;
                            let youtubeVideoId;
                            if (youtubeUrl) {
                              let video_id = youtubeUrl.split("v=")[1];
                              if (video_id === undefined) {
                                youtubeVideoId = "";
                              } else {
                                let ampersandPosition = video_id.indexOf("&");
                                if (ampersandPosition !== -1) {
                                  video_id = video_id.substring(
                                    0,
                                    ampersandPosition
                                  );
                                }
                                youtubeVideoId = video_id;
                              }
                            }
                            return (
                              <CardWithHoverEffect
                                key={index}
                                index={index}
                                imageUrl={imageUrl}
                                title={title}
                                firstBtnTitle={"Play Trailer"}
                                secondBtnTitle={`Buy Tickets from GHS${event.eventMinimumTicketClassPrice} - GHS${event.eventMaximumTicketClassPrice}`}
                                onMouseEnter={this.onMouseOver}
                                onMouseLeave={this.onMouseOut}
                                playVideoTrailer={this.playVideoTrailer}
                                youtubeUrl={youtubeUrl}
                                youtubeVideoId={youtubeVideoId}
                                playTrailerOnMouseHover={
                                  this.state.playTrailerOnMouseHover
                                }
                                playVideoWithIndexes={
                                  this.state.playVideoWithIndexes
                                }
                                onMovieCardClick={this.onMovieCardClick}
                                card={event}
                                stateYoutubeVideoId={this.state.youtubeVideoId}
                              />
                            );
                          })}
                        </>
                      ) : (
                        <div className={"Error-msg-wrp"}>
                          <div className={"Error-heading"}>
                            Sorry, No Event Found.
                          </div>
                          <span className={"Error-sub-heading"}>
                            There are no events.
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
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
            </section>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    sectionId: state.movies.sectionId,
    categoryId: state.movies.categoryId,
  };
};

const connectedComponent = connect(mapStateToProps, {
  getTrendingEvents,
  getShowingInCinemasEvents,
  getNearByEvents,
  getUpcomingEvents,
  getSubCategoriesEvents,
})(ViewMore);
export default withRouter(connectedComponent);
