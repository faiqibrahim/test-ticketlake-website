// Library
import React, {Component} from 'react';
// Components
import SearchForEvents from '../searchForEvents';
import PromotedEvents from '../promotedEvents';
import RecentlyAddedEvents from '../recentlyAddedEvents';
import UpcomingEvents from '../upcomingEvents';
import EventOrganizer from '../eventOrganizer';
import WhyChooseUs from '../whyChooseUs';
import MobileAppBanner from '../mobileAppBanner';
import Loader from "../../commonComponents/loader";
// Redux
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import {getWishListIdsFromApi} from '../../redux/wishlist/wishlist-actions';

class Main extends Component {
    componentDidMount() {
        // document.title = "Ticket Lake - Welcome";
        if (this.props.auth) {
            this.props.getWishListIdsFromApi();
        }
    }

    renderHomePage = () => {
        return (
            <div id="wrapper">
                <div className="content">
                    <SearchForEvents/>
                    {/*<Section/>*/}
                    <PromotedEvents/>
                    <RecentlyAddedEvents heading={"Upcoming Events"}
                                         text={"Chalk out your entertainment by exploring the upcoming events based on your preferences"}/>
                    <UpcomingEvents/>
                    <WhyChooseUs/>
                    <EventOrganizer/>
                    <MobileAppBanner/>
                </div>
            </div>
        )
    };

    render() {
        if (this.props.auth) {
            if (this.props.processing) {
                return (
                    <Loader/>
                )
            } else {
                return (
                    <>
                        {this.renderHomePage()}
                    </>
                )
            }
        } else {
            return (
                <>
                    {this.renderHomePage()}
                </>
            )
        }

    }
}

const mapStateToProps = (state) => {
    return {
        processing: state.wishlist.processing,
        auth: state.user.authenticated
    }
};

const connectedComponent = connect(mapStateToProps, {getWishListIdsFromApi})(Main);
export default withRouter(connectedComponent);