// Library
import React, {Component} from 'react';

class ScrollComponent extends Component {

    constructor(props) {
        super(props);
        this.myRef = React.createRef();
    }

    componentDidMount() {
        this.myRef.current.scrollTo(0, 0);
    }

    render() {
        return (
            <div ref={this.myRef}>
                {this.props.children}
            </div>
        );
    }

}


export default ScrollComponent;