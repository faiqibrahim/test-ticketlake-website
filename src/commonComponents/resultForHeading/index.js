// Library
import React from 'react';

const resultForHeading = (props) => {
    const {firstText, secondText, thirdText } = props;
    return (
        <div className="list-main-wrap-title single-main-wrap-title result-heading">
            <h2>
                {firstText}
            <span>{secondText}</span>
            {thirdText}</h2>
        </div>
    );
};

export default resultForHeading;