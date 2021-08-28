// Library
import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import {Row} from 'reactstrap';
import ReactPaginate from 'react-paginate';
import {Modal, ModalHeader, ModalBody} from 'reactstrap';
import {
    FacebookShareButton,
    TwitterShareButton,
    FacebookIcon,
    TwitterIcon
} from 'react-share';
// Component

import DefaultCard from '../../commonComponents/defaultCard';
import Heading from '../../commonComponents/heading';
import Loader from "../../commonComponents/loader";
//redux
import {getAllPromotedEvents} from '../../redux/event/event-actions';
import {getWishListIdsFromApi, wishListToggle} from '../../redux/wishlist/wishlist-actions';
// Helpers
import {getCardDates, getMaxAndMinPrice} from '../../utils/common-utils';
import EventListingFilters from "../eventListingFilters";
//import ResultForHeading from "../../commonComponents/resultForHeading";
import { filteredCities } from "../../utils/config";


let isWishlist = false;

class PromotedEventsPage extends Component {

    state = {
        offset: 0,
        pageSize: 12,
        totalPages: 0,
        currentPage: 1,
        activeModal: ''
    };


    getEvents(paginate, currentPage, pageSize, skip) {
        this.props.getAllPromotedEvents(paginate, currentPage, pageSize, skip);
    }

    componentWillMount() {
        this.setState({totalPages: 0});
        // document.title = "Ticket Lake - Promoted Events";
        if (this.props.wishLists === null && this.props.auth) {
            this.props.getWishListIdsFromApi();
        }
        this.getEvents(true, this.state.currentPage, this.state.pageSize);
    }

    componentDidUpdate(prevProps) {
        if (prevProps.eventsCountry !== this.props.eventsCountry) {
            this.getEvents(true, this.state.currentPage, this.state.pageSize);
        }
    }

    loadMoreEvents = (e) => {
        this.setState(
            {
                offset: Math.ceil(e.selected * this.state.pageSize),
                currentPage: e.selected + 1
            },
            () => {
                this.getEvents(true, this.state.currentPage, this.state.pageSize);
            }
        );
    };


    wishListToggle = (eventSlotId) => {
        if (this.props.auth) {
            this.props.wishListToggle(eventSlotId);
        }
    };

    sharingSocial = (id) => {
        if (id) {
            this.setState({activeModal: id});
        } else {

            this.setState({activeModal: ''});
        }
    };

