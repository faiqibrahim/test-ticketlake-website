// Library
import React from 'react';
import './topHeadingComponent.css';

const styles = {
    headingWrap: {
        marginLeft: '9px'
    },
    heading: {
        fontWeight: 700,
        fontSize: '23px',
        color: 'black',
        textAlign: 'left'
    },
    wrapper: {
        marginTop: '64px',
        padding: '0px 60px'
    },
    textRed: {
        color: '#EC1C24',
        fontSize: '16px',
        padding: '7px 34px 0px 0px'
    }
    
};
const TopHeadingComponent = (props) => {
    return (
        <div className="component-wrp">
            <div className="heading-wrp">
                <div className="heading-left" style={styles.heading}>
                    {props.title}
                </div>
                {
                    props.array && props.array.length > 3 ?
                        <div className="heading-right" style={styles.textRed}
                                onClick={props.onClick}
                        >
                            See More
                        </div> : null
                }
            </div>
            <div className="Card-container">
                {props.children}
            </div>
        </div>
    );
};

export default TopHeadingComponent;