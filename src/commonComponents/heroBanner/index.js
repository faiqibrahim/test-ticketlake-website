// Library
import React from 'react';

const heroBanner = (props) => {

    return (
        <section className="hero-section" data-scrollax-parent="true">
            <div className="hero-parallax">
                <div className="bg"
                     style={
                         {
                             transform: props.transformStyle,
                             backgroundImage: 'url( "' + props.backgroundImage + '")'
                         }
                     }/>
                <div className="overlay op7"/>
            </div>
            {props.children}
        </section>
    );
};

export default heroBanner;