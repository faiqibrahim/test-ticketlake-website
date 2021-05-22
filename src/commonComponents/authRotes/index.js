// Library
import React, {Component} from "react";
import {withRouter} from 'react-router-dom';
// Component
import Loader from '../../commonComponents/loader';
// Redux
import {connect} from 'react-redux';
// Redux Action
import {setRedirectTo} from '../../redux/user/user-actions'

class AuthRoutes extends Component {
    state = {
        processing: true
    };

    componentWillMount() {
        if (!this.props.auth) {
            sessionStorage.setItem('redirectTo', this.props.history.location.pathname);
            this.props.setRedirectTo(this.props.history.location.pathname);
            this.props.history.push('/authentication');
        } else {
            this.setState({processing: false});
        }
    }

    render() {
        if (this.state.processing) {
            return (
                <Loader/>
            )
        } else {
            return (
                <>
                    {this.props.children}
                </>

            )
        }
    }
}

const mapStateToProps = (state) => {
    return {
        auth: state.user.authenticated,
    }
};
const connectedComponent = connect(mapStateToProps, {setRedirectTo})(AuthRoutes);
export default withRouter(connectedComponent);