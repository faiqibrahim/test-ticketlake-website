import React, {Fragment} from 'react';
import Heading from '../../commonComponents/heading';
import {getCardDates, getMaxAndMinPrice} from "../../utils/common-utils";
import DefaultCard from '../defaultCard';
import {Modal, ModalHeader, ModalBody} from 'reactstrap';
import {withRouter} from 'react-router-dom';

import {FacebookShareButton, TwitterShareButton, FacebookIcon, TwitterIcon} from 'react-share';


class cardLeftAlign extends React.Component {

    state = {
        activeModal : ''
    };


    /***************** Social Media Modal ****************/
    renderSocialModal = (data,shareUrl)=>{
        return (
            <Modal isOpen={this.state.activeModal === data._id} toggle={this.sharingSocial}
                   className={this.props.className}>
                <ModalHeader toggle={this.sharingSocial}>{data.eventTitle}</ModalHeader>
                <ModalBody>
                    <h4>Share this event on:</h4>
                    <div className={"row social-icons-wrp"}>
                            <FacebookShareButton url={shareUrl} quote={data.eventTitle}
                                                 className="Demo__some-network__share-button">

                                <FacebookIcon size={40} round/>
                            </FacebookShareButton>

                            <TwitterShareButton url={shareUrl} title={data.eventTitle}
                                                className="Demo__some-network__share-button">

                                <TwitterIcon size={40} round/>
                            </TwitterShareButton>
                    </div>
                </ModalBody>
            </Modal>
        )
    };
    /********************** END **************************/


    /******************************* Rendering Event Cards *******************/
    sharingSocial = (id) => {
        if (id) {
            this.setState({activeModal: id});
        } else {

            this.setState({activeModal: ''});
        }
    };
    renderEventCards = (events) => {
        let isWishlist = false;
        return events.map((data, i) => {
            let shareUrl = window.location.protocol + '//' + window.location.host + '/event/detail/' + data.eventSlotId;
            if (this.props.auth) {
                isWishlist = this.props.wishLists && this.props.wishLists !== '' && this.props.wishLists.includes(data.eventSlotId);
            }
            return (
                <Fragment key={i}>
                    <DefaultCard gridLg={3}
                                 gridMd={6}
                                 gridSm={12}
                                 auth={this.props.auth}
                                 cardTitle={data.eventTitle}
                                 image={data.bannerImageKey.imageUrl}
                                 venueName={data.venue && data.venue.name}
                                 cardLink={'#'}
                                 dates={getCardDates(data.eventDateTimeSlot)}
                                 isWishList={isWishlist}
                                 wishlistLink={() => this.wishListToggleLink(data.eventSlotId)}
                                 cardAddress={data.venue ? data.venue.address : ''}
                                 country={data.venue ? data.venue.country : []}
                                 city={data.venue ? data.venue.city : []}
                                 onClick={() => this.props.history.push(`/event/detail/${data.eventSlotId}`)}
                                 buttonText={getMaxAndMinPrice(data)}
                                 buttonLink={`/buy-ticket/${data.eventSlotId}`}
                                 sharing={this.sharingSocial}
                                 description={data.parentEventInfo && data.parentEventInfo.description}
                                 id={data._id}/>

                    {this.renderSocialModal(data, shareUrl)}
                </Fragment>
            )
        });
    };

    render() {
        let {heading, text,events} = this.props;
        return (
            <section style={{paddingTop: '0px'}}>
                <div className={"container custom-container"}>
                    <Heading
                        style={{marginBottom: '0px', textAlign: 'left'}}
                        heading={heading}
                        text={text}
                    />

                    <div className={"row"}>
                        {this.renderEventCards(events)}
                    </div>
                </div>
            </section>
        )
    }

}

export default withRouter(cardLeftAlign)
