// Library
import React, {Component} from 'react';
import queryString from 'query-string';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import {Row, Col} from 'reactstrap';
import {Button, Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap';
import {
    FacebookShareButton,
    TwitterShareButton,
    EmailShareButton,
    FacebookIcon,
    TwitterIcon
} from 'react-share';
// Component

import DefaultCard from '../../commonComponents/defaultCard';
import ResultForHeading from "../../commonComponents/resultForHeading";
import EventListingFilters from '../eventListingFilters';
import Loader from "../../commonComponents/loader";
import Heading from '../../commonComponents/heading';

//redux
import {
    getAllEvents,
    setAllEventsNull,
    getDateFilterEvents,
    getCityFilterEvents
} from '../../redux/event/event-actions';
import {getWishListIdsFromApi, wishListToggle} from '../../redux/wishlist/wishlist-actions';
// Helpers
import {getCardDates, getMaxAndMinPrice, getObjectValue} from '../../utils/common-utils';

let searchParams = ['eventTitle'];

let isWishlist = false;

class EventListing extends Component {

    state = {
        allEvents: [],
        searchedEvent: [],
        // searchStr: this.props.location.search.substring(1, this.props.location.search.length),
        title: '',
        activeModal: ''
    };

    // constructor(props) {
    //     super(props);
    //     this.state = {
    //
    //     }
    // }


    componentDidMount() {
        // document.title = "Ticket Lake - Events";
        if (this.props.wishLists === null && this.props.auth) {
            this.props.getWishListIdsFromApi();
        }
        this.props.getAllEvents(() => {
        }, 'true', '1', '12', '');

        // this.handleSearchClick(this.state.searchStr);
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.allEvents !== nextProps.allEvents) {
            this.setState({allEvents: nextProps.allEvents}, function () {
            })
        }

    }

    sharingSocial = (id) => {
        if (id) {
            this.setState({activeModal: id});
        } else {

            this.setState({activeModal: ''});
        }
    };

    loadMoreEvents = (e) => {

        e.preventDefault();
        if (this.props.search === true) {
            let search = true;
            let firstPaginate = false;
            if (this.props.paginateEvents.hasNextPage === true) {
                if (this.props.paginateEvents.page) {
                    this.props.paginateEvents.page = this.props.paginateEvents.page + 1
                }
            }
            this.props.getAllEvents(() => {
            }, 'true', this.props.paginateEvents.page, '12', this.props.categories, '', '', search, firstPaginate);
        }
        else if (this.props.dateTimeSearch === true) {
            let dateTimeSearch = true;
            let firstPaginate = false;
            if (this.props.paginateEvents.hasNextPage === true) {
                if (this.props.paginateEvents.page) {
                    this.props.paginateEvents.page = this.props.paginateEvents.page + 1
                }
            }
            this.props.getDateFilterEvents('true', this.props.paginateEvents.page, '12', this.props.from, this.props.to, dateTimeSearch, firstPaginate,
                this.props.categories, this.props.city)
        }
        else if (this.props.citySearch === true) {
            let citySearch = true;
            let firstPaginate = false;
            if (this.props.paginateEvents.hasNextPage === true) {
                if (this.props.paginateEvents.page) {
                    this.props.paginateEvents.page = this.props.paginateEvents.page + 1
                }
            }
            this.props.getCityFilterEvents('true', this.props.paginateEvents.page, '12', this.props.city, citySearch, firstPaginate,
                this.props.from, this.props.to, this.props.categories)

        }
        else {
            if (this.props.paginateEvents.hasNextPage === true) {
                if (this.props.paginateEvents.page) {
                    this.props.paginateEvents.page = this.props.paginateEvents.page + 1
                }
            }
            this.props.getAllEvents(() => {
                }, 'true', this.props.paginateEvents.page, '12', this.props.categories,
                this.props.from, this.props.to, '', '', '', this.props.city);
        }
    };

    handleSearchClick = (searchStr) => {
        if (!this.props.allEvents) return null;
        const events = [...this.props.allEvents];

        if (searchStr === null) {
            this.setState({searchedEvent: events});
        } else {
            // this.setState({searchedEvent: this.props.location.search.substring(1, this.props.location.search.length)});
            let filteredEvents = [];
            events.forEach(work => {

                for (let index = 0; index < searchParams.length; index++) {
                    let param = searchParams[index];

                    const _val = getObjectValue(work, param);

                    let isNumber = typeof (_val) === 'number';
                    let isString = typeof (_val) === 'string';

                    let isNumberIndex = _val && isNumber && _val.toString().toLowerCase().indexOf(searchStr.toLowerCase()) > -1;
                    let isStringIndex = _val && isString && _val.toLowerCase().indexOf(searchStr.toLowerCase()) > -1;

                    if (isNumberIndex || isStringIndex) {
                        filteredEvents.push(work);
                        break;
                    }
                }
            });


            this.setState({searchedEvent: filteredEvents, title: searchStr});
            this.props.history.push({
                pathname: '/events/listing'
            })

        }
    };

    wishListToggle = (eventSlotId) => {
        if (this.props.auth) {
            this.props.wishListToggle(eventSlotId);
        }
    };

    render() {

        let {allEvents} = this.state;
        // allEvents = this.state.searchedEvent.length > 0 ? this.state.searchedEvent : allEvents;
        let shareUrl = 'http://google.com/';
        const cardDisplayJSX = Array.isArray(allEvents) && allEvents.map((data, i) => {
            shareUrl = window.location.protocol + '//' + window.location.host + '/event/detail/' + data.eventSlotId;
            if (this.props.auth) {
                isWishlist = this.props.wishLists && this.props.wishLists !== '' && this.props.wishLists.includes(data.eventSlotId);
            }
            return (
                <>
                    <DefaultCard key={i}
                                 gridLg={3}
                                 gridMd={6}
                                 gridSm={12}
                                 auth={this.props.auth}
                                 cardTitle={data.eventTitle}
                                 image={data.bannerImageKey.imageUrl}
                                 cardLink={'#'}
                                 dates={getCardDates(data.eventDateTimeSlot)}
                                 isWishList={isWishlist}
                                 wishlistLink={() => this.wishListToggle(data.eventSlotId)}
                                 cardAddress={data.venue ? data.venue.address : ''}
                                 country={data.venue ? data.venue.country : []}
                                 venueName={data.venue && data.venue.name}
                                 city={data.venue ? data.venue.city : []}
                                 onClick={() => this.props.history.push(`/event/detail/${data.eventSlotId}`)}
                                 buttonText={getMaxAndMinPrice(data)}
                                 buttonLink={`/buy-ticket/${data.eventSlotId}`}
                                 sharing={this.sharingSocial}
                                 description={data.parentEventInfo && data.parentEventInfo.description}
                                 id={data._id}
                    />

                    <Modal isOpen={this.state.activeModal === data._id} toggle={this.sharingSocial}
                           className={this.props.className}>
                        <ModalHeader toggle={this.sharingSocial}>{data.eventTitle}</ModalHeader>
                        <ModalBody>
                            <h4>Share this event on:</h4>
                            <row className={"social-icons-wrp"}>
                                    <FacebookShareButton
                                        url={shareUrl}
                                        quote={data.eventTitle}
                                        className="Demo__some-network__share-button">
                                        <FacebookIcon
                                            size={40}
                                            round/>
                                    </FacebookShareButton>
                                    <TwitterShareButton
                                        url={shareUrl}
                                        title={data.eventTitle}
                                        className="Demo__some-network__share-button">
                                        <TwitterIcon
                                            size={40}
                                            round/>
                                    </TwitterShareButton>
                            </row>
                        </ModalBody>
                        {/*<ModalFooter>*/}
                        {/*<Button color="secondary" onClick={this.sharingSocial}>Cancel</Button>*/}
                        {/*</ModalFooter>*/}
                    </Modal>

                </>
            )
        });
        return (

            <div id="wrapper" key={2}>
                <div className="content">

                    <section id="sec2" style={{paddingTop: '30px', paddingBottom: '10px'}} className={"light-red-bg"}>
                        <div style={{width: '88%', paddingLeft: '5%'}}>
                            <Heading
                                style={{marginBottom: '0px', textAlign: 'left'}}
                                heading={"All Events"}
                                text={"Explore some of the best tips from around the city from our partners and friends!"}/>
                        </div>
                    </section>

                    <section className="light-red-bg small-padding" id="sec1" style={{paddingTop: '0px'}}>
                        <div className="container">
                            <div className="row">

                                <div className="col-md-12">

                                    <EventListingFilters onSearch={(value) => this.handleSearchClick(value)}/>
                                    {
                                        (!this.props.processing) ?
                                            (
                                                <div className="col-list-wrap fw-col-list-wrap">

                                                    <div className="list-main-wrap fl-wrap card-listing">
                                                        <ResultForHeading
                                                            firstText={'Results For'}
                                                            secondText={this.state.title || 'All'}
                                                        />

                                                        {allEvents ?
                                                            <Row>
                                                                {cardDisplayJSX}
                                                            </Row>
                                                            :
                                                            'no data'
                                                        }
                                                        {/* {this.state.searchedEvent?
                                                        'data foond'
                                                        :
                                                        'no data'
                                                    } */}

                                                        {
                                                            this.props.allEvents.length > 0 ?
                                                                this.props.paginateEvents.hasNextPage === true ?
                                                                    <a className="load-more-button" href="#"
                                                                       onClick={(e) => this.loadMoreEvents(e)}>Load
                                                                        more
                                                                        {this.props.paginationProcessing ? (
                                                                            <i className="fas fa-spinner"/>) : null}
                                                                    </a> : null :
                                                                <div>No Events</div>
                                                        }

                                                    </div>

                                                </div>
                                            ) :
                                            (
                                                <Loader/>
                                            )
                                    }
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </div>

        )
    };
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
        categories: state.event.categories,
        paginateEvents: state.event.paginateEvents,
        processing: state.event.processing,
        auth: state.user.authenticated,
        wishLists: state.wishlist.wishListIds,
        paginationProcessing: state.event.paginationProcessing,
    }
};


const connectedComponent = connect(mapStateToProps, {
    getAllEvents,
    getWishListIdsFromApi,
    setAllEventsNull,
    wishListToggle,
    getDateFilterEvents,
    getCityFilterEvents
})(EventListing);
export default withRouter(connectedComponent);
