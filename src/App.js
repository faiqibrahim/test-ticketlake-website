import React, {Component, Suspense} from "react";
import {BrowserRouter, Redirect, Route, Switch} from "react-router-dom";
import {NotificationContainer} from "react-notifications";

// CSS
import "./App.css";
import "react-notifications/lib/notifications.css";
import "@splidejs/splide/dist/css/themes/splide-default.min.css";
import "antd/dist/antd.css";
import "@splidejs/splide/dist/css/themes/splide-sea-green.min.css";
import "@splidejs/splide/dist/css/themes/splide-skyblue.min.css";
import "react-phone-input-2/lib/style.css";

import Loader from './commonComponents/loader';


// Auth Routes
const Layout = React.lazy(() => import("./components/layout"));
const Header = React.lazy(() => import("./commonComponents/header"));
const ScrollToTop = React.lazy(() => import( "./commonComponents/ScrollToTop/ScrollToTop"));
const CustomModal = React.lazy(() => import( "./components/customModal"));
const Footer = React.lazy(() => import( "./commonComponents/footer"));
const VerifyEmail = React.lazy(() => import( "./components/verifyEmail"));

const Organisers = React.lazy(() => import( "./components/organisers/View"));
const AboutUsPage = React.lazy(() => import( "./components/aboutUsPage"));
const ContactUsPage = React.lazy(() => import( "./components/contactUsPage"));
const EventListing = React.lazy(() => import( "./components/eventListingPage"));
const EventDetail = React.lazy(() => import("./components/eventDetailPage"));
const Authentication = React.lazy(() => import( "./components/authentication"));
const Verification = React.lazy(() => import( "./components/verificationPage"));
const BuyTicketPage = React.lazy(() => import( "./components/buyTicketPage"));
const ChangePassword = React.lazy(() => import( "./components/userChangePassword"));
const Wishlist = React.lazy(() => import( "./components/userWishlistPage"));
const Tickets = React.lazy(() => import( "./components/userTicketsPage"));
const Wallet = React.lazy(() => import( "./components/userWalletPage"));
const WalletTopUp = React.lazy(() => import( "./components/userWalletTopUp"));
const UserProfile = React.lazy(() => import( "./components/userProfilePage"));
const ForgotPassword = React.lazy(() => import( "./components/forgotPasswordPage"));
const Movies = React.lazy(() => import( "./components/moviesPage/Movies"));
const Sports = React.lazy(() => import( "./components/sportsPage"));
const PrivacyPolicy = React.lazy(() => import( "./components/privacyPolicy/PrivacyPolicy"));
const Terms = React.lazy(() => import( "./components/Terms/Terms"));
const VotingRouteWrapper = React.lazy(() => import( "./components/VotingModule/RouteWrapper/RouteWrapper"));
const SuccessPage = React.lazy(() => import( "./components/successPage"));
const FailurePage = React.lazy(() => import( "./components/failurePage"));
const OrganiserDetails = React.lazy(() => import( "./components/organisers/Details/"));
const NearByEvents = React.lazy(() => import( "./components/nearByEvents"));
const NearByCinemas = React.lazy(() => import( "./components/nearByCinemas"));
const MovieDetail = React.lazy(() => import( "./components/moviesPage/MovieDetails/MovieDetails"));
const ViewMore = React.lazy(() => import( "./components/moviesPage/viewMore"));
const NearByCinemaDetail = React.lazy(() => import( "./components/nearByCinemaDetail"));
const CalendarEvents = React.lazy(() => import( "./components/calendarEvents"));


class App extends Component {

    render() {
        return (
            <div>
                <Suspense fallback={(
                    <div style={{
                        display: "flex",
                        height: '100vh',
                        alignContent: 'center',
                        justifyContent: 'center'
                    }}>
                        <Loader/>
                    </div>
                )}>
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
                            <CustomModal/>
                            <div id="main">
                                <Header/>
                                <VerifyEmail/>
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
                                    <Route path="/movies" name={"Movies"} component={Movies}/>
                                    <Route path="/sports" name={"Sports"} component={Sports}/>
                                    <Route
                                        path="/policies"
                                        name={"Sports"}
                                        component={PrivacyPolicy}
                                    />
                                    <Route path="/terms" name={"Sports"} component={Terms}/>
                                    <Route path="/sports" name={"Sports"} component={Sports}/>

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

                                    <Route path="/organisers" component={Organisers}/>

                                    <Route path="/" exact name={"Home"} component={Layout}/>
                                    <Redirect to="/"/>
                                </Switch>
                                <NotificationContainer/>
                                <Footer/>
                            </div>
                        </ScrollToTop>
                    </BrowserRouter>
                </Suspense>
            </div>
        );
    }
}

export default App;
