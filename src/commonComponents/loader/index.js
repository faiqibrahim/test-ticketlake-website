import React from 'react';
import Loader from "react-loader-spinner";

const loader = (props) => {
    let _props = {
        type: props ? props.style && props.style.type ? props.style.type : "Oval" : null,
        color: props ? props.style && props.style.color ? props.style.color : "#EC1C24" : null,
        height: props ? props.style && props.style.height ? props.style.height : "40px" : null,
        width: props ? props.style && props.style.width ? props.style.width : "40px" : null,
        ...props
    };


    return (
        <div style={{textAlign: 'center',
            marginBottom: props ? props.style && props.style.marginBottom ? props.style.marginBottom : "5%" : null,
            marginTop: props ? props.style && props.style.marginTop ? props.style.marginTop : "5%" : null,
            marginLeft: props ? props.style && props.style.marginLeft ? props.style.marginLeft : "" : null}}>
            <Loader {..._props} />
        </div>
    );
};


export default loader;
