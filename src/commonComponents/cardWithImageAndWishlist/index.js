// Library
import React from 'react';
import {NavLink} from "react-router-dom";
// Components
import TwoShadedButton from '../../commonComponents/twoShadedButton';


const cardWithImageAndWishlist = (props) => {
    const {cardTitle, image, cardLink, wishlistLink, country, city, buttonText, onClick, buttonLink, cardAddress, isWishList, style, auth} = props;
    const hrefVal = "";

    return (
        <div className="listing-item custom-listing" style={style ? style : null}>
            <article className="geodir-category-listing fl-wrap">
                <div className="geodir-category-img">
                    <a href={cardLink} onClick={onClick}>
                        <img src={image ? image : window.location.origin + '/images/city/1.jpg'} alt={"img"}/>
                    </a>
                    <div className="listing-avatar wishlist-icon">
                        {(auth) ? (
                            <a href={hrefVal} onClick={wishlistLink}>
                                {(isWishList === true) ?
                                    (
                                        <i className='fas fa-heart' style={{color: 'red'}}/>
                                    ) :
                                    (
                                        <i className='far fa-heart'/>
                                    )}

                            </a>
                        ) : null}

                    </div>
                    {/*<div className="sale-window share-icon">
                        <i className='far fa-share-square'/>
                    </div>*/}
                    {buttonText === 0 &&
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
                                <a href={cardLink} onClick={onClick}>
                                    {cardTitle ? cardTitle : "Title"}
                                </a>
                            </h3>
                            <div className="geodir-category-location fl-wrap">
                                <NavLink to={cardLink} className="map-item">
                                    <i className="fa fa-map-marked-alt"/>
                                    {country || city ?
                                        country + city
                                        :
                                        "N/A"
                                    }
                                </NavLink>
                            </div>
                        </div>
                    </div>
                    <div className="card-description">
                        {cardAddress ? cardAddress : "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras eu augue a nibh interdum"
                        }
                    </div>

                    <div className="geodir-category-footer fl-wrap">
                        <TwoShadedButton
                            buttonLink={buttonLink ? buttonLink : ''}
                            buttonText={buttonText === 0 ? "Free Event" : buttonText}
                        />
                        {/* <TwoShadedButtonBuy
                            buttonText={buttonText ? buttonText : '' }
                            buttonLink={buttonLink? buttonLink : ''}
                        />*/}
                    </div>
                </div>
            </article>
        </div>
    );
};

export default cardWithImageAndWishlist;