import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

import { prepareHoldData } from "./checkout-util";
import Loader from "../../commonComponents/loader";
import PaymentProcessor from "../../commonComponents/PaymentProcessor";
import axios from "../../utils/axios";
import Timer from "../../commonComponents/Timer";
import CheckoutSuccess from "./CheckoutSuccess";
import CheckoutFailed from "./CheckoutFailed";
import { getPaymentInfo } from "./payment-info-provider";
import CheckoutReceipt from "./CheckoutReceipt";
import { setUserWallet } from "../../redux/user/user-actions";

class Checkout extends Component {
  state = {
    loading: true,
    reservationId: null,
    orderSuccessful: false,
    orderFailed: false,
    showInvoice: false,
  };

  componentDidMount() {
    this.holdTickets()
      .then((reservationId) => {
        this.setState({ loading: false, reservationId });
      })
      .catch((error) => {
        console.error("Could not reserve seats", error);
        this.setState({ loading: false });
      });
  }

  holdTickets = async () => {
    const holdData = prepareHoldData();
    const { data } = await axios.post("/reserve/tickets", holdData, "v2");
    return data.data.reservationId;
  };

  onSuccess = (transactionIds) => {
    const { reservationId } = this.state;

    axios
      .post("/purchase/tickets", { transactionIds, reservationId }, "v2")
      .then(({ data }) => {
        const { setUserWallet } = this.props;
        const { consumerWallet, data: orderDetails } = data;
        if (consumerWallet) {
          setUserWallet(consumerWallet);
        }

        this.setState({ orderSuccessful: true, orderDetails });
      })
      .catch(this.onFailure);
  };

  onFailure = (error) => {
    console.error("Could not checkout", error);
    this.setState({ orderFailed: true });
  };

  showInvoice = () => {
    const { showInvoice } = this.state;
    this.setState({ showInvoice: !showInvoice });
  };

  render() {
    const {
      loading,
      reservationId,
      orderSuccessful,
      orderFailed,
      orderDetails,
      showInvoice,
    } = this.state;

    const { customSeatingPlan } = this.props;
    if (loading) return <Loader />;
    else if (!reservationId && !customSeatingPlan)
      return <div>Could not hold tickets</div>;
    else if (showInvoice)
      return (
        <CheckoutReceipt
          orderDetails={orderDetails}
          closeModalCB={this.showInvoice}
        />
      );
    else if (orderFailed) return <CheckoutFailed />;
    else if (orderSuccessful)
      return <CheckoutSuccess showInvoice={this.showInvoice} />;

    const info = getPaymentInfo();

    return (
      <>
        {reservationId && (
          <div className={"expiry-msg"}>
            Your reservation will expire in
            <Timer
              style={{ fontWeight: "bold", color: "#EC1B23" }}
              minutes={15}
              onComplete={this.onFailure}
            />
          </div>
        )}
        <PaymentProcessor
          {...info}
          onSuccess={this.onSuccess}
          onFailure={this.onFailure}
        />
      </>
    );
  }
}

const connected = connect(null, { setUserWallet })(Checkout);
export default withRouter(connected);
