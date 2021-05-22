// Library
import React from 'react';

const cardWithIcon = (props) => {
    return (
        <div className="process-item big-pad-pr-item">
            <span className="process-count"> </span>
            <div className="time-line-icon">
                <img src={props.cardIcon} alt="icon" style={props.cardIconStyle}/>
            </div>
            <h4><a href={props.cardLink}> {props.cardTitle}</a></h4>
            <p>{props.cardDescription}</p>
        </div>
    );
};

export default cardWithIcon;