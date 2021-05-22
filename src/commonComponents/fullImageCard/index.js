// Library
import React from 'react';
import {NavLink} from "react-router-dom";

const fullImageCard = (props) => {
    let {fullImageClass} = props;
    let ratingDisplay = [];
    for (var i = 0; i < props.rating; i++) {
        ratingDisplay.push(<i className='fa fa-star'/>);
    }


    return (
        <div className="slick-slide-item">
            <div className="hotel-card fl-wrap title-sin_item">
                <div className="full-image-card-post card-post">
                    <NavLink to={props.cardLink ? props.cardLink : '/'}>
                        <img className={fullImageClass && fullImageClass}
                             src={props.cardImage ? props.cardImage : '/images/card_3.png'} alt={'img'}/>
                    </NavLink>
                    {/* <div className="listing-counter">
                        {props.price}
                    </div> */}
                    <div className="geodir-category-opt">
                        {/* <div className="listing-rating card-popup-rainingvis">
                            {ratingDisplay}
                        </div> */}
                        <h4 className="title-sin_map">
                            <NavLink to={props.cardLink ? props.cardLink : '/'}>
                                {props.items}
                            </NavLink>
                        </h4>
                        <div className="geodir-category-location">
                            {props.tags && props.tags.map((tag, i) => {
                                return (
                                    <span className="single-map-item space" key={i}>
                                        {tag.name} {i === props.tags.length - 1 ? " " : "-"}
                                    </span>
                                )
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default fullImageCard;