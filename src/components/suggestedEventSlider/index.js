// Library
import React, {Component} from 'react';
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import {Modal, ModalHeader, ModalBody} from 'reactstrap';
import {
    FacebookShareButton,
    TwitterShareButton,
    FacebookIcon,
    TwitterIcon
} from 'react-share';
// Component
import SectionHeading from "../../commonComponents/sectionHeading";
import CardSlider from '../../commonComponents/cardSlider';
import DefaultCard from '../../commonComponents/defaultCard';
import {getWishListIdsFromApi, wishListToggle} from "../../redux/wishlist/wishlist-actions";
import {getCardDates, getMaxAndMinPrice} from "../../utils/common-utils";
import {buttonSettings, sliderSettings} from "../../utils/config";

let isWishlist = false;

// Main Slider Settings from config
const mainSliderSettings = {
    ...sliderSettings,
    max: 10,
};


class SuggestedEventSlider extends Component {

    state = {
        activeModal: '',
        width: window.innerWidth
    };

    componentDidMount() {
        // document.title = "Ticket Lake - Events";
        if (this.props.wishLists === null) {
            this.props.getWishListIdsFromApi();
        }
        window.addEventListener("resize", this.resize.bind(this));
        this.resize();
    }


    resize() {
        this.setState({width: window.innerWidth});
    }
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
        const {heading, text, cards} = this.props;
        const cardDisplay = [];
        let shareUrl = 'http://google.com/';

            Array.isArray(cards) && cards.forEach((card, i) => {
                shareUrl = window.location.protocol + '//' + window.location.host + '/event/detail/' + card.eventSlotId;

                if (this.props.auth) {
                    isWishlist = this.props.wishLists && this.props.wishLists !== '' && this.props.wishLists.includes(card.eventSlotId);
                }
                cardDisplay.push (

                    <div className="slick-slide-item" key={card._id}>
                        <>
                            <DefaultCard key={i}
                                         gridLg={12}
                                         gridMd={12}
                                         gridSm={12}
                                         auth={this.props.auth}
                                         venueName={card.venue && card.venue.name}
                                         cardTitle={card.eventTitle}
                                         image={card.bannerImageKey.imageUrl}
                                         cardLink={'#'}
                                         dates={getCardDates(card.eventDateTimeSlot)}
                                         isWishList={isWishlist}
                                         wishlistLink={() => this.wishListToggle(card.eventSlotId)}
                                         cardAddress={card.venue ? card.venue.address : ''}
                                         country={card.venue ? card.venue.country : []}
                                         city={card.venue ? card.venue.city : []}
                                         onClick={() => this.props.history.push(`/event/detail/${card.eventSlotId}`)}
                                         buttonText={getMaxAndMinPrice(card)}
                                         buttonLink={`/buy-ticket/${card.eventSlotId}`}
                                         description={card.parentEventInfo ? card.parentEventInfo.description: []}
                                         sharing={this.sharingSocial}
                                         id={card._id}
                            />
                            <Modal isOpen={this.state.activeModal === card._id} toggle={this.sharingSocial}
                                   className={this.props.className + ' social-sharing-model'}>
                                <ModalHeader toggle={this.sharingSocial}>{card.eventTitle}</ModalHeader>
                                <ModalBody>
                                    <h4>Share this event on:</h4>
                                    <row className={"social-icons-wrp"}>
                                        <FacebookShareButton url= {shareUrl} quote={card.eventTitle}
                                                             className="Demo__some-network__share-button">
                                            <FacebookIcon size={40} round/>
                                        </FacebookShareButton>
                                        <TwitterShareButton url= {shareUrl} title={card.eventTitle}
                                                            className="Demo__some-network__share-button">
                                            <TwitterIcon size={40} round/>
                                        </TwitterShareButton>
                                    </row>
                                </ModalBody>
                            </Modal>
                        </>
                    </div>
                )
            });

        mainSliderSettings.infinite = cards.length > mainSliderSettings.slidesToShow;
        buttonSettings.display = this.state.width > 1024 ? cards.length > mainSliderSettings.slidesToShow : true;


        return (
            <section>
                <SectionHeading
                    heading={heading}
                    text={text && text ? text : ''}
                />

                {
                        <div className="list-carousel fl-wrap card-listing ">
                            <div className="listing-carousel  fl-wrap ">
                                <CardSlider settings={mainSliderSettings} buttons={buttonSettings}>
                                    {cardDisplay}
                                </CardSlider>
                            </div>
                        </div>
                }

            </section>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        wishLists: state.wishlist.wishListIds,
        auth: state.user.authenticated
    }
};

const connectedComponent = connect(mapStateToProps, {
    getWishListIdsFromApi,
    wishListToggle
})(SuggestedEventSlider);
export default withRouter(connectedComponent);
