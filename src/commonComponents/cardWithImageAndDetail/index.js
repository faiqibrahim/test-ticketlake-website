// Library
import React from 'react';
import {NavLink} from "react-router-dom";
// Components
import TwoShadedButton from '../../commonComponents/twoShadedButton';

const cardWithImageAndDetail = (props) => {

    const {buttonText, image, title, country, agenda, onClick} = props;

    return (
        <div className="listing-item custom-listing" >
            <article className="geodir-category-listing fl-wrap">
                <div className="geodir-category-img">
                    <NavLink to={"#"}>
                        <img src={image? image : window.location.origin + '/images/city/1.jpg'} alt={"image"}/>
                    </NavLink>
                    <div className="listing-avatar wishlist-icon">
                        <NavLink to={"#"}>
                            <i className='far fa-heart'/>
                        </NavLink>
                    </div>
                    <div className="sale-window share-icon">
                        <i className='far fa-share-square'/>
                    </div>
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
                                <NavLink to={"#"}>
                                    {title? title : "Title"}
                                </NavLink>
                            </h3>
                            <div className="geodir-category-location fl-wrap">
                                <NavLink to={"#"} className="map-item">
                                    <i className="fa fa-map-marked-alt"/>
                                    <span className={"date"}>
                                    {country? country : "Country" }
                                </span>
                                </NavLink>
                            </div>
                        </div>
                    </div>
                    <p>{agenda? agenda : "Agenda"}</p>

                    <div className="geodir-category-footer fl-wrap">
                        <TwoShadedButton
                            onClick={onClick}
                            buttonText={buttonText === 0 ? "Free Event" : buttonText}
                        />
                    </div>
                </div>
            </article>
        </div>
    );
};

export default cardWithImageAndDetail;