import React from 'react';

class ScrollButton extends React.Component {
    constructor (props){
        super(props);
        this.state = {
            intervalId: 0
        };
    }

    scrollStep = ()=> {
        if (window.pageYOffset === 0) {
            clearInterval(this.state.intervalId);
        }
        window.scroll(0, window.pageYOffset - this.props.scrollStepInPx);
    };

    scrollToTop = ()=>{
        let intervalId = setInterval(this.scrollStep.bind(this), this.props.delayInMs);
        this.setState({intervalId: intervalId});
    };

    render() {
        return <a style={{cursor:"pointer"}} className="back-to-top" onClick={this.scrollToTop}>
                <i className="fa fa-chevron-up"/>
            </a>;

    }
}

export default ScrollButton