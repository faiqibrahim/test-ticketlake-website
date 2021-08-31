import React, {Component} from "react";
import {withRouter} from "react-router-dom";
import UserPagesContainer from "../../commonComponents/userPagesContainer";
import {BreadcrumbsItem} from "react-breadcrumbs-dynamic";
import PaymentProcessor from "../../commonComponents/PaymentProcessor";
import {getTopUpInfo} from "./topup-info-provider";
import axios from '../../utils/axios';
import {NotificationManager} from "react-notifications";

class UserWalletTopUp extends Component {

    state = {
        loading: false
    }

    onTopupSuccess = (transactionIds) => {
        const {currency} = getTopUpInfo();

        axios.post('/purchase/wallet-balance', {transactionIds, currency}, 'v2')
            .then(() => {
                this.props.history.goBack();
            })
            .catch(this.onTopupFailure)
    }

    onTopupFailure = (error) => {
        console.error(error);
        this.props.history.goBack();
        NotificationManager.error("Could not process payment", "", 3000);
    }

    render() {
        const breadCrumbs = [];
        breadCrumbs.push(
            <BreadcrumbsItem glyph="home" to="/">
                Home Page
            </BreadcrumbsItem>
        );
        breadCrumbs.push(
            <BreadcrumbsItem to="/user/wallet">User Wallet</BreadcrumbsItem>
        );

        const info = getTopUpInfo();

        if (!info.amount) {
            this.props.history.goBack();
        }

        return (
            <div id="wrapper">
                <div className="content">
                    <UserPagesContainer page={"wallet"} breadcrumbs={breadCrumbs}>
                        <section className="middle-padding wallet-wrapper">
                            <div className="container">
                                <div className="dasboard-wrap fl-wrap">
                                    <div className="box-widget-item-header">
                                        <h3> Wallet Top Up</h3>
                                    </div>
                                    <PaymentProcessor {...info} onSuccess={this.onTopupSuccess}
                                                      onFailure={this.onTopupFailure}/>
                                </div>
                            </div>
                        </section>
                    </UserPagesContainer>
                </div>
            </div>
        );
    }
}

export default withRouter(UserWalletTopUp);
