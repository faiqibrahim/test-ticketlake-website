// Library
import React, {Component} from 'react';
import _ from 'lodash';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import {NavLink} from 'react-router-dom';
import {Breadcrumbs, BreadcrumbsItem} from 'react-breadcrumbs-dynamic';
import {Modal, ModalHeader, ModalBody} from 'reactstrap';
import Gallery from 'react-grid-gallery';
import {
    FacebookShareButton,
    EmailShareButton,
    FacebookIcon,
    EmailIcon
} from 'react-share';
// Component

import CardComponent from '../../commonComponents/cardComponent';
import Loader from "../../commonComponents/loader/";
import EventDetailSlider from '../eventDetailSlider';
import SuggestedEventSlider from '../suggestedEventSlider';
import {getWishListIdsFromApi, wishListToggle} from "../../redux/wishlist/wishlist-actions";
import MapContainer from '../../commonComponents/googleMapComponent';
// Error
import Error from '../../commonComponents/error';
import EventMessage from '../../commonComponents/eventMessage';

//redux
import {getEventDetail, getAllEventsDefault} from '../../redux/event/event-actions';
//config
import {STANDARD_EVENT, SERIES, RECUR} from "../../utils/config";
// Helper
import {getDateFromISO, getTimeFromISO, dateSplitter} from '../../utils/common-utils';
import {valueAlreadyExists, dateAlreadyExists, getTags} from './detailPageHelper';
import {Helmet} from "react-helmet";

let isWishlist = false;
let shareUrl = 'http://google.com/';

let dateTimeArray = [];
let eventsArray = [];

class EventDetail extends Component {

    state = {
        labelArray: [],
        click: false,
        date: '',
        time: '',
        activeModal: '',
        timeArray: []
    };

    componentDidUpdate(prevProps) {
        const eventId = this.props.match.params.id;
        if (this.props.singleEventDetail) {
            let slotId = this.props.singleEventDetail.eventSlotId;
            if (slotId !== eventId) {
                if(prevProps.match.params.id !== eventId){
                    this.setState({timeArray: []},() =>{
                        this.props.getEventDetail(eventId);
                        if (this.props.auth) {
                            this.props.getWishListIdsFromApi();
                        }
                    })
                }
            }
        }
    }

    componentDidMount() {
        const eventId = this.props.match.params.id;
        this.props.getEventDetail(eventId);
        if (this.props.auth) {
            this.props.getWishListIdsFromApi();
        }
    }

    componentWillMount() {
        const eventId = this.props.match.params.id;
        this.props.getEventDetail(eventId);
        if (this.props.auth) {
            this.props.getWishListIdsFromApi();
        }
    }

    sharingSocial = (id) => {
        if (id) {
            this.setState({activeModal: id});
        } else {
            this.setState({activeModal: ''});
        }
    };

    pageTitle = () => {
        return (
            <Helmet>
                <title>Event Detail</title>
            </Helmet>
        )
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.singleEventDetail && nextProps.singleEventDetail.sections) {
            if (this.state.labelArray !== nextProps.singleEventDetail.sections) {
                this.setState({
                    labelArray: this.getGroupBySections(nextProps.singleEventDetail.sections, true),
                    date: getDateFromISO(nextProps.singleEventDetail.eventDateTimeSlot.eventStartTime),
                    time: getTimeFromISO(nextProps.singleEventDetail.eventDateTimeSlot.eventStartTime),
                })
            }
        }
    }



    getRelatedEvents = (relatedEvents, id) => {
        const filteredEvents = relatedEvents.filter(event=>event._id !== id);
        if(!filteredEvents.length) return null;
        return (
            <EventDetailSlider heading={"Related Events"}
                               text={"Explore Some More Events related to this Category"}
                               cards={filteredEvents}
                               key={id}
            />
        )

    };

    getSimilarEvents = (eventsArray, id, category) => {
        const events = eventsArray.filter(event=>event.eventSlotId !== id);
        if(!events.length) return null;
        return(
            <SuggestedEventSlider heading={"Similar Events"}
                                  text={"Explore Some More Events From Different Categories"}
                                  cards={events}
                                  key = {id}
            />
            )

    };

    getGroupBySections = (sections, label) => {

        if (label) {
            let uniqueIDs = [];
            if (typeof sections !== 'undefined') {
                for (let i = 0; i < sections.length; i++) {
                    if (!valueAlreadyExists(uniqueIDs, sections[i])) {
                        uniqueIDs.push(sections[i].sectionId);
                    }
                }
            }

            let list = [];
            for (let i = 0; i < uniqueIDs.length; i++) {
                let dataList = [];
                let label = '';
                if (typeof sections !== 'undefined') {
                    for (let j = 0; j < sections.length; j++) {
                        if (uniqueIDs[i] === sections[j].sectionId) {
                            if (label === '') {
                                label = sections[j].sectionLabel
                            }
                            dataList.push({
                                data: sections[j]
                            })
                        }
                    }

                }

                list.push({
                    label: label,
                    data: dataList
                });
            }
            return list;
        } else {
            let uniqueIDs = [];
            if (typeof sections !== 'undefined') {
                for (let i = 0; i < sections.length; i++) {
                    if (!valueAlreadyExists(uniqueIDs, sections[i])) {
                        uniqueIDs.push(sections[i].sectionId);
                    }
                }
            }

            let list = [];

            for (let i = 0; i < uniqueIDs.length; i++) {
                let dataList = [];
                let label = '';
                if (typeof sections !== 'undefined') {
                    for (let j = 0; j < sections.length; j++) {
                        if (uniqueIDs[i] === sections[j].sectionId) {
                            if (label === '') {
                                label = sections[j].sectionLabel
                            }
                            dataList.push({
                                data: sections[j]
                            })
                        }
                    }
                }

                list.push({
                    label: label,
                    data: dataList
                });
            }

            return (
                <div>
                    {
                        list.map(data => {
                            return (
                                <div className="list-single-main-item fl-wrap pl-40 custom-section" id="sec3">
                                    <div className="list-single-main-item-title fl-wrap"
                                         style={{marginBottom: '30px', padding: '0px 0px 10px 0px'}}>
                                        <h3 style={{textTransform: 'capitalize', fontSize: '22px'}}>{data.label}</h3>
                                    </div>
                                    <div className="listing-features fl-wrap">
                                        {
                                            data.data.map(card => {
                                                return (
                                                    <div className={'col-md-6 float-left column-padding'}>
                                                        <CardComponent {...card}/>
                                                    </div>
                                                )
                                            })
                                        }
                                    </div>

                                </div>
                            )
                        })
                    }
                </div>
            )
        }
    };

    getUniqueDates = (dataArray) => { 
        let uniqueDates = [];
        if (typeof dataArray !== 'undefined') {
            for (let i = 0; i < dataArray.length; i++) {
                if (!dateAlreadyExists(uniqueDates, dataArray[i])) {
                    uniqueDates.push(dateSplitter(dataArray[i].eventDateTimeSlot.eventStartTime));
                }
            }
        }
        return uniqueDates;
    };

    onDateChange = (e) => {
        let {target} = e;
        let state = {...this.state};
        state[target.name] = target.value;
        this.setState({...state});
    };


    getDateTime = (date, time, dateList, timeList) => {

        let dateTimeArray = [];
        let timeArray = [];

        timeArray.push({
            time: time,
            click: false
        });

        _.forEach(timeList, (item) => {
            timeArray.push({
                time: item,
                click: false
            });
        });

        dateTimeArray.push({
            date: date,
            time: _.sortBy(timeArray, (o) => o.time),
        });

        for (let i = 0; i < dateList && dateList.length; i++) {
            dateTimeArray.push({
                date: getDateFromISO(dateList[i]),
                time: timeArray,
            });
        }
        return dateTimeArray;
    };

    getTimeArray = (dateTimeArray, date, time) => {
        let timeArrayForSpecificDate = [];
        if (typeof dateTimeArray !== 'undefined') {
            for (let i = 0; i < dateTimeArray.length; i++) {
                if (date && date === dateTimeArray[i].date) {
                    for (let j = 0; j < dateTimeArray[i].time.length; j++) {

                        timeArrayForSpecificDate.push(dateTimeArray[i].time[j]);

                        if (time && time === dateTimeArray[i].time[j].time) {
                            dateTimeArray[i].time[j].click = true
                        }
                    }

                }
            }
        }

        if (this.state.timeArray.length === 0) {
            this.setState({timeArray: _.uniqBy(timeArrayForSpecificDate, 'time')})
        }
    };

    getTimeForDate = (array, date) => {
        let timeForDate = [];
        if (typeof array !== 'undefined') {
            for (let i = 0; i < array.length; i++) {
                let dateInArray = dateSplitter(array[i].eventDateTimeSlot.eventStartTime);
                if (date && date === dateInArray) {
                    timeForDate.push(getTimeFromISO(array[i].eventDateTimeSlot.eventStartTime))
                }
            }
        }
        return timeForDate
    };


    getImages = () => {
        const event = this.props.singleEventDetail;
        const arrangeImages = [];
        if (event) {
            _.forEach(event.eventImagesKeys && event.eventImagesKeys, (item) => {
                if (item) {
                    if (item.hasOwnProperty("imageUrl")) {
                        arrangeImages.push({
                            src: item.imageUrl ? item.imageUrl : '',
                            thumbnail: item.imageUrl ? item.imageUrl : '',
                            caption: event.eventTitle ? event.eventTitle : '',
                            tags: getTags(event.parentEventInfo && event.parentEventInfo.tags)
                        });
                    }
                }
            });
        }

        return arrangeImages;
    };

    getForm = () => {
        const wishListToggle = (eventSlotId, isRemove = false) => {
            if (this.props.auth) {
                this.props.wishListToggle(eventSlotId, false, isRemove);
            }
        };

        if (!this.props.processing && this.props.singleEventDetail) {

            let data = this.props.singleEventDetail;
            const {parentEventInfo} =  data;
            let eventStartTime = data && data.eventDateTimeSlot ? data.eventDateTimeSlot.eventStartTime : ' ';
            const {venue} = this.props.singleEventDetail;
            shareUrl = window.location.protocol + '//' + window.location.host + '/event/detail/' + data.eventSlotId;

            let uniqueDatesForDropDown = [];

            const events = this.props.categorizedEvents;
            if(events){
                const {allEvents} = events;
                eventsArray = [...allEvents];
            }

            let uniqueDates = this.getUniqueDates(data.relatedEvents);

            for (let i = 0; i < uniqueDates.length; i++) {
                if (uniqueDates[i] !== dateSplitter(eventStartTime)) {
                    uniqueDatesForDropDown.push(uniqueDates[i])
                }
            }

            let timeForDate = this.getTimeForDate(data && data.relatedEvents, dateSplitter(eventStartTime));

            dateTimeArray = this.getDateTime(getDateFromISO(eventStartTime),
                getTimeFromISO(eventStartTime),
                uniqueDatesForDropDown, timeForDate);

            this.getTimeArray(dateTimeArray, getDateFromISO(eventStartTime), getTimeFromISO(eventStartTime));

            // document.title = "Ticket Lake - Event - " + data.eventTitle;
            let bannerImage = data.bannerImageKey && data.bannerImageKey.imageUrl ? data.bannerImageKey.imageUrl : window.location.origin + '/images/banner_1.png';

            if (this.props.auth) {
                isWishlist = this.props.wishLists && this.props.wishLists !== '' && this.props.wishLists.includes(data.eventSlotId);
            }
            
            const hrefLink = "#"; 
            
            return (
                <>
                    <Modal isOpen={this.state.activeModal === data._id} toggle={this.sharingSocial}
                           className={this.props.className}>
                        <ModalHeader toggle={this.sharingSocial}>{data.eventTitle}</ModalHeader>
                        <ModalBody>
                            <h4>Share this event on:</h4>
                            <row className={"social-icons-wrp"}>
                                    <FacebookShareButton
                                        url={shareUrl}
                                        quote={data.eventTitle}
                                        className="Demo__some-network__share-button custom-share-button">
                                        <FacebookIcon
                                            size={40}
                                            round/>
                                    </FacebookShareButton>
                                    <EmailShareButton
                                        url={shareUrl}
                                        title={data.eventTitle}
                                        className="Demo__some-network__share-button">
                                        <EmailIcon
                                            size={40}
                                            round/>
                                    </EmailShareButton>
                            </row>
                        </ModalBody>
                    </Modal>

                    <div id="wrapper">
                        <div className="content">
                            {this.pageTitle()}
                            <section className="list-single-hero" data-scrollax-parent="true" id="sec1">
                                <div className="bg par-elem" style={{
                                    float: 'left',
                                    backgroundImage: "url('" + bannerImage + "')",
                                    translateY: '30%'
                                }}/>
                                <div className="list-single-hero-title fl-wrap">
                                    <div className="container custom-container">
                                        <div className="row">
                                            <div className="col-md-12">
                                                <div className="listing-rating-wrap">
                                                    <div className="listing-rating card-popup-rainingvis"
                                                         data-starrating2={5}/>
                                                </div>
                                                <h2 style={{marginBottom:'0'}}>
                                                    <span>{data.eventTitle ? data.eventTitle : 'Event Title'}</span>
                                                </h2>
                                                <p style={{textAlign:'left', color:'#ffffff', paddingBottom:'0px'}}>
                                                    {
                                                    (this.props.singleEventDetail !== null) && (this.props.singleEventDetail.categories.length > 0) ?
                                                        this.props.singleEventDetail.categories && this.props.singleEventDetail.categories.map((category, i) => {
                                                        return (
                                                            <span className={"category-title"} key={i}>
                                                                {category.title}{i === this.props.singleEventDetail.categories.length - 1 ? " " : i === this.props.singleEventDetail.categories.length - 2 ? " & " : ", "}
                                                            </span>
                                                        )
                                                    })
                                                    : null
                                                    }
                                                </p>
                                                <div className="custom-border-bottom"/>
                                                {/*<span className={"sub-heading"}/>*/}

                                                <div className="list-single-header-contacts detailImagesIcons fl-wrap">
                                                    <ul>
                                                        {data.parentEventInfo && data.parentEventInfo.contactPersonInfo.phoneNumber[0] !== "" ?
                                                            <li>
                                                                <img className={"img-responsive"}
                                                                     src={window.location.origin + '/images/icons/call.svg'}
                                                                     alt="img"/>
                                                                <a href={hrefLink}>{data.parentEventInfo ? data.parentEventInfo.contactPersonInfo.phoneNumber[0] : 'Organizer Name'}</a>
                                                            </li>
                                                            : null
                                                        }
                                                        <li><img className={"img-responsive"}
                                                                 src={window.location.origin + '/images/icons/email.svg'}
                                                                 alt="img"/><a href={hrefLink}>{data.parentEventInfo ? data.parentEventInfo.contactPersonInfo.email : 'Email'}</a>
                                                        </li>
                                                        <li><img className={"img-responsive"}
                                                                 src={window.location.origin + '/images/icons/adress.svg'}
                                                                 alt="img"/>
                                                            <a href={hrefLink}>{data.venue ? data.venue.address : 'Address'}</a>
                                                        </li>

                                                    </ul>
                                                    <div className={"Banner-social-links"}>
                                                        {(this.props.auth) ? (
                                                            (isWishlist === true) ?
                                                                (
                                                                    <span className={"social-icon"}
                                                                          onClick={() => wishListToggle(data.eventSlotId, true)}
                                                                    >
                                                                        <i className="fas fa-heart"></i>
                                                                    </span>

                                                                ) :
                                                                (
                                                                    <span className={"social-icon"}
                                                                          onClick={() => wishListToggle(data.eventSlotId)}
                                                                    >
                                                                         <i className="far fa-heart"></i>
                                                                    </span>

                                                                )
                                                        ) : null}

                                                        <span className={"social-icon"}
                                                              onClick={() => this.sharingSocial(data._id)}
                                                        >
                                                                       <i className="fas fa-share-alt"></i>
                                                                    </span>


                                                    </div>

                                                </div>
                                            </div>
                                        </div>

                                        <BreadcrumbsItem glyph='home' to='/'>Home Page</BreadcrumbsItem>
                                        <BreadcrumbsItem to='/events/listing'>All Events</BreadcrumbsItem>
                                        <BreadcrumbsItem to={'/event/detail/' + this.props.match.params.id}>
                                            Event Detail
                                        </BreadcrumbsItem>

                                        <div className="breadcrumbs-hero-buttom fl-wrap">
                                            <div className="breadcrumbs">
                                                <Breadcrumbs
                                                    item={NavLink}
                                                    finalItem={'span'}
                                                    finalProps={{
                                                        style: {color: '#EC1C24'}
                                                    }}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </section>

                            <section className="grey-blue-bg small-padding scroll-nav-container" id="sec2">
                                <div className="scroll-nav-wrapper fl-wrap">
                                    <div className="hidden-map-container fl-wrap">
                                        <input id="pac-input" className="controls fl-wrap controls-mapwn" type="text"
                                               placeholder="What Nearby ?   Bar , Gym , Restaurant "/>
                                        <div className="map-container">
                                            <div id="singleMap" data-latitude="40.7427837"
                                                 data-longitude="-73.11445617675781"/>
                                        </div>
                                    </div>
                                    <div className="clearfix"/>
                                    <div className="container custom-container">
                                        <nav className="scroll-nav scroll-init">
                                            <ul className={'ulEventDetail'}>
                                                <li><a className="act-scrlink" href={hrefLink}>Overview</a></li>
                                                <li><a className="act-scrlink non-active" href={hrefLink}>Speakers</a></li>
                                                <li><a className="act-scrlink non-active" href={hrefLink}>Guests</a></li>
                                                <li><a className="act-scrlink non-active" href={hrefLink}>Contact</a></li>
                                                <li><a className="act-scrlink non-active" href={hrefLink}>Policy</a></li>
                                            </ul>
                                        </nav>
                                    </div>
                                </div>

                                <div className="container custom-container">
                                    <div className="row">
                                        <div className="col-lg-8 col-md-12 col-sm-12">
                                            <div className="list-single-main-container " style={{paddingLeft: "0px"}}>
                                                <div className="list-single-main-item fl-wrap">
                                                    <div className="row small-display-table">
                                                        <div className={"col-md-10"}>
                                                            <div className="list-single-main-item-title fl-wrap">
                                                                <div className="row mb-10">
                                                                    <div className='col-md-12'>
                                                                        <div className="row">
                                                                            <div
                                                                                className={"detail-icon"}>
                                                                                <img style={{width: '80%'}} alt='img'
                                                                                     src={window.location.origin + '/images/icons/date-red.svg'}/>
                                                                            </div>
                                                                            <div className={"detail-content"}
                                                                                 style={{
                                                                                     paddingLeft: '8px'
                                                                                 }}>
                                                                                <p style={{
                                                                                    fontSize: '14px',
                                                                                    marginBottom: 0,
                                                                                    paddingBottom: 2
                                                                                }}>Date
                                                                                    - {data.eventDateTimeSlot ? getDateFromISO(data.eventDateTimeSlot.eventStartTime) : '-'}</p>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="row mb-10">
                                                                    <div className='col-md-12'>
                                                                        <div className="row">
                                                                            <div
                                                                                className={"detail-icon"}>
                                                                                <img style={{width: '80%'}} alt='img'
                                                                                     src={window.location.origin + '/images/icons/time-red.svg'}/>
                                                                            </div>
                                                                            <div className={"detail-content"}
                                                                                 style={{
                                                                                     paddingLeft: '8px'
                                                                                 }}>
                                                                                <p style={{
                                                                                    fontSize: '14px',
                                                                                    marginBottom: 0,
                                                                                    paddingBottom: 2
                                                                                }}>Time
                                                                                    - {data.eventDateTimeSlot ? getTimeFromISO(data.eventDateTimeSlot.eventStartTime) : 'Time'}</p>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>

                                                                <div className="row mb-10">
                                                                    <div className='col-md-12'>
                                                                        <div className="row">
                                                                            <div
                                                                                className={"detail-icon"}>
                                                                                <img style={{width: '80%'}} alt='img'
                                                                                     src={window.location.origin + '/images/icons/location-red.svg'}/>
                                                                            </div>
                                                                            <div className={"detail-content"}
                                                                                 style={{
                                                                                     paddingLeft: '8px'
                                                                                 }}>
                                                                                <p style={{
                                                                                    fontSize: '14px',
                                                                                    marginBottom: 0,
                                                                                    paddingBottom: 2
                                                                                }}>Venue
                                                                                    - {data.venue ? data.venue.address : 'Address'}</p>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="row mb-10">
                                                                    <div className='col-md-12'>
                                                                        <div className="row">
                                                                            <div
                                                                                className={"detail-icon"}>
                                                                                <img style={{width: '80%'}} alt='img'
                                                                                     src={window.location.origin + '/images/icons/refund-red.svg'}/>
                                                                            </div>
                                                                            <div className={"detail-content"}
                                                                                 style={{
                                                                                     paddingLeft: '8px'
                                                                                 }}>
                                                                                <p style={{
                                                                                    fontSize: '14px',
                                                                                    marginBottom: 0,
                                                                                    paddingBottom: 2
                                                                                }}>Non-Refundable</p>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className={"col-md-2"} style={{padding: '0px'}}>
                                                            <div
                                                                style={{width: 'auto'}}>
                                                                {(this.props.auth) ? (
                                                                    (isWishlist === true) ?
                                                                        (
                                                                            <img
                                                                                src={'/images/fav-selected.svg'}
                                                                                onClick={() => wishListToggle(data.eventSlotId, true)}
                                                                                className={"heart-icon"}
                                                                                alt={"img"}
                                                                                style={{
                                                                                    width: '36px',
                                                                                    float: 'right',
                                                                                    cursor: "pointer"
                                                                                }}/>
                                                                        ) :
                                                                        (
                                                                            <img src={'/images/fav.svg'}
                                                                                 onClick={() => wishListToggle(data.eventSlotId)}
                                                                                 className={"heart-icon"}
                                                                                 alt={"img"}
                                                                                 style={{
                                                                                     width: '36px',
                                                                                     float: 'right',
                                                                                     cursor: "pointer"
                                                                                 }}/>
                                                                        )
                                                                ) : null}

                                                                <img src={'/images/share.svg'}
                                                                     onClick={() => this.sharingSocial(data._id)}
                                                                     alt={"img"}
                                                                     style={{
                                                                         width: '36px',
                                                                         float: 'right',
                                                                         marginRight: '10px',
                                                                         cursor: "pointer"
                                                                     }}/>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <p className="description"
                                                       style={{
                                                           marginBottom: "initial",
                                                           fontSize: '14px'
                                                       }}>{data.parentEventInfo ? data.parentEventInfo.description : "Description"}</p>
                                                </div>
                                                <div className={"Gallery-section"} id={"gallery"}>
                                                    <Gallery
                                                        images={this.getImages()}
                                                        enableImageSelection={false}
                                                    />
                                                </div>
                                                <div className={"agenda-section"} id={"agenda"}>
                                                    {
                                                        data.agenda ?
                                                            <div className="list-single-main-item fl-wrap pl-40"
                                                                 style={{marginTop: '20px'}}>
                                                                <div className="row">
                                                                    <div className="col-md-12">
                                                                        <div className="box-widget-item-header">
                                                                            <h3> Agenda </h3>
                                                                        </div>
                                                                        <p style={{fontSize: '14px'}}>{data.agenda ? data.agenda : "Agenda"}</p>
                                                                    </div>
                                                                </div>
                                                            </div> : <EventMessage/>
                                                    }
                                                </div>

                                                {
                                                    this.getGroupBySections(data.sections && data.sections, false)

                                                }
                                            </div>
                                        </div>

                                        <div className="col-lg-4 col-md-12 col-sm-12">
                                            <div className="box-widget-wrap">
                                                <div className={'box-widget'} style={{marginBottom: '30px'}}>
                                                    <div className={'box-widget-content'}>
                                                        <div className="box-widget-item-header">
                                                            <h3>Purchase Tickets</h3>
                                                        </div>
                                                        {
                                                            data.parentEventInfo && data.parentEventInfo.eventType === `${RECUR}` && uniqueDatesForDropDown.length ?

                                                                <>
                                                                    <div className="cal-item">
                                                                        <div
                                                                            className="col-list-search-input-item ">
                                                                            <label
                                                                                className={"newLabel"}>Date</label>
                                                                            <select data-placeholder="Date"
                                                                                    name="date"
                                                                                    onChange={(e) => this.onDateChange(e)}
                                                                                    disabled
                                                                                    className="chosen-select no-search-select date-select-dropDown dropDown-border">
                                                                                {
                                                                                    // uniqueDatesForDropDown && uniqueDatesForDropDown.map((date, index) => {
                                                                                    //     return (
                                                                                    //         <option
                                                                                    //             key={index}>{getDateFromISO(date)}</option>
                                                                                    //     )
                                                                                    // })
                                                                                    /**
                                                                                     * The other dates for the Recurring Event has been 
                                                                                     * disabled at the moment since each event is being displayed 
                                                                                     * itself. For future development replace the single 
                                                                                     * <option></option> tag below with the array above.  
                                                                                     */
                                                                                <option>{getDateFromISO(eventStartTime)}</option>
                                                                                }

                                                                            </select>
                                                                        </div>
                                                                    </div>

                                                                    <div className="cal-item">
                                                                        <div
                                                                            className="col-list-search-input-item ">
                                                                            <div className={"row"}>
                                                                                <div className={"col-md-12"}>
                                                                                    <label className={"newLabel"}>
                                                                                        Time Slot
                                                                                    </label>
                                                                                </div>
                                                                                <div className={"col-md-12"}>

                                                                                    <div className={"row"}>

                                                                                        {
                                                                                            this.state.timeArray && this.state.timeArray.map((timeArray, index) => {
                                                                                                return (
                                                                                                    <div
                                                                                                        key={index}
                                                                                                        className={"col-md-3 col-sm-4 col-lg-6 col-xl-3"}
                                                                                                        style={{marginTop: '8px'}}>

                                                                                                        {
                                                                                                            timeArray.click === true ?
                                                                                                                <span
                                                                                                                    className={"badge badge-light-click"}>
                                                                                                                    {timeArray.time}
                                                                                                                 </span> : null
                                                                                                        }

                                                                                                        {
                                                                                                            timeArray.click === false ?
                                                                                                                <span
                                                                                                                    className={"badge badge-light"}
                                                                                                                >
                                                                                                                    {timeArray.time}
                                                                                                                 </span> : null
                                                                                                        }


                                                                                                    </div>
                                                                                                )
                                                                                            })
                                                                                        }

                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>

                                                                    <NavLink
                                                                        to={`/buy-ticket/${data.eventSlotId}
                                                                        `}
                                                                        className="btn btn-danger buttonDefault defaultBackground"
                                                                        style={{
                                                                            width: '100%',
                                                                            textAlign: 'center'
                                                                        }}>
                                                                        {`${data.parentEventInfo.eventMaximumTicketClassPrice === 0 ? "Get Now" : "Buy Now"}`}
                                                                    </NavLink>
                                                                </>

                                                                :

                                                                <NavLink to={`/buy-ticket/${data.eventSlotId}`}
                                                                         className="btn btn-danger buttonDefault defaultBackground"
                                                                         style={{
                                                                             width: '100%',
                                                                             textAlign: 'center'
                                                                         }}>
                                                                    {`${data.parentEventInfo.eventMaximumTicketClassPrice === 0 ? "Get Now" : "Buy Now"}`}
                                                                </NavLink>

                                                        }
                                                    </div>
                                                </div>

                                                <div className="box-widget-item fl-wrap">
                                                    <div className="box-widget"
                                                         style={{minHeight: '510px'}}>
                                                        <div className="box-widget-content"
                                                             style={{
                                                                 minHeight: '450px',
                                                                 padding: '25px 22px 30px'
                                                             }}>
                                                            <MapContainer
                                                                latitude={venue && venue.latitude !== '' && typeof venue.latitude !== 'undefined' ? venue.latitude : -1.2342}
                                                                longitude={venue && venue.longitude !== '' && typeof venue.longitude !== 'undefined' ? venue.longitude : 38.2883}/>
                                                        </div>
                                                    </div>
                                                </div>


                                                < div className="box-widget-item fl-wrap">
                                                    <div className="box-widget">
                                                        <div className="box-widget-content">
                                                            <div className="box-widget-item-header">
                                                                <h3> Organizer Information</h3>
                                                            </div>
                                                            <div className="box-widget-list detailImagesIcons">
                                                                <ul>
                                                                    {data.parentEventInfo && data.parentEventInfo.contactPersonInfo.phoneNumber.length === 0 ? null :
                                                                        <li>
                                                                            <img
                                                                                src={window.location.origin + '/images/icons/call-red.svg'}
                                                                                alt="" style={{
                                                                                width: '6%',
                                                                                verticalAlign: 'bottom'
                                                                            }}/>
                                                                            <span
                                                                                className="contact-details-heading"
                                                                                style={{
                                                                                    color: '#363636',
                                                                                    float: 'unset'
                                                                                }}>Phone :</span>
                                                                            <a href={hrefLink}>{data.organization ? data.organization.phoneNumber
                                                                                : 'Organizer Phone Number'}
                                                                            </a>
                                                                        </li>
                                                                    }
                                                                    <li><img
                                                                        src={window.location.origin + '/images/icons/email-red.svg'}
                                                                        alt=""
                                                                        style={{
                                                                            width: '6%',
                                                                            verticalAlign: 'bottom'
                                                                        }}/>
                                                                        <span className="contact-details-heading"
                                                                              style={{
                                                                                  color: '#363636',
                                                                                  float: 'unset'
                                                                              }}>Email:</span>
                                                                        <a href={hrefLink}>{data.organization ? data.organization.email : 'Organizer Email'}</a>
                                                                    </li>
                                                                    <li>
                                                                        <img
                                                                            src={window.location.origin + '/images/icons/adress-red.svg'}
                                                                            alt="" style={{
                                                                            width: '6%',
                                                                            verticalAlign: 'bottom'
                                                                        }}/>
                                                                        <span className="contact-details-heading"
                                                                              style={{
                                                                                  color: '#363636',
                                                                                  float: 'unset'
                                                                              }}>Address:</span>

                                                                        <a href={hrefLink}>{data.organization ? data.organization.address &&
                                                                            `${ data.organization.address.city}, ${ data.organization.address.country}`
                                                                            : 'Address'}</a>
                                                                    </li>

                                                                </ul>
                                                            </div>
                                                            <div className="list-widget-social">
                                                                <ul>
                                                                    <li><a href="https://www.facebook.com/ticketlake/?modal=admin_todo_tour" target="_blank" rel="noopener noreferrer"><i
                                                                        className="fab fa-facebook-f"/></a></li>
                                                                    <li><a href="https://twitter.com/ticketlake" target="_blank" rel="noopener noreferrer"><i
                                                                        className="fab fa-twitter"/></a></li>
                                                                    <li><a href="https://www.instagram.com/ticketlake_official/" target="_blank" rel="noopener noreferrer"><i
                                                                        className="fab fa-instagram"/></a></li>
                                                                </ul>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {
                                    parentEventInfo && (parentEventInfo.eventType === `${SERIES}` || parentEventInfo.eventType === `${RECUR}`) ?
                                        data.relatedEvents && data.relatedEvents.length > 0 ?
                                            this.getRelatedEvents(data.relatedEvents, data._id) : null
                                        :
                                        parentEventInfo && parentEventInfo.eventType === `${STANDARD_EVENT}` && eventsArray && eventsArray.length > 0 ?
                                                this.getSimilarEvents(eventsArray, data.eventSlotId, data.categories) : null
                                }
                            </section>
                        </div>
                        <div className="limit-box fl-wrap"/>
                    </div>
                </>
            )
        }
        return null;
    };

    getLoader = () => {
        return null;
    };


    render() {
        if (this.props.processing) {
            return (

                <div id="wrapper">
                    <div className="content">
                        <Loader style={{marginBottom: "20%"}}/>
                    </div>
                </div>
            );
        } else {

            if (this.props.error) {
                return (
                    <Error/>
                )
            } else {
                return (
                    <>
                        {this.getForm()}
                    </>
                );
            }
        }
    }
}

const mapStateToProps = (state) => {
    return {
        singleEventDetail: state.event.singleEventDetail!==null?state.event.singleEventDetail.data.data:null,
        wishLists: state.wishlist.wishListIds,
        categorizedEvents: state.event.allEvents,
        processing: state.event.processing,
        auth: state.user.authenticated,
        error: state.event.error,
        errorMessage: state.event.errorMessage
    }
};
const connectedComponent = connect(mapStateToProps, {
    getEventDetail,
    wishListToggle,
    getWishListIdsFromApi,
    getAllEventsDefault
})(EventDetail);
export default withRouter(connectedComponent);