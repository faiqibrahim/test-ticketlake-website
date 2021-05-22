// Library
import React from 'react';

const pageHeadingWithBanner = (props) => {
    return (
        <section className="color-bg no-padding">
            <div className="wave-bg wave-bg2"/>
            <div className="container">
                <div className="flat-title-wrap">
                    <h2>
                        <span>{props.heading}</span>
                    </h2>
                    <span className="section-separator"/>
                    <h4>
                       {props.description}
                    </h4>
                </div>
            </div>
        </section>

    )
};

export default pageHeadingWithBanner;