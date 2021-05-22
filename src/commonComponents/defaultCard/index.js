// Library
import React from 'react';
import {Col} from 'reactstrap';
import {NavLink} from "react-router-dom";
// Components
import TwoShadedButtonBuy from "../twoShadedButtonBuy";
import TwoShadedButton from "../twoShadedButton";
import EllipsisText from "react-ellipsis-text";
// Constant
import {TITLE_SIZE} from '../../utils/config';
import moment from 'moment';


class DefaultCard extends React.Component {

    /****************************** EVENT UTILS ****************************/

        //Rendering Event Banner, wishlist icon
    renderEventBanner = (props) => {
        return (
            <div className="geodir-category-img">
                <a href={props.cardLink} onClick={props.onClick}>
                    <img src={props.image ? props.image : window.location.origin + '/images/city/1.jpg'}
                         alt={"img"}/>
                </a>
                {this.props.isPromoted!==undefined?
                    props.tags && props.tags.length > 0 && props.tags[0]!==undefined?
                        <span className="promoted-tags">
                            {props.tags[0]!==undefined?props.tags[0]:null}
                        </span>
                        :
                        null
                    :null
                }
                <div className={`listing-avatar wishlist-icon ${this.props.isPromoted!==undefined? "promoted-listing-avatar" : null }`}>
                    {(props.auth) ? (
                        <div onClick={props.wishlistLink}>
                            {(props.isWishList === true) ?
                                (
                                    <img alt='img' src={window.location.origin + '/images/icons/heart-red.svg'}
                                         />
                                ) :
                                (
                                    <img alt='img' src={window.location.origin + '/images/icons/heart.svg'}
                                         />
                                )}

                        </div>
                    ) : null}

                </div>
                {(props.sharing) ? (
                    <div className="sale-window share-icon" onClick={() => props.sharing(props.id)}>
                        <img alt='img' src={window.location.origin + '/images/icons/share-white.svg'}
                            />
                    </div>
                ) : null}
                {props.buttonText === 0 &&
                (
                    <span className={"free-tag"}>
                                Free
                            </span>
                )
                }
            </div>
        )
    };

    //Rendering Event Data ( Location & Event Dates
    renderEventData = (props) => {
        return (
            <div className="geodir-category-content-title fl-wrap">
                <div className="geodir-category-content-title-item">

                    <h3 className="title-sin_map">
                        <a href={props.cardLink} onClick={props.onClick}>
                            <EllipsisText
                                text={props.cardTitle ? props.cardTitle : "Title"}
                                length={TITLE_SIZE}
                            />
                        </a>
                    </h3>


                        {this.props.isPromoted!==undefined?
                        <div className="fe geodir-category-location location fl-wrap">
                            <NavLink to={props.cardLink} className="map-item">
                                <img alt='img' src={window.location.origin + '/images/icons/location-red.svg'}
                                     style={{verticalAlign: 'sub', width: '14px', marginRight: '8px'}}/>
                                <span className={"date"}>
                                    {props.venueName ? props.venueName
                                        :
                                        "N/A"
                                    }
                                </span>

                            </NavLink>
                        </div>
                            :
                        <div className="geodir-category-location location fl-wrap">
                            <NavLink to={props.cardLink} className="map-item">
                                    <img alt='img' src={window.location.origin + '/images/icons/location-red.svg'}
                                        style={{verticalAlign: 'sub', width: '14px', marginRight: '8px'}}/>
                                <span className={"date"}>
                                    {props.venueName ? props.venueName
                                        :
                                        "N/A"
                                    }
                                </span>
                            </NavLink>
                        </div>
                        }


                    {this.props.isPromoted!==undefined?
                        <div className="fn geodir-category-location date fl-wrap">
                            <NavLink to={props.cardLink} className="map-item">
                                <img alt='img' src={window.location.origin + '/images/icons/time-red.svg'}
                                     style={{verticalAlign: 'sub', width: '14px', marginRight: '8px'}}/>
                                <span className={"date"}>

                                    {props.promotedDate.eventStartTime || props.promotedDate.eventEndTime ?
                                       moment(props.promotedDate.eventStartTime).format('ll') + ' - ' + moment(props.promotedDate.eventEndTime).format('ll')
                                       :
                                       "N/A"
                                   }
                                </span>

                            </NavLink>
                        </div>
                            :
                        <div className="geodir-category-location date fl-wrap">
                            <NavLink to={props.cardLink} className="map-item">
                                <img alt='img' src={window.location.origin + '/images/icons/time-red.svg'}
                                    style={{verticalAlign: 'sub', width: '14px', marginRight: '8px'}}/>
                                <span className={"date"}>
                                   {props.dates || props.dates ?
                                       props.dates
                                       :
                                       "N/A"
                                   }
                                </span>

                            </NavLink>
                        </div>
                        }

                     <div className="geodir-category-short-desc">
                        <span className="three-line-text">{props.description}</span>
                    </div>


                </div>
            </div>
        )
    };

    //Footer Payment Buttons
    renderFooterButtons = (props) => {

        return (
            <div className="geodir-category-footer fl-wrap">
                {
                    props.buttonVersion && props.buttonVersion === 2 ?
                        (
                            <TwoShadedButton
                                buttonText={props.buttonText === 0 ? "Free Event" : props.buttonText}
                                buttonLink={props.buttonLink ? props.buttonLink : ''}
                            />
                        ) :
                        (
                            <TwoShadedButtonBuy
                                buttonText={props.buttonText === 0 ? "Free Event" : props.buttonText}
                                buttonLink={props.buttonLink ? props.buttonLink : ''}
                            />
                        )
                }

            </div>
        )
    };

    /****************************** END ****************************/


    //Rendering Default Card Component
    render() {
        let props = this.props;

        return (
            <Col md={props.gridMd ? props.gridMd : 3}
                 className={'defaultCard'}>

                <article className="geodir-category-listing fl-wrap" style={{
                    /*minHeight: "430px",
                    maxHeight: "430px",*/
                    boxShadow: "0px 0px 10px 0.1px #e6e2e2"
                }}>

                    {this.renderEventBanner(props)}

                   <div className="geodir-category-content fl-wrap title-sin_item">

                        {this.renderEventData(props)}

                        {this.renderFooterButtons(props)}

                    </div>
                </article>
            </Col>
        )
    }
}

export default DefaultCard;