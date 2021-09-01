// Library
import React from 'react';
import {NavLink} from "react-router-dom";

const twoShadedButton = (props) => {
    return (
        <NavLink to={props.buttonLink} className={props.float ? 'btn color-bg btn-new float-btn float-unset' : 'btn color-bg btn-new '}>
            {props.buttonText}
            <i className={props.buttonIcon ? props.buttonIcon : 'fa fa-caret-right'}/>
        </NavLink>
    );
};

export default twoShadedButton;