    render() {
        let cities = filteredCities();

        if (this.props.promotedEvents) {
            if (this.state.totalPages === 0) {
                this.setState({totalPages: this.props.promotedEvents.promotedEvents.totalPages});
            }
        }

        let shareUrl = 'http://google.com/';
        let promotedEvents = this.props.promotedEvents && this.props.promotedEvents.promotedEvents;
        const cardDisplayJSX = promotedEvents && Array.isArray(promotedEvents.data) && promotedEvents.data.map((data, i) => {
            shareUrl = window.location.protocol + '//' + window.location.host + '/event/detail/' + data.eventSlotId;
            if (this.props.auth) {
                isWishlist = this.props.wishLists && this.props.wishLists !== '' && this.props.wishLists.includes(data.eventSlotId);
            }
            return (
                <Fragment key={i}>
                    <DefaultCard
                             isPromoted={true}
                             tags={data.parentEventInfo && data.parentEventInfo.tags}
                             key={i}
                             grid={3}
                             auth={this.props.auth}
                             cardTitle={data.eventTitle}
                             venueName={data.venue && data.venue.name}
                             image={data.bannerImageKey.imageUrl}
                             cardLink={'#'}
                             dates={getCardDates(data.eventDateTimeSlot)}
                             promotedDate={data.eventDateTimeSlot}
                             isWishList={isWishlist}
                             wishlistLink={() => this.wishListToggle(data.eventSlotId)}
                             cardAddress={data.venue ? data.venue.address : ''}
                             country={data.venue ? data.venue.country : []}
                             city={data.venue ? data.venue.city : []}
                             onClick={() => this.props.history.push(`/event/detail/${data.eventSlotId}`)}
                             buttonText={getMaxAndMinPrice(data)}
                             buttonLink={`/buy-ticket/${data.eventSlotId}`}
                             sharing={this.sharingSocial}
                             description={data.parentEventInfo && data.parentEventInfo.description}
                             id={data._id}
                    />

                    <Modal isOpen={this.state.activeModal === data._id} toggle={this.sharingSocial}
                           className={this.props.className + ' social-sharing-model'}>
                        <ModalHeader toggle={this.sharingSocial}>{data.eventTitle}</ModalHeader>
                        <ModalBody>
                            <h4>Share this event on:</h4>
                            <row className={"social-icons-wrp"}>
                                <FacebookShareButton url= {shareUrl} quote={data.eventTitle}
                                                     className="Demo__some-network__share-button">
                                    <FacebookIcon size={40} round/>
                                </FacebookShareButton>
                                <TwitterShareButton url= {shareUrl} title={data.eventTitle}
                                                    className="Demo__some-network__share-button">
                                    <TwitterIcon size={40} round/>
                                </TwitterShareButton>
                            </row>
                        </ModalBody>
                    </Modal>
                </Fragment>
            )
        });

        let hasPromotedEvents = Boolean(promotedEvents && promotedEvents.data && promotedEvents.data.length);
        return (

            <div id="wrapper" key={2}>
                <div className="content">

                    <section id="sec2" style={{paddingTop: '30px', paddingBottom: '10px'}} className={"light-red-bg"}>
                        <div className={"container custom-container"}>
                            <Heading
                                style={{marginBottom: '0px', textAlign: 'left'}}
                                heading={"Top Events"}
                                text={"Navigate through number of outrageous events happening around"}/>

                            <div className = "row">
                                <div className="col-md-12">
                                    <EventListingFilters
                                        changeCategory={this.onCategoryChange}
                                        changeCity={this.onLocationChange}
                                        changeDate={this.onDateChange}
                                        handleChange={this.handleChange}
                                        categories={this.props.categories}
                                        handleSearch={this.handleSearch}
                                        city={cities}
                                        category={this.state.storeCategories}
                                        location={this.state.city}
                                        from={this.state.from}
                                        to={this.state.to}
                                        search={this.state.keyword}
                                        date={this.state.date}
                                    />
                                    {/*{*/}
                                    {/*    this.props.processing ? <Loader />*/}
                                    {/*        :*/}
                                    {/*        <div className="col-list-wrap fw-col-list-wrap">*/}
                                    {/*            <div*/}
                                    {/*                className="list-main-wrap fl-wrap card-listing">*/}
                                    {/*                <ResultForHeading*/}
                                    {/*                    firstText={'Result for : '}*/}
                                    {/*                    secondText={this.getSearchTitle()}*/}
                                    {/*                    thirdText={`(${this.props.allEvents && this.props.allEvents.data &&*/}
                                    {/*                    this.props.allEvents.data.totalDocs} Results)`}*/}
                                    {/*                />*/}

                                    {/*                {!allEvents.length ?*/}
                                    {/*                    <div className={"Error-msg-wrp w100"}>*/}
                                    {/*                        <div className={"Error-heading"}>Sorry, No Event Found.</div>*/}
                                    {/*                        <span className={"Error-sub-heading"}>There are no events found under current search, Please search again with different keywords. </span>*/}
                                    {/*                    </div>*/}
                                    {/*                    :*/}

                                    {/*                    <> {*/}
                                    {/*                        allEvents ?*/}
                                    {/*                            <Row className={"w100"}>*/}
                                    {/*                                {cardDisplayJSX}*/}
                                    {/*                            </Row>*/}
                                    {/*                            :*/}
                                    {/*                            'no data'*/}
                                    {/*                    }*/}

                                    {/*                        {*/}
                                    {/*                            allEvents.length > 0 ?*/}
                                    {/*                                this.props.paginateEvents.hasNextPage === true ?*/}
                                    {/*                                    <a className="load-more-button"*/}
                                    {/*                                       href={hrefLink}*/}
                                    {/*                                       onClick={(e) => this.loadMoreEvents(e)}>Load*/}
                                    {/*                                        more*/}
                                    {/*                                        {this.props.paginationProcessing ? (*/}
                                    {/*                                            <i className="fas fa-spinner" />) : null}*/}
                                    {/*                                    </a> : null :*/}
                                    {/*                                <div>*/}
                                    {/*                                    /!* No Events *!/*/}
                                    {/*                                </div>*/}
                                    {/*                        }*/}
                                    {/*                    </>*/}
                                    {/*                }*/}
                                    {/*            </div>*/}
                                    {/*        </div>*/}
                                    {/*}*/}

                                </div>
                            </div>
                        </div>


                    </section>

                    <section className="light-red-bg small-padding" id="sec1">
                        <div className="container custom-container">
                            <div className="row">

                                <div className="col-md-12">

                                    {
                                        !this.props.processing && !this.props.paginationProcessing?
                                            hasPromotedEvents ?
                                                <div className="col-list-wrap fw-col-list-wrap">
                                                    <div
                                                        className="list-main-wrap fl-wrap card-listing">
                                                        <Row>
                                                            {cardDisplayJSX}
                                                        </Row>
                                                    </div>

                                                </div>
                                                :  <div className={"Error-msg-wrp"}>
                                                    <div className={"Error-heading"}>Sorry, No Event Found.</div>
                                                    <span className={"Error-sub-heading"}>There are no events.</span>
                                                </div>


                                            :

                                            <Loader/>
                                    }
                                </div>
                            </div>
                            {hasPromotedEvents ?
                                <div className="row">
                                    <div className="col-lg-12 float-left">
                                        <div className="d-flex">
                                            <ReactPaginate
                                                previousLabel={<i className="fa fa-angle-left"/>}
                                                nextLabel={<i className="fa fa-angle-right"/>}
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
                                        </div>
                                    </div>
                                </div>
                                :
                                null
                            }
                        </div>
                    </section>
                </div>
            </div>

        )

    };


}

const mapStateToProps = (state) => {
    return {
        promotedEvents: state.event.promotedEvents,
        processing: state.event.processing,
        auth: state.user.authenticated,
        wishLists: state.wishlist.wishListIds,
        paginationProcessing: state.event.paginationProcessing,
        eventsCountry: state.user.eventsCountry
    }
};


const connectedComponent = connect(mapStateToProps, {
    getAllPromotedEvents,
    getWishListIdsFromApi,
    wishListToggle
})(PromotedEventsPage);
export default withRouter(connectedComponent);