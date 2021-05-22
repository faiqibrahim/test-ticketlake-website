import React from 'react';
import './style.css';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';


const transition = (props) => {
    return (
        <ReactCSSTransitionGroup
            transitionName="member"
            transitionAppear={true}
            transitionAppearTimeout={2000}
            transitionEnter={false}
            transitionLeave={false}
        >
            {props.children}
        </ReactCSSTransitionGroup>
    );
};

export default transition;