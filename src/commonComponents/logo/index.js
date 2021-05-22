// Library
import React from 'react';
import {NavLink} from "react-router-dom";

const logo = (props) => {
    return (
        <div className="logo-wrp">
            <NavLink to={props.logoLink}>
                <img src={props.logoImage} alt={'logo'}/>
            </NavLink>
        </div>
    );
};

export default logo;