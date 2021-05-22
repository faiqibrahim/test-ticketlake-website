// Library
import React from 'react';
import {NavLink} from "react-router-dom";

const twoShadedButtonBuy = (props) => {
    return (
        <NavLink to={props.buttonLink} className={props.float ? 'btn color-bg float-btn' : 'btn color-bg full-width'}>
            {props.buttonText && props.buttonText}
            <i><b>Buy</b></i>
        </NavLink>
    );
};

export default twoShadedButtonBuy;