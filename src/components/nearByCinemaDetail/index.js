import React, {Component} from 'react';
import Error from '../../commonComponents/error';
import EventMessage from '../../commonComponents/eventMessage';
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
import {Helmet} from "react-helmet";
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

    pageTitle = () => {
        return (
            <Helmet>
                <title>Cinema Detail</title>
            </Helmet>
        )
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

    onClickWrp = (data) => {
        sessionStorage.setItem("parentEventDetail", JSON.stringify(data));
        const {_id} = data;
        if (_id) {
            this.props.history.push({
                pathname: `/movie/detail/${_id}`,
                data: data,
            });
        }
    };

    showListView = (cinemaEvents) =>{
        if(!cinemaEvents.length) return <EventMessage/>
        return (
            <>
                {cinemaEvents.map((data, i) => {
                    let categoryArr = data.categories && (data.categories.includes([], 0) ? data.categories[0] : data.categories);
                    let startDate = `${getDayFromISO(data.startDateTime && data.startDateTime)}, ${getDateFromISO(data.startDateTime && data.startDateTime)}`;
                    let endDate = `${getDayFromISO(data.endDateTime && data.endDateTime)}, ${getDateFromISO(data.endDateTime && data.endDateTime)}`;
                    return (
                        <div className={'row'} style={{borderBottom: '1px solid #f2f2f2'}}>
                            <div className={'col-md-9'}>
                                <CardWithSideDetail
                                    image={data.bannerImageKey && data.bannerImageKey.imageUrl}
                                    key={i}
                                    title={data.title}
                                    categories={
                                        categoryArr.map((category, j) => {
                                            return (
                                                <span
                                                    key={j}>{category.title} {j === data.categories.length - 1 ? " " :
                                                    j === data.categories.length - 2 ? "& " : ", "}</span>
                                            )
                                        })}
                                    startDate={startDate}
                                    endDate={endDate}
                                    onClickWrp={this.onClickWrp}
                                    data={data}
                                />
                            </div>
                            <div className={'col-md-3'}
                                 style={{textAlign: 'right', top: '54px'}}>
                                <button className='simpleButton width85 backgroundColorRed'
                                        onClick={() => this.onClickWrp(data)}
                                >
                                    {
                                        data.eventMaximumTicketClassPrice
                                            ? data.eventMaximumTicketClassPrice ===
                                            data.eventMinimumTicketClassPrice
                                            ? `Buy Tickets from GHS${data.eventMaximumTicketClassPrice}`
                                            : `Buy Tickets from GHS${data.eventMinimumTicketClassPrice} - GHS${data.eventMaximumTicketClassPrice}`
                                            : "Buy Tickets"
                                    }
                                </button>
                            </div>
                        </div>
                    )
                })
                }
            </>
        )
    }

    showBoxView = (cinemaEvents) =>{
        if(!cinemaEvents.length) return <EventMessage/>
        return (
            <div className={'row'} style={styles.innerDiv}>
                {cinemaEvents.map((data, i) => {
                    return (
                        <CardWithBottomTitle
                            image={data.bannerImageKey && data.bannerImageKey.imageUrl}
                            key={i}
                            title={data.title}
                            onClickWrp={this.onClickWrp}
                            data={data}/>
                    )
                })
                }
            </div>
        )
    }

    render() {
        const hrefValue = "#"
        let totalEvents = 0;
        switch (this.state.activeTab) {
            case 1:
                cinemaEvents = this.props.showingInCinemaEventsInfo;
                totalEvents = cinemaEvents && cinemaEvents.length;
                heading = 'Showing Now';
                break;
            case 2:
                cinemaEvents = this.props.trendingEventsForCinemaInfo;

                totalEvents = cinemaEvents && cinemaEvents.length;
                heading = 'Trending';
                break;
            case 3:
                cinemaEvents = this.props.promotedEventsForCinemaInfo;

                totalEvents = cinemaEvents && cinemaEvents.length;
                heading = 'Promoted';
                break;
            case 4:
                cinemaEvents = this.props.upcomingEventsForCinemaInfo;
                totalEvents = cinemaEvents && cinemaEvents.length;
                heading = 'Upcoming';
                break;
            default:
                cinemaEvents = this.props.showingInCinemaEventsInfo;
                totalEvents = cinemaEvents && cinemaEvents.length;
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
        }
        if (this.props.error) {
            return (
                <Error/>
            )
        }
        return (
            <div id="wrapper">
                <div className="content">
                    {this.pageTitle()}
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
                                               href={hrefValue}>Showing</a>
                                        </li>
                                        <li>
                                            <a className={this.state.activeTab === 2 ? "active-detail-li" : "detail-li"}
                                               onClick={() => this.onTabClick(2)}
                                               href={hrefValue}>Trending</a>
                                        </li>
                                        <li>
                                            <a className={this.state.activeTab === 3 ? "active-detail-li" : "detail-li"}
                                               onClick={() => this.onTabClick(3)}
                                               href={hrefValue}>Promoted</a>
                                        </li>
                                        <li>
                                            <a className={this.state.activeTab === 4 ? "active-detail-li" : "detail-li"}
                                               onClick={() => this.onTabClick(4)}
                                               href={hrefValue}>Upcoming</a>
                                        </li>
                                    </ul>
                                </nav>
                            </div>
                        </div>
                    </section>
                    <div className={"cinemaDetail-wrp"}>
                        <div className={"container custom-container"}>
                            <div className={'row'} style={styles.innerDiv}>
                                <div className={'col-md-6'}>
                                    <div className={'heading-text'}>{heading}<span className={"total-count"}>{`. ${totalEvents} Movies `}</span> </div>
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
                            </div>
                            {this.state.listView ?
                                this.showListView(cinemaEvents)
                                 :
                                this.showBoxView(cinemaEvents)
                            }
                        </div>
                    </div>
                </div>
            </div>
        );
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