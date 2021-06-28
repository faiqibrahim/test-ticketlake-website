// Library
import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import ReactPaginate from "react-paginate";
import { NavLink } from "react-router-dom";
import { Breadcrumbs, BreadcrumbsItem } from "react-breadcrumbs-dynamic";
// Component

import Heading from "../../commonComponents/heading";
import Loader from "../../commonComponents/loader";
// Helpers
import {getCardDates} from "../../utils/common-utils";
import axios from "../../utils/axios";
import GoogleMap from "./googleMap";
import CardWithBottomInfo from "../../commonComponents/cardWithBottomInfo";
import {Helmet} from "react-helmet";

class NearByEvents extends Component {
  constructor(props) {
    super(props);
    this.state = {
      offset: 0,
      pageSize: 12,
      totalPages: 0,
      currentPage: 1,
      activeModal: "",
      isloadedNearby: false,
      nearByData: [],
      switchView: true,
      longitude: null,
      latitude: null,
    };
  }

  componentDidMount = () => {
    this.getCurrentPosition();
  };

  getCurrentPosition = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
          (position) => {
            const {longitude,latitude} = position.coords;
            this.setState({
              longitude,
              latitude,
            }, () => {
              this.getNearbyEvents(longitude, latitude);
            });
          },
          () => {
            // this.handleLocationError();
          },
          {
            enableHighAccuracy: true,
          }
      );
    }
  };


  getNearbyEvents = (longitude, latitude) => {
    axios
      .post("/events/get-nearby-events", {
        latitude,
        longitude,
        paginate: true,
        page: 1,
        // "type":"past",
        pageSize: 10,
        skip: 0,
      })
      .then((response) => {
        const {data} = response.data;
        data.forEach((dataItem)=>{
          dataItem.latitude = dataItem.venue.latitude
          dataItem.longitude = dataItem.venue.longitude
        })
        this.setState({
          isloadedNearby: true,
          nearByData: data,
        });
      })
      .catch((err) => {
        console.error("Err:", err);
      });
  };
  switchView = () => {
    this.setState({
      switchView: !this.state.switchView,
    });
  };

  pageTitle = () => {
    return (
        <Helmet>
          <title>Near By Events</title>
        </Helmet>
    )
  }

  listOver = (listOver) => {};
  render() {
    return (
      <div id="wrapper" key={2}>
        <div className="content">
          {this.pageTitle()}
          {this.state.switchView ?
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
                          heading={"Nearby Events"}
                      />
                      <BreadcrumbsItem glyph="home" to="/">
                        Home
                      </BreadcrumbsItem>
                      <BreadcrumbsItem to="/events/nearby-events">
                        Nearby Events
                      </BreadcrumbsItem>
                    </div>
                  </div>
                  <div className="row padding-bottom-10 border-bottom">
                    {/* left section */}
                    <div className="col-md-6">
                      <div className="zero breadcrumbs-hero-buttom fl-wrap">
                        <div className="breadcrumbs">
                          <Breadcrumbs
                              item={NavLink}
                              finalItem={"span"}
                              finalProps={{
                                style: { color: "#EC1C24" },
                              }}
                          />
                        </div>
                      </div>
                    </div>
                    {/* right section */}
                    {this.state.nearByData.length > 0 ? (
                        <div className="col-md-6">
                          <span
                              className="float-right cursor-pointer"
                              onClick={this.switchView}
                          >
                            <img
                                src="/images/nearby-map-view.png"
                                className="switch-view-icon"
                                alt='img'
                            />
                            Switch to Map View
                          </span>
                        </div>
                    ) : null}
                  </div>
                  <div className="row mt-30">
                    {this.state.isloadedNearby ? this.state.nearByData.length > 0 ? (
                        this.state.nearByData.map((data, i) => {
                          return (
                              <CardWithBottomInfo
                                  key={i}
                                  id={data._id}
                                  auth={this.props.auth}
                                  imageSrc={data.bannerImageKey.imageUrl}
                                  onClick={() => this.props.history.push({
                                    pathname: `/event/detail/${data.eventSlotId}`,
                                    data: data,
                                  })}
                                  venueTitle={data.venue ? data.venue.name : ""}
                                  dates={getCardDates(data.eventDateTimeSlot)}

                              />
                          );
                        })
                    ) :
                        <div className={"Error-msg-wrp w100"}>
                          <div className={"Error-heading"}>Sorry, No Event Found.</div>
                          <span className={"Error-sub-heading"}>There are no events.</span>
                        </div>
                      : (
                        <div className="col-lg-12">
                          <Loader />
                        </div>
                    )}
                  </div>
                  {this.state.nearByData > 1 ? (
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
                      </div>
                  ) : null}
                </div>
              </section>
              :
              <section className="light-red-bg small-padding pt-0" id="sec2">
                <div className="container custom-container nearbyLayout">
                  <div className={"row"}>
                    <div className={"col-md-6 pt-30 mh-100vh"}>
                      <div className="row">
                        <div className="col-md-12">
                          <Heading
                              style={{ marginBottom: "0px", textAlign: "left" }}
                              className="section-title"
                              heading={"Nearby Events"}
                          />
                          <BreadcrumbsItem glyph="home" to="/">
                            Home
                          </BreadcrumbsItem>
                          <BreadcrumbsItem to="/events/nearby-events">
                            Nearby Events
                          </BreadcrumbsItem>
                        </div>
                      </div>
                      <div className="row padding-bottom-10 border-bottom">
                        {/* left section */}
                        <div className="col-md-6">
                          <div className="zero breadcrumbs-hero-buttom fl-wrap">
                            <div className="breadcrumbs">
                              <Breadcrumbs
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
                      <div className="col-md-12 list-view pl-0">
                        {this.state.isloadedNearby ? (
                            this.state.nearByData.map((data, i) => {
                              return (
                                  <div
                                      key={i}
                                      className="row cursor-pointer padding-bottom mt-30"
                                      onClick={() =>
                                          this.props.history.push(
                                              `/event/detail/${data.eventSlotId}`
                                          )
                                      }
                                      onMouseOver={() => this.listOver(data.venue)}
                                  >
                                    <div className="col-md-4 nearby-img">
                                      <img style={{ height: "130px" }} src={data.bannerImageKey.imageUrl} alt='img' />
                                    </div>
                                    <div className="col-md-8 nearby-text">
                                      <p style={{paddingTop: "40px"}}>
                                        {getCardDates(data.eventDateTimeSlot)}
                                        <br />
                                        {data.venue ? data.venue.name : ""}
                                      </p>
                                    </div>
                                  </div>
                              );
                            })
                        ) : (
                            <Loader />
                        )}
                        {this.state.nearByData > 1 ? (
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
                          </div>
                        ) : null}
                  </div>
                    </div>
                      <div className="col-md-6 map-placeholder">
                        <div className={"map-head"}>
                          {this.state.nearByData.length > 0 ?
                              <div style={{ width: '205px' }}
                                   className="float-left switch-grid-view cursor-pointer"
                                   onClick={this.switchView}>
                                <img src="/images/nearby-map-view.png"
                                     alt='img'
                                     className="switch-view-icon" />
                                <p className="zero">Switch to Grid View <span
                                    className="close-icon">x</span></p>
                              </div>
                              : null
                          }
                          <GoogleMap
                              nearByData={this.state.nearByData}
                              longitude={this.state.longitude}
                              latitude={this.state.latitude}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
              </section>
          }
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    promotedEvents: state.event.promotedEvents,
    processing: state.event.processing,
    auth: state.user.authenticated,
    wishLists: state.wishlist.wishListIds,
    paginationProcessing: state.event.paginationProcessing,
    eventsCountry: state.user.eventsCountry,
  };
};

const connectedComponent = connect(
  mapStateToProps,
  {}
)(NearByEvents);
export default withRouter(connectedComponent);
