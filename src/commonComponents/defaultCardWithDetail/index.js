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

const defaultCardWithDetail = (props) => {
    return (
        <Col
            lg={props.gridLg ? props.gridLg : 3}
            md={props.gridMd ? props.gridMd : 6}
            sm={props.gridSm ? props.gridSm : 12}
            className={'defaultCard'}>
            <article className="geodir-category-listing fl-wrap defaultImageCard">
                <div className="geodir-category-img">
                    <a href={props.cardLink} onClick={props.onClick}>
                        <img src={props.image ? props.image : window.location.origin + '/images/city/1.jpg'}
                             alt={"img"}/>
                    </a>
                    <div className="listing-avatar wishlist-icon">
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
                    {(props.sharing) && (
                        <div className="sale-window share-icon" onClick={() => props.sharing(props.id)}>
                            <img alt='img' src={window.location.origin + '/images/icons/share-white.svg'}
                                 />
                        </div>
                    )}
                    {props.buttonText === 0 &&
                        (
                            <span className={"free-tag"}>
                                Free
                            </span>
                        )
                    }
                </div>
                <div className="geodir-category-content fl-wrap title-sin_item">
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
                            <div className="geodir-category-location fl-wrap">
                                <NavLink to={props.cardLink} className="map-item">
                                    <img alt='img' src={window.location.origin + '/images/icons/location-red.svg'}
                                         style={{float: 'left', width: '14px', marginRight: '8px'}}/>
                                    <span className={"date"}>
                                    {props.venueName ? props.venueName
                                        :
                                        "N/A"
                                    }
                                </span>

                                </NavLink>
                            </div>
                            <div className="geodir-category-location fl-wrap">
                                <NavLink to={props.cardLink} className="map-item">
                                    <img alt='img' src={window.location.origin + '/images/icons/time-red.svg'}
                                         style={{float: 'left', width: '14px', marginRight: '8px'}}/>
                                    <span className={"date"}>
                                    {props.dates || props.dates ?
                                        props.dates
                                        :
                                        "N/A"
                                    }
                                </span>

                                </NavLink>
                            </div>
                            {props.description ? (
                                <div className="geodir-category-short-desc">
                                    <span className="three-line-text">{props.description ? props.description : null}</span>
                                </div>
                            ) : null}


                        </div>
                    </div>

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
                </div>
            </article>
        </Col>
    )


};

export default defaultCardWithDetail;