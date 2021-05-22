import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import ReactPaginate from 'react-paginate';
import { NavLink } from 'react-router-dom';
import { Breadcrumbs, BreadcrumbsItem } from 'react-breadcrumbs-dynamic';
import Heading from '../../commonComponents/heading';
import Loader from "../../commonComponents/loader";
import { distance } from '../../utils/common-utils';
import GoogleMap from "../nearByEvents/googleMap";
import { getVenueTypes, getNearByCinemas } from '../../redux/venues/venue-action';
import CardWithBottomInfo from '../../commonComponents/cardWithBottomInfo';

class NearByCinemas extends Component {

    constructor(props) {
        super(props);
        this.state = {
            offset: 0,
            pageSize: 12,
            totalPages: 0,
            currentPage: 1,
            activeModal: '',
            isloadedNearby: false,
            nearByData: [],
            switchView: true,
            longitude: null,
            latitude: null
        };
    }

    componentDidMount = () => {
        this.props.getVenueTypes(() => {
            this.getCurrentPosition();
        })
    };

    getCurrentPosition = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                this.getLatLong(position.coords.longitude, position.coords.latitude)
            },
                () => {
                    // this.handleLocationError();
                },
                {
                    enableHighAccuracy: true
                });
            //  setTimeout(setValues, 2000);
        } else {
            //
        }
    };

    getLatLong = (a, b) => {
        this.setState({
            longitude: b,
            latitude: a
        });
        this.getNearbyEvents(a, b)
    };

    getNearbyEvents = (latitude, longitude) => {
        this.props.getNearByCinemas(latitude, longitude, (data) => {
            this.setState({
                isloadedNearby: true,
                nearByData: data
            })
        });
    };

    switchView = () => {
        this.setState({
            switchView: !this.state.switchView
        })
    };

    listOver = (listOver) => {
    };

    render() {
        return (
            <div id="wrapper" key={2}>
                <div className="content">
                    <section id="sec2" style={{ paddingTop: '30px', paddingBottom: '10px' }} className={"light-red-bg"}>
                        <div className={"container custom-container"}>
                            <div className="row">
                                <div className="col-md-12">
                                    <Heading
                                        style={{ marginBottom: '0px', textAlign: 'left' }}
                                        className="section-title"
                                        heading={"Nearby Cinemas"} />
                                    <BreadcrumbsItem glyph='home' to='/'>Home</BreadcrumbsItem>
                                    <BreadcrumbsItem to='/events/nearby-events'>
                                        Nearby Cinemas
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
                                                finalItem={'span'}
                                                finalProps={{
                                                    style: { color: '#EC1C24' }
                                                }}
                                            />
                                        </div>
                                    </div>
                                </div>
                                {/* right section */}
                                {this.state.nearByData.length > 0 ?
                                    <div className="col-md-6">
                                        <span className="float-right cursor-pointer" onClick={this.switchView}>
                                            <img alt='img' src="/images/nearby-map-view.png" className="switch-view-icon" />
                                                Switch to Map View
                                            </span>
                                    </div>
                                    : null
                                }
                            </div>
                        </div>
                    </section>

                    {this.state.isloadedNearby ?
                        <section className="light-red-bg small-padding" id="sec1">
                            <div className="container custom-container">
                                <div className="row">
                                    <div className="col-md-12">
                                        {this.state.nearByData.length > 0 ? null : 'Events not Found!'}
                                    </div>
                                </div>
                            </div>
                        </section>
                        :
                        null
                    }

                    {this.state.switchView ?
                        // grid view
                        <section className="light-red-bg small-padding" id="sec1">
                            <div className="container custom-container">
                                <div className="row">
                                    {this.state.isloadedNearby ?
                                        this.state.nearByData.map((data, i) => {
                                            return (
                                                <CardWithBottomInfo imageSrc={data.defaultImage}
                                                    onClick={() => this.props.history.push({
                                                        pathname: `/events/nearby-cinemas/detail/${data._id}`,
                                                        data: data,
                                                    })}
                                                    title={data.name}
                                                    address={`${data.address}, ${data.country}`}
                                                    noOfShows={data.numberOfOnGoingEvents}
                                                    distance={distance(this.state.latitude, this.state.longitude, data.latitude, data.longitude, 'K')}
                                                />
                                            )
                                        })
                                        :
                                        <div className="col-lg-12"><Loader /></div>
                                    }
                                </div>
                                <div className="row">
                                    <div
                                        className="col-lg-12 float-left">
                                        <div className="d-flex">
                                            {this.state.nearByData > 1 ? (
                                                <ReactPaginate
                                                    previousLabel={<i className="fa fa-angle-left" />}
                                                    nextLabel={<i className="fa fa-angle-right" />}
                                                    breakLabel={'...'}
                                                    breakClassName={'break-me'}
                                                    pageCount={this.state.totalPages}
                                                    marginPagesDisplayed={2}
                                                    pageRangeDisplayed={5}
                                                    onPageChange={(data) => this.loadMoreEvents(data)}
                                                    containerClassName={'list-inline mx-auto justify-content-center pagination'}
                                                    subContainerClassName={'list-inline-item pages pagination'}
                                                    activeClassName={'active'}
                                                />
                                            ) : null}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                        :
                        // list view
                        <section className="light-red-bg small-padding" id="sec2">
                            <div className="container custom-container">
                                <div className="row" style={{ paddingBottom: '50px' }}>
                                    <div className="col-md-6 list-view">
                                        {this.state.isloadedNearby ?
                                            this.state.nearByData.map((data, i) => {
                                                return (
                                                    <div className='row cursor-pointer'
                                                        onClick={() => this.props.history.push({
                                                            pathname: `/events/nearby-cinemas/detail/${data._id}`,
                                                            data: data,
                                                        })}
                                                        onMouseOver={() => this.listOver(data.venue)}>
                                                        <div className="col-md-4 nearby-img">
                                                            <img src={data.defaultImage ? data.defaultImage : '/images/card_2.png'} alt='img' />
                                                        </div>
                                                        <div className="col-md-8 nearby-text">
                                                            <h5>{data.name}</h5>
                                                            <p>{data.numberOfOnGoingEvents} Shows
                                                                <br />
                                                                {data.venue ? data.venue.address : data.address},
                                                                {data.venue ? data.venue.country : data.country}
                                                            </p>
                                                            <div className="km">
                                                                <h5 className="km-count zero">
                                                                    {distance(this.state.latitude, this.state.longitude, data.latitude, data.longitude, 'K')}
                                                                </h5>
                                                                <span className="km-text">KM</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )
                                            })
                                            :
                                            <Loader />
                                        }
                                        <div className="row">
                                            <div
                                                className="col-lg-12 float-left">
                                                <div className="d-flex">
                                                    {this.state.nearByData > 1 ? (
                                                        <ReactPaginate
                                                            previousLabel={<i className="fa fa-angle-left" />}
                                                            nextLabel={<i className="fa fa-angle-right" />}
                                                            breakLabel={'...'}
                                                            breakClassName={'break-me'}
                                                            pageCount={this.state.totalPages}
                                                            marginPagesDisplayed={2}
                                                            pageRangeDisplayed={5}
                                                            onPageChange={(data) => this.loadMoreEvents(data)}
                                                            containerClassName={'list-inline mx-auto justify-content-center pagination'}
                                                            subContainerClassName={'list-inline-item pages pagination'}
                                                            activeClassName={'active'}
                                                        />
                                                    ) : null}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-6 map-placeholder">
                                        <div>
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
        )
    };
}

const mapStateToProps = (state) => {
    return {
        auth: state.user.authenticated,
        nearByData: state.venue.nearByCinemas
    }
};

const connectedComponent = connect(mapStateToProps, { getVenueTypes, getNearByCinemas })(NearByCinemas);
export default withRouter(connectedComponent);