// Library
import React, {Component} from 'react';
// Redux
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";

class WishListCheck extends Component {

    checkWishList = (wishList) => {
        if(this.props.wishLists && this.props.wishLists !== '' &&  this.props.wishLists.includes(wishList.eventSlotId)) {
            this.props.cb(true);
        } else {
            this.props.cb(false);
        }
    };
    checkAuth = () => {
        return !!this.props.auth;
    };

    render() {
        if (!this.checkAuth()) {
            return (
                <>
                    {this.props.children}
                </>
            )
        } else {
            return (
                <>
                    {this.checkWishList(this.props.wishlist)}
                    {this.props.children}
                </>
            )
        }


    }
}

const mapStateToProps = (state) => {
    return {
        auth: state.user.authenticated,
        wishLists: state.wishlist.wishListIds
    }
};
const connectedComponent = connect(mapStateToProps)(WishListCheck);
export default withRouter(connectedComponent);