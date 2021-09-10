import React, { Component } from "react";
import { withRouter } from "react-router-dom";

import { prepareHoldData } from "./checkout-util";
import Loader from "../../commonComponents/loader";
import PaymentProcessor from "../../commonComponents/PaymentProcessor";
import axios from "../../utils/axios";
import Timer from "../../commonComponents/Timer";
import CheckoutSuccess from "./CheckoutSuccess";
import CheckoutFailed from "./CheckoutFailed";
import { getPaymentInfo } from "./payment-info-provider";
import InvoiceDetail from "../../commonComponents/invoiceDetail";
import CheckoutReceipt from "./CheckoutReceipt";

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
        console.log("Purchase successful", data);
        this.setState({ orderSuccessful: true, orderDetails: data.data });
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

    if (loading) return <Loader />;
    else if (!reservationId) return <div>Could not hold tickets</div>;
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
        <div className={"expiry-msg"}>
          Your reservation will expire in
          <Timer
            style={{ fontWeight: "bold", color: "#EC1B23" }}
            minutes={15}
            onComplete={this.onFailure}
          />
        </div>
        <PaymentProcessor
          {...info}
          onSuccess={this.onSuccess}
          onFailure={this.onFailure}
        />
      </>
    );
  }
}

export default withRouter(Checkout);
