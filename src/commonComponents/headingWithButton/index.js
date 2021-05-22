// Library
import React from 'react';
import {NavLink} from "react-router-dom";

const headingWithButton = (props) => {
    return (
        <div className="dashboard-content fl-wrap">
            <div className="box-widget-item-header">
                <h3 style={{width: 'auto', float: 'left', marginTop:'10px'}}> {props.heading}</h3>
                {props.link ? (
                        <NavLink className={'btn btn-danger buttonDefault'} to={props.link}>
                            {props.buttonText}
                        </NavLink>
                    )
                    :
                    (
                        <button className={'btn btn-danger buttonDefault defaultBackground'} onClick={props.clicker}>{props.buttonText}</button>
                    )

                }

            </div>


        </div>
    );
};

export default headingWithButton;