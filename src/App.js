// Library
import React, { Component } from "react";
import { Redirect, BrowserRouter, Route, Switch } from "react-router-dom";
import { NotificationContainer } from "react-notifications";
import { connect } from "react-redux";
import axios from "axios";

// Components
import Layout from "./components/layout";
import { setEventsCountry } from "./redux/user/user-actions";
// Auth Routes

import Header from "./commonComponents/header";
// Pages
import AboutUsPage from "./components/aboutUsPage";
import ContactUsPage from "./components/contactUsPage";
import EventListing from "./components/eventListingPage";
import EventDetail from "./components/eventDetailPage";
import Authentication from "./components/authentication";
import Verification from "./components/verificationPage";
import BuyTicketPage from "./components/buyTicketPage";
import ChangePassword from "./components/userChangePassword";
import Wishlist from "./components/userWishlistPage";
import Tickets from "./components/userTicketsPage";
import Wallet from "./components/userWalletPage";
import WalletTopUp from "./components/userWalletTopUp";
import UserProfile from "./components/userProfilePage";
import ForgotPassword from "./components/forgotPasswordPage";
import Movies from "./components/moviesPage/Movies";
import Sports from "./components/sportsPage";
import ScrollToTop from "./commonComponents/ScrollToTop/ScrollToTop";
import PrivacyPolicy from "./components/privacyPolicy/PrivacyPolicy";
import Terms from "./components/Terms/Terms";
import CustomModal from "./components/customModal";
import VotingRouteWrapper from "./components/VotingModule/RouteWrapper/RouteWrapper";
// CSS
import "./App.css";
import "react-notifications/lib/notifications.css";
import "@splidejs/splide/dist/css/themes/splide-default.min.css";
// or
import "@splidejs/splide/dist/css/themes/splide-sea-green.min.css";
// or
import "@splidejs/splide/dist/css/themes/splide-skyblue.min.css";

import Footer from "./commonComponents/footer";
import SuccessPage from "./components/successPage";
import FailurePage from "./components/failurePage";
import VerifyEmail from "./components/verifyEmail";
import Organisers from "./components/organisers/View";
import OrganiserDetails from "./components/organisers/Details/";
import NearByEvents from "./components/nearByEvents";
import NearByCinemas from "./components/nearByCinemas";
import MovieDetail from "./components/moviesPage/MovieDetails/MovieDetails";
import ViewMore from "./components/moviesPage/viewMore";
import NearByCinemaDetail from "./components/nearByCinemaDetail";
import CalendarEvents from "./components/calendarEvents";
import { getCountryLabel } from "./utils/common-utils";

const _ = require("lodash");

class App extends Component {
  componentDidMount() {
    this.getCurrentPosition();
  }

  getCurrentPosition = () => {
    const { setEventsCountry, eventsCountry } = this.props;

    if (_.isNil(eventsCountry.countryCode)) {
      axios
        .get("https://location.hexagram.global/geo-data")
        .then((response) => {
          const { country: countryCode } = response.data;

          setEventsCountry({
            label: getCountryLabel(countryCode),
            countryCode,
            storeInSession: true,
          });
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  render() {
    return (
      <div>
        <BrowserRouter>
          <ScrollToTop>
            <button
              data-toggle="modal"
              data-target="#modal_aside_left"
              className="btn btn-primary"
              type="button"
            >
              {" "}
              Modal aside left{" "}
            </button>
            <CustomModal />
            <div id="main">
              <Header />
              <VerifyEmail />
              <Switch>
                <Route
                  path="/events/listing"
                  name={"Events"}
                  component={EventListing}
                />
                <Route
                  path="/buy-ticket/:id"
                  name={"BuyTicket"}
                  component={BuyTicketPage}
                />
                <Route
                  path="/successfull/"
                  name={"SuccessPage"}
                  component={SuccessPage}
                />
                <Route
                  path="/failure/"
                  name={"FailurePage"}
                  component={FailurePage}
                />
                <Route
                  path="/contact-us"
                  name={"ContactUs"}
                  component={ContactUsPage}
                />
                <Route
                  path="/about-us"
                  name={"AboutUs"}
                  component={AboutUsPage}
                />
                <Route
                  path="/voting"
                  name={"Voting"}
                  component={VotingRouteWrapper}
                />
                <Route
                  path="/user/change-password"
                  name={"ChangePassword"}
                  component={ChangePassword}
                />
                <Route
                  path="/user/wishlist"
                  name={"UserWishList"}
                  component={Wishlist}
                />
                <Route
                  path="/user/ticket"
                  name={"UserTickets"}
                  component={Tickets}
                />
                <Route
                  path="/user/wallet/top-up"
                  name={"UserWalletTopUp"}
                  component={WalletTopUp}
                />
                <Route
                  path="/user/wallet"
                  name={"UserWallet"}
                  component={Wallet}
                />
                <Route
                  path="/user/profile"
                  name={"UserProfile"}
                  component={UserProfile}
                />
                <Route
                  path="/user/calendar-events"
                  name={"CalendarEvents"}
                  component={CalendarEvents}
                />
                <Route
                  path="/event/detail/:id"
                  name={"EventDetail"}
                  component={EventDetail}
                />
                <Route
                  path="/movie/detail/:id"
                  name={"MovieDetail"}
                  component={MovieDetail}
                />
                <Route
                  path="/movies/sub-category"
                  name={"ViewMore"}
                  component={ViewMore}
                />
                <Route
                  path="/movies/viewMore"
                  name={"ViewMore"}
                  component={ViewMore}
                />
                <Route path="/movies" name={"Movies"} component={Movies} />
                <Route path="/sports" name={"Sports"} component={Sports} />
                <Route
                  path="/policies"
                  name={"Sports"}
                  component={PrivacyPolicy}
                />
                <Route path="/terms" name={"Sports"} component={Terms} />
                <Route path="/sports" name={"Sports"} component={Sports} />

                <Route
                  path="/events/nearby-events"
                  name={"NearByEvents"}
                  component={NearByEvents}
                />
                <Route
                  path="/events/nearby-cinemas/detail/:id"
                  name={"NearByCinemaDetail"}
                  component={NearByCinemaDetail}
                />
                <Route
                  path="/events/nearby-cinemas"
                  name={"NearByCinemas"}
                  component={NearByCinemas}
                />
                <Route
                  path="/sign-up/verification"
                  name={"Register"}
                  component={Verification}
                />
                <Route
                  path="/authentication/forgot-password"
                  name={"ForgotPassword"}
                  component={ForgotPassword}
                />
                <Route
                  path="/authentication"
                  name={"SignIn"}
                  component={Authentication}
                />
                <Route
                  path="/organisers/details/:id"
                  component={OrganiserDetails}
                />

                <Route path="/organisers" component={Organisers} />

                <Route path="/" exact name={"Home"} component={Layout} />
                <Redirect to="/" />
              </Switch>
              <NotificationContainer />
              <Footer />
            </div>
          </ScrollToTop>
        </BrowserRouter>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    eventsCountry: state.user.eventsCountry,
  };
};

export default connect(mapStateToProps, { setEventsCountry })(App);
