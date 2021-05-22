// Library
import React from 'react';
import {HEADING_FONT} from '../../utils/css-utils';

const Heading = (props) => {
    return (

        <div className={props.mainClass ? props.mainClass : "section-title"} style={props.style?props.style:null}>
            <h2 style={{fontSize: props.fontSize + 'px', color: props.headingColor, fontFamily: HEADING_FONT}}>{props.heading}</h2>
            <span style={{height:'4px' , width:'60px', background:'lightGrey', float:'left', borderRadius:'2px', margin: '10px 0px'}}/>
            {props.text ? 
                <p style={{color: props.textColor, display:'inline-block', width: '100%',fontWeight:"bold"}}>{props.text}</p>
                : 
                null
            }
        </div>
    );
};

export default Heading;