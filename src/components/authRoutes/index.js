// Library
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import {Route, Switch} from 'react-router-dom';
// Components
import BuyTicketPage from "../buyTicketPage";

class AuthRoutes extends Component {

    returnAuthRoutes = () => {
        if (this.props.auth) {
            let routeArray = [];
            routeArray.push(<Route path="/buy-ticket/:id" name={"BuyTicket"} component={BuyTicketPage}/>);
            return routeArray;
        }
        return null;

    };

    render() {
        return (
            <Switch>
                {this.returnAuthRoutes()}
            </Switch>
        );
    }
}


const mapStateToProps = (state) => {
    return {
        auth: state.user.authenticated
    }
};
const connectedComponent = connect(mapStateToProps)(AuthRoutes);

export default withRouter(connectedComponent);