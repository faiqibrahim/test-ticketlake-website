// Library
import React from 'react';
// Components

const sectionHeading = (props) => {
    return (

        <div className={props.mainClass ? props.mainClass : "section-title"} style={props.style?props.style:null}>
            <h2 style={{fontSize: props.fontSize + 'px', color: props.headingColor}}>{props.heading}</h2>
            <span className={`section-separator ${props.separatorClass && props.separatorClass}`}/>
            <p style={{color: props.textColor}}>{props.text}</p>
        </div>
    );
};

export default sectionHeading;