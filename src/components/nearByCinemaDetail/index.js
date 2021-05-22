import React, {Component} from 'react';
import Error from '../../commonComponents/error';
import Loader from "../../commonComponents/loader/";
import {NavLink, withRouter} from "react-router-dom";
import {Breadcrumbs, BreadcrumbsItem} from 'react-breadcrumbs-dynamic';
import CardWithSideDetail from '../../commonComponents/cardWithSideDetails';
import {connect} from "react-redux";
import {getDateFromISO, getDayFromISO, getMovieCategoryID} from "../../utils/common-utils";
import {
    showingInCinema,
    upcomingEventsForCinema,
    promotedEventsForCinema,
    trendingEventsForCinema,
    setProcessing,
    setCinemaData
} from '../../redux/movies/movie-action';
import CardWithBottomTitle from '../../commonComponents/cardWithBottomTitle';
import {getAllCategories} from '../../redux/category/category-actions';

let cinemaEvents = [];
let heading = 'Showing Now';
let cinemaId;
let cinemaData;

const styles = {
    mainDiv: {
        position: 'relative',
        margin: '0 auto',
        width: '78%'
    },
    innerDiv: {
        padding: '30px 0px 30px 0px',
        borderBottom: '1px solid #f2f2f2'
    },
    icon1: {
        width: '40px',
        height: '40px',
        padding: '10px',
        background: '#F2F3F8',
        borderTopLeftRadius: '6px',
        borderBottomLeftRadius: '6px',
        cursor: 'pointer'
    },
    activeIcon1: {
        width: '40px',
        height: '40px',
        padding: '10px',
        background: '#EC1C24',
        borderTopLeftRadius: '6px',
        borderBottomLeftRadius: '6px',
        cursor: 'pointer'
    },
    icon2: {
        width: '40px',
        height: '40px',
        padding: '10px',
        background: '#F2F3F8',
        borderTopRightRadius: '6px',
        borderBottomRightRadius: '6px',
        cursor: 'pointer'
    },
    activeIcon2: {
        width: '40px',
        height: '40px',
        padding: '10px',
        background: '#EC1C24',
        borderTopRightRadius: '6px',
        borderBottomRightRadius: '6px',
        cursor: 'pointer'
    }
};

class NearByCinemaDetail extends Component {

    state = {
        selectedDate: '',
        activeTab: 1,
        listView: true,
        activeView: 'list',
        categories: [],
        movieCategoryID: ''
    };

    componentDidMount() {
        cinemaId = this.props.match.params.id;
        cinemaData = this.props.location.data;
        this.props.setProcessing(true);
        if (cinemaData !== undefined){
            this.props.setCinemaData(cinemaData);
        }
        this.props.getAllCategories((categories) => {
            sessionStorage.setItem('categories', JSON.stringify(categories));
            this.setState({
                categories
            });
            if (this.state.categories && this.state.categories.length > 0) {
                let movieCategoryID = getMovieCategoryID(this.state.categories);
                this.setState({movieCategoryID})
            }
            this.props.showingInCinema(this.state.movieCategoryID, cinemaId);
            this.props.setProcessing(false);
        }, 'v2');
    }

    getBreadCrumbs = () => {
        return (
            <>
                <BreadcrumbsItem glyph='home' to='/'>Home Page</BreadcrumbsItem>
                <BreadcrumbsItem to='/events/nearby-cinemas'>Cinemas</BreadcrumbsItem>
                <BreadcrumbsItem to={'/event/nearby-cinemas/' + this.props.match.params.id}>
                    Cinema Detail
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
            </>
        )
    };

    onTabClick = (tabValue) => {
        this.setState({activeTab: tabValue});
        switch (tabValue) {
            case 1:
                this.props.showingInCinema(this.state.movieCategoryID, cinemaId);
                break;
            case 2:
                this.props.trendingEventsForCinema(this.state.movieCategoryID, cinemaId);
                break;
            case 3:
                this.props.promotedEventsForCinema(this.state.movieCategoryID, cinemaId);
                break;
            case 4:
                this.props.upcomingEventsForCinema(this.state.movieCategoryID, cinemaId);
                break;
            default:
                this.props.showingInCinema(this.state.movieCategoryID, cinemaId);
                break;
        }
    };

    onCardViewClick = (listView, activeView) => {
        this.setState({listView: listView, activeView: activeView});
    };

