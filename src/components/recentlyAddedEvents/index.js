// Library
import React, {Component} from 'react';

// Component
import SectionHeading from "../../commonComponents/sectionHeading";
import CardSlider from '../../commonComponents/cardSlider';
import Loader from '../../commonComponents/loader';
import DefaultCard from '../../commonComponents/defaultCardWithDetail';
import TwoShadedButton from '../../commonComponents/twoShadedButton';


// Redux
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import {getUpcomingEventsForHome} from '../../redux/event/event-actions';
import {wishListToggle, getWishListIdsFromApi} from '../../redux/wishlist/wishlist-actions';


// Helpers
import {getMaxAndMinPrice, getCardDates, isNullOrEmpty} from '../../utils/common-utils';
import {buttonSettings, sliderSettings} from "../../utils/config";
import {Modal, ModalBody, ModalHeader} from "reactstrap";
import {FacebookIcon, FacebookShareButton, TwitterIcon, TwitterShareButton} from "react-share";


let wishListFlag = false;

class RecentlyAddedEvents extends Component {

    state = {
        activeModal: '',
        width: window.innerWidth
    };

    componentWillMount() {
        this.props.getUpcomingEventsForHome();
        if (this.props.auth) {
            this.props.getWishListIdsFromApi();
        }
        window.addEventListener("resize", this.resize.bind(this));
        this.resize();
    }

    componentDidUpdate(prevProps){

        if(prevProps.eventsCountry !== this.props.eventsCountry){
            this.props.getUpcomingEventsForHome();
        }
    }
    resize() {
        this.setState({width: window.innerWidth});
    }

    wishListToggle = (eventSlotId) => {
        this.props.wishListToggle(eventSlotId);
    };


    sharingSocial = (id) => {
        if (id) {
            this.setState({activeModal: id,});
        } else {
            this.setState({activeModal: ''});
        }
    };




    // Rendering Social Media Links
    renderSocialModal = (data, shareUrl) => {
        return (
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
        )
    };

    /******************** Settings *************************/
        // Slider Settings
    mainSliderSettings = {
        ...sliderSettings,
        initialSlide: 0,
        cssEase: "ease-in",
        centerMode: true,
        lazyLoad: true,
        autoplaySpeed:0,
    };



    /******************** End *************************/

    render() {
        const {heading, text} = this.props;
        const event = this.props.upcomingEventsHome;
        let shareUrl = 'http://google.com/';


        if (this.props.processing) {
            return (
                <section className="light-red-bg up-coming-events">
                    <SectionHeading
                        heading={heading}
                        text={text && text ? text : ''}
                    />
                    <Loader/>
                </section>
            )
        } else {
            if (isNullOrEmpty(event)) {
                return (
                    <section className="light-red-bg up-coming-events">
                        <SectionHeading
                            heading={heading}
                            text={text && text ? text : ''}
                        />
                        <div className={"Error-msg-wrp"}>
                            <div className={"Error-heading"}>Sorry, No Event Found.</div>
                            <span className={"Error-sub-heading"}>There are no events.</span>
                        </div>
                    </section>
                );
            } else {
                this.mainSliderSettings.infinite = event.length > this.mainSliderSettings.slidesToShow;
                buttonSettings.display = this.state.width > 1024 ? this.props.upcomingEventsHome.length > this.mainSliderSettings.slidesToShow : true;

                return (
                    <section className="light-red-bg up-coming-events">
                        <SectionHeading
                            heading={heading}
                            text={text && text ? text : ''}
                        />
                        <div className="slider-wrp">
                            <CardSlider  settings={this.mainSliderSettings} buttons={buttonSettings}>
                                {event.map((card, i) => {
                                    shareUrl = window.location.protocol + '//' + window.location.host + '/movie/detail/' + card.eventSlotId;
                                    if (this.props.auth) {
                                        wishListFlag = this.props.wishLists && this.props.wishLists !== '' && this.props.wishLists.includes(card.eventSlotId);
                                    }
                                    return (
                                        <>
                                            <DefaultCard key={i}
                                                         gridLg={12}
                                                         gridMd={12}
                                                         gridSm={12}
                                                         auth={this.props.auth}
                                                         cardTitle={card.eventTitle}
                                                         venueName={card.venue && card.venue.name}
                                                         image={card.bannerImageKey.imageUrl}
                                                         cardLink={'#'}
                                                         isWishList={wishListFlag}
                                                         wishlistLink={() => {
                                                             this.wishListToggle(card.eventSlotId)
                                                         }}
                                                         sharing={this.sharingSocial}
                                                         onClick={() => this.props.history.push(`/event/detail/${card.eventSlotId}`)}
                                                         cardAddress={card.venue ? card.venue.address : ''}
                                                         country={card.venue ? card.venue.country : []}
                                                         dates={getCardDates(card.eventDateTimeSlot)}
                                                         city={card.venue ? card.venue.city : []}
                                                         buttonText={getMaxAndMinPrice(card)}
                                                         buttonLink={`/buy-ticket/${card.eventSlotId}`}
                                                         description={card.parentEventInfo ? card.parentEventInfo.description: []}
                                                         id={card._id}
                                            />

                                            {this.renderSocialModal(card, shareUrl)}
                                        </>


                                )

                                })
                                }

                            </CardSlider>
                        </div>

                        <div className={'marginTop30px'}>
                            <TwoShadedButton
                                buttonLink={'/events/listing'}
                                buttonText={'Explore all Events'}
                            />
                        </div>
                    </section>
                );
            }
        }
    }
}

const mapStateToProps = (state) => {
    return {
        upcomingEventsHome: state.event.upcomingEventsHome,
        auth: state.user.authenticated,
        wishLists: state.wishlist.wishListIds,
        processing: state.event.processing,
        eventsCountry: state.user.eventsCountry,
    }
};

const connectedComponent = connect(mapStateToProps, {
    wishListToggle,
    getWishListIdsFromApi,
    getUpcomingEventsForHome
})(RecentlyAddedEvents);
export default withRouter(connectedComponent);