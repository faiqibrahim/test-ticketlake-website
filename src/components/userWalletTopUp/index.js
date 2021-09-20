import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import UserPagesContainer from "../../commonComponents/userPagesContainer";
import { BreadcrumbsItem } from "react-breadcrumbs-dynamic";
import PaymentProcessor from "../../commonComponents/PaymentProcessor";
import { getTopUpInfo } from "./topup-info-provider";
import axios from "../../utils/axios";
import { NotificationManager } from "react-notifications";
import Loader from "../../commonComponents/loader";

class UserWalletTopUp extends Component {
  state = {
    loading: false,
  };

  onTopupSuccess = (transactionIds) => {
    const { currency } = getTopUpInfo();

    this.setState({ loading: true }, () => {
      axios
        .post("/purchase/wallet-balance", { transactionIds, currency }, "v2")
        .then(() => {
          this.props.history.goBack();
        })
        .catch(this.onTopupFailure);
    });
  };

  onTopupFailure = (error) => {
    console.error(error);
    this.props.history.goBack();
    NotificationManager.error("Could not process payment", "", 3000);
  };

  render() {
    const { loading } = this.state;
    const breadCrumbs = [];
    breadCrumbs.push(
      <BreadcrumbsItem key={"home"} glyph="home" to="/">
        Home Page
      </BreadcrumbsItem>
    );
    breadCrumbs.push(
      <BreadcrumbsItem key={"wallet"} to="/user/wallet">User Wallet</BreadcrumbsItem>
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
                  {loading ? (
                    <Loader />
                  ) : (
                    <PaymentProcessor
                      {...info}
                      onSuccess={this.onTopupSuccess}
                      onFailure={this.onTopupFailure}
                    />
                  )}
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
