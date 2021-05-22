// Library
import React from 'react';

const resultForHeading = (props) => {
    return (
        <div className="list-main-wrap-title single-main-wrap-title result-heading">
            <h2>
                {props.firstText}
            <span>{props.secondText}</span>
            {props.thirdText}</h2>
        </div>
    );
};

export default resultForHeading;