    render() {
        const hrefVal = "#";

        switch (this.state.activeTab) {
            case 1:
                cinemaEvents = this.props.showingInCinemaEventsInfo;
                heading = 'Showing Now';
                break;
            case 2:
                cinemaEvents = this.props.trendingEventsForCinemaInfo;
                heading = 'Trending';
                break;
            case 3:
                cinemaEvents = this.props.promotedEventsForCinemaInfo;
                heading = 'Promoted';
                break;
            case 4:
                cinemaEvents = this.props.upcomingEventsForCinemaInfo;
                heading = 'Upcoming';
                break;
            default:
                cinemaEvents = this.props.showingInCinemaEventsInfo;
                heading = 'Showing Now';
                break;
        }

        let locallySavedCinemaInfo = JSON.parse(localStorage.getItem('cinemaInfo'));

        if(cinemaData === undefined) {
            cinemaData = locallySavedCinemaInfo
        }

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
                    <div id="wrapper">
                        <div className="content">
                            <section className="list-single-hero" data-scrollax-parent="true" id="sec1">
                                <div className="bg par-elem" style={{
                                    float: 'left',
                                    backgroundImage: `url('${cinemaData && cinemaData.defaultImage}')`,
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
                                                <h2 style={{marginBottom: '0'}}>
                                                    <span>{cinemaData && cinemaData.name}</span>
                                                </h2>
                                                <p style={{
                                                    textAlign: 'left',
                                                    color: '#ffffff',
                                                    marginTop: '5%',
                                                    paddingBottom: '0px'
                                                }}>
                                                    {cinemaData && cinemaData.numberOfOnGoingEvents} Movies
                                                    , {cinemaData && cinemaData.address}
                                                </p>
                                            </div>
                                        </div>
                                        {this.getBreadCrumbs()}
                                    </div>
                                </div>
                            </section>

                            <section className="grey-blue-bg small-padding scroll-nav-container" id="sec2">
                                <div className="scroll-nav-wrapper background-gray fl-wrap">
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
                                            <ul className={'ulEventDetail background-white'}>
                                                <li>
                                                    <a className={this.state.activeTab === 1 ? "active-detail-li" : "detail-li"}
                                                       onClick={() => this.onTabClick(1)}
                                                       href={hrefVal}>Showing</a>
                                                </li>
                                                <li>
                                                    <a className={this.state.activeTab === 2 ? "active-detail-li" : "detail-li"}
                                                       onClick={() => this.onTabClick(2)}
                                                       href={hrefVal}>Trending</a>
                                                </li>
                                                <li>
                                                    <a className={this.state.activeTab === 3 ? "active-detail-li" : "detail-li"}
                                                       onClick={() => this.onTabClick(3)}
                                                       href={hrefVal}>Promoted</a>
                                                </li>
                                                <li>
                                                    <a className={this.state.activeTab === 4 ? "active-detail-li" : "detail-li"}
                                                       onClick={() => this.onTabClick(4)}
                                                       href={hrefVal}>Upcoming</a>
                                                </li>
                                            </ul>
                                        </nav>
                                    </div>
                                </div>
                            </section>

                            <div style={styles.mainDiv}>
                                <div className={'row'} style={styles.innerDiv}>
                                    <div className={'col-md-6'}>
                                        <div className={'heading-text'}>{heading}</div>
                                    </div>
                                    <div className={'col-md-2 offset-4 cursor-pointer'} style={{textAlign: 'end'}}>
                                        <img
                                            src={this.state.activeView === 'list' ? '/images/views/list-white.svg' : '/images/views/list-gray.svg'}
                                            onClick={() => this.onCardViewClick(true, 'list')}
                                            alt="Img1"
                                            style={this.state.activeView === 'list' ? styles.activeIcon1 : styles.icon1}/>
                                        <img
                                            src={this.state.activeView === 'thumbnail' ? '/images/views/calendar-white.svg' : '/images/views/calendar - gray.svg'}
                                            onClick={() => this.onCardViewClick(false, 'thumbnail')}
                                            alt="Img2"
                                            style={this.state.activeView === 'thumbnail' ? styles.activeIcon2 : styles.icon2}/>
                                    </div>

                                    {/*<div className={'col-md-2'}>
                                        <select name="selectedDate"
                                                defaultValue={this.state.selectedDate}
                                                style={{
                                                    width: '100%',
                                                    padding: '0px 0px 0px 10px',
                                                    height: '40px'
                                                }}
                                                onChange={(e) => this.onDateChange(e)}
                                                className="filterDropDowns chosen-select">
                                            <option default>This Weekend</option>
                                        </select>
                                    </div>
                                    <div className={'col-md-2'}>
                                        <select name="selectedDate"
                                                defaultValue={this.state.selectedDate}
                                                style={{
                                                    width: '100%',
                                                    padding: '0px 0px 0px 10px',
                                                    height: '40px'
                                                }}
                                                onChange={(e) => this.onDateChange(e)}
                                                className="filterDropDowns chosen-select">
                                            <option default>Sort by: Date</option>
                                        </select>
                                    </div>*/}

                                </div>

                                <div style={{
                                    marginBottom: '10%',
                                    marginTop: cinemaEvents && cinemaEvents.length > 0 ? '' : '7%'
                                }}>
                                    {this.state.listView ?
                                        <>
                                            {cinemaEvents && cinemaEvents.length > 0 ? cinemaEvents.map((data, i) => {
                                                let array = data.categories && (data.categories.includes([], 0) ? data.categories[0] : data.categories);
                                                return (
                                                    <div className={'row'} style={{borderBottom: '1px solid #f2f2f2'}}>
                                                        <div className={'col-md-9'}>
                                                            <CardWithSideDetail
                                                                image={data.eventImageURL ? data.eventImageURL : data.slotImageURL[0]}
                                                                key={i}
                                                                title={data._id}
                                                                categories={
                                                                    array.map((category, i) => {
                                                                        return (
                                                                            <span
                                                                                key={i}>{category} {i === data.categories.length - 1 ? " " :
                                                                                i === data.categories.length - 2 ? "& " : ", "}</span>
                                                                        )
                                                                    })}
                                                                startDate={`${getDayFromISO(data.eventDateTimeSlot && data.eventDateTimeSlot.eventStartTime)}, ${getDateFromISO(data.eventDateTimeSlot && data.eventDateTimeSlot.eventStartTime)}`}
                                                                endDate={`${getDayFromISO(data.eventDateTimeSlot && data.eventDateTimeSlot.eventEndTime)}, ${getDateFromISO(data.eventDateTimeSlot && data.eventDateTimeSlot.eventEndTime)}`}
                                                                shows={data.eventVenues && data.eventVenues.length}
                                                            />
                                                        </div>
                                                        <div className={'col-md-3'}
                                                             style={{textAlign: 'right', top: '54px'}}>
                                                            <button className='simpleButton width85 backgroundColorRed'>
                                                                Buy Ticket in $7878
                                                            </button>
                                                        </div>
                                                    </div>
                                                )
                                            }) : <span>No Data Found!</span>}
                                        </> :
                                        <div className={'row'} style={{marginTop: '5%'}}>
                                            {cinemaEvents && cinemaEvents.length > 0 ? cinemaEvents.map((data, i) => {
                                                return (
                                                    <CardWithBottomTitle
                                                        image={data.eventImageURL ? data.eventImageURL : data.slotImageURL[0]}
                                                        key={i}
                                                        title={data._id}/>
                                                )
                                            }) : <span style={{textAlign: 'center'}}>No Data Found!</span>}
                                        </div>
                                    }
                                </div>
                            </div>
                        </div>
                        <div className="limit-box fl-wrap"/>
                    </div>
                );
            }
        }
    }
}

const mapStateToProps = (state) => {
    return {
        showingInCinemaEventsInfo: state.movies.showingInCinemaEvents,
        upcomingEventsForCinemaInfo: state.movies.upcomingEventsForCinema,
        promotedEventsForCinemaInfo: state.movies.promotedEventsForCinema,
        trendingEventsForCinemaInfo: state.movies.trendingEventsForCinema,
        processing: state.movies.processing,
        cinemaInfo: state.movies.cinemaInfo
    };
};

const connectedComponent = connect(mapStateToProps,
    {
        showingInCinema,
        upcomingEventsForCinema,
        promotedEventsForCinema,
        trendingEventsForCinema,
        getAllCategories,
        setProcessing,
        setCinemaData
    })(NearByCinemaDetail);
export default withRouter(connectedComponent);