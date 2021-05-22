// Library
import React from 'react';
import {NavLink} from "react-router-dom";
import Moment from 'react-moment';

const animatedCard = (props) => {
    return (
        <NavLink to={props.cardLink ? props.cardLink : '/'}>
            <div key={props.item._id} className={props.cardClass ? props.cardClass : "gallery-item"}>
                <div className="grid-item-holder">
                    <div className="listing-item-grid">
                        <img src={'/images/badge.svg'} className={'cardBadge'} alt={'img'}/>
                        <img className="custom-images" src={props.cardImage? props.cardImage : 'http://newmoonriverinn.com/wp-content/uploads/2018/10/club-one-casino-1.jpg'} alt={'img'}/>
                        <div className="listing-item-cat">
                            <h3>{props.eventTitle}</h3>
                            <div className="clearfix"/>
                            <p>{props.categories}<br/><Moment format="ll">{props.date}</Moment></p>
                        </div>
                        {props.buttonText === 0 ?
                            <span className={"free-tag promoted-card-tag"}>
                                Free
                            </span>:null
                        }
                    </div>
                </div>
            </div>
        </NavLink>
    );
};

export default animatedCard;