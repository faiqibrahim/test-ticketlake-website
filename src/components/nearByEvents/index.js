// Library
import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import ReactPaginate from "react-paginate";
import { NavLink } from "react-router-dom";
import { Breadcrumbs, BreadcrumbsItem } from "react-breadcrumbs-dynamic";
// Component

import DefaultCard from "../../commonComponents/defaultCard";
import Heading from "../../commonComponents/heading";
import Loader from "../../commonComponents/loader";
// Helpers
import { getCardDates, getMaxAndMinPrice } from "../../utils/common-utils";
import axios from "../../utils/axios";
import GoogleMap from "./googleMap";

let isWishlist = false;

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
  getCurrentPosition = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          this.getLatLong(position.coords.longitude, position.coords.latitude);
        },
        () => {
          // this.handleLocationError();
        },
        {
          enableHighAccuracy: true,
        }
      );
      //  setTimeout(setValues, 2000);
    } else {
      //
    }
  };
  getLatLong = (a, b) => {
    this.setState({
      longitude: a,
      latitude: b,
    });
    this.getNearbyEvents(a, b);
  };
  componentDidMount = () => {
    this.getCurrentPosition();
  };
  getNearbyEvents = (a, b) => {
    console.log("hello long lat", a, b);
    axios
      .post("/events/get-nearby-events", {
        latitude: b,
        longitude: a,
        paginate: true,
        page: 1,
        // "type":"past",
        pageSize: 10,
        skip: 0,
      })
      .then((response) => {
        this.setState({
          isloadedNearby: true,
          nearByData: response.data.data,
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
  listOver = (listOver) => {};
  render() {
    return (
      <div id="wrapper" key={2}>
        <div className="content">
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
            </div>
          </section>

          {this.state.isloadedNearby ? (
            <section className="light-red-bg small-padding" id="sec1">
              <div className="container custom-container">
                <div className="row">
                  <div className="col-md-12">
                    {this.state.nearByData.length > 0
                      ? null
                      : "Events not Found!"}
                  </div>
                </div>
              </div>
            </section>
          ) : null}

          {this.state.switchView ? (
            // grid view
            <section className="light-red-bg small-padding" id="sec1">
              <div className="container custom-container">
                <div className="row">
                  {this.state.isloadedNearby ? (
                    this.state.nearByData.map((data, i) => {
                      return (
                        <DefaultCard
                          key={i}
                          gridLg={3}
                          gridMd={6}
                          gridSm={12}
                          auth={this.props.auth}
                          cardTitle={data.eventTitle}
                          venueName={data.venue && data.venue.name}
                          image={data.bannerImageKey.imageUrl}
                          cardLink={"#"}
                          dates={getCardDates(data.eventDateTimeSlot)}
                          isWishList={isWishlist}
                          wishlistLink={() =>
                            this.wishListToggleLink(data.eventSlotId)
                          }
                          cardAddress={data.venue ? data.venue.address : ""}
                          country={data.venue ? data.venue.country : []}
                          city={data.venue ? data.venue.city : []}
                          onClick={() =>
                            this.props.history.push(
                              `/event/detail/${data.eventSlotId}`
                            )
                          }
                          buttonText={getMaxAndMinPrice(data)}
                          buttonLink={`/buy-ticket/${data.eventSlotId}`}
                          sharing={this.sharingSocial}
                          description={
                            data.parentEventInfo &&
                            data.parentEventInfo.description
                          }
                          id={data._id}
                        />
                      );
                    })
                  ) : (
                    <div className="col-lg-12">
                      <Loader />
                    </div>
                  )}
                </div>
                <div className="row">
                  <div className="col-lg-12 float-left">
                    <div className="d-flex">
                      {this.state.nearByData > 1 ? (
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
          ) : (
            // list view
            <section className="light-red-bg small-padding" id="sec2">
              <div className="container custom-container">
                <div className="row" style={{ paddingBottom: "50px" }}>
                  <div className="col-md-6 list-view">
                    {this.state.isloadedNearby ? (
                      this.state.nearByData.map((data, i) => {
                        return (
                          <div
                            className="row cursor-pointer"
                            onClick={() =>
                              this.props.history.push(
                                `/event/detail/${data.eventSlotId}`
                              )
                            }
                            onMouseOver={() => this.listOver(data.venue)}
                          >
                            <div className="col-md-4 nearby-img">
                              <img src={data.bannerImageKey.imageUrl} alt='img' />
                            </div>
                            <div className="col-md-8 nearby-text">
                              <h5>{data.eventTitle}</h5>
                              <p>
                                {getCardDates(data.eventDateTimeSlot)}
                                <br />
                                {data.venue ? data.venue.address : ""},{" "}
                                {data.venue ? data.venue.country : []}
                              </p>
                              <div className="km">
                                <h5 className="km-count zero">05</h5>
                                <span className="km-text">KM</span>
                              </div>
                            </div>
                          </div>
                        );
                      })
                    ) : (
                      <Loader />
                    )}
                    <div className="row">
                      <div className="col-lg-12 float-left">
                        <div className="d-flex">
                          {this.state.nearByData > 1 ? (
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
                  <div className="col-md-6 map-placeholder">
                    <div>
                      {this.state.nearByData.length > 0 ? (
                        <div
                          style={{ width: "205px" }}
                          className="float-left switch-grid-view cursor-pointer"
                          onClick={this.switchView}
                        >
                          <img
                            src="/images/nearby-map-view.png"
                            className="switch-view-icon" alt='img'
                          />
                          <p className="zero">
                            Switch to Grid View{" "}
                            <span className="close-icon">x</span>
                          </p>
                        </div>
                      ) : null}
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
          )}
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
