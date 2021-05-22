import React from 'react';
import {withRouter} from 'react-router-dom';


import './CatergoryBox.css'

const CatergoryBox = (props) => {

    return(
            <div className="CategoryBoxCol" onClick={props.clicked}>
                <div className="boxContent">
                    <div className="boxTitle">
                        {props.name}
                    </div>
                </div>
            </div>
    )
}

export default withRouter(CatergoryBox);