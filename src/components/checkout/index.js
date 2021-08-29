// library
import React, {Component} from "react";
import Loader from "../../commonComponents/loader";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import {NotificationManager} from "react-notifications";
import swal from "@sweetalert/with-react";

import {getPaymentInfo} from "./payment-info-provider";
import PaymentProcessor from "../../commonComponents/PaymentProcessor";

import {
    setClientToken,
    checkout,
    setSplitPayment,
    ravePayPaymentRequest,
    seatsCheckout,
} from "../../redux/ticket/ticket-actions";
import axios from "../../utils/axios";
import CardViewWithImgAndName from "../../commonComponents/cardViewWithImgAndName";
import {formatCurrency, getSeatCheckoutProps} from "../../utils/common-utils";


class Checkout extends Component {
    instance;

    state = {
        clientToken: null,
        ravePayModalOpen: false,
        modalOpen2: false,
        focusAfterClose: true,
        setFocusAfterClose: true,
        orderId: "80c6e5b5638e443caaa988144c2a599b",
        checkoutUrl: "",
        postData: {},
        price: 0.01,
        conversionRatesOnCheckout: 0,
        isLoading: true,
        showSplitBlock: false,
        paymentOption: "WALLET",
    };


    buyWithoutAnyMethod() {
        const {customSeatingPlan, assignedSeats, event} = this.props;

        swal({
            title: "Checkout Summary",
            text: "Please review your invoice",
            content: (
                <div>
                    <div className="billSummary">
                        <div className="col-md-12">
                            <div className="ticketTotalPrice">
                                <div className="row">
                                    <div className="col-md-12">
                                        <strong>Do you want to proceed?</strong>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ),
            buttons: true,
        }).then((res) => {
            if (res) {
                if (customSeatingPlan) {
                    this.props.checkout(
                        this.props.assignedSeats,
                        this.props.assignedSeatsForDisplay,
                        this.props.event,
                        null,
                        this.props.passesAssignedSeats,
                        this.props.passesAssignedSeatsForDisplay,
                        JSON.parse(localStorage.getItem("conversionRatesOnCheckout")),
                        this.props.setStepCB
                    );
                } else {
                    const checkoutProps = getSeatCheckoutProps(assignedSeats, event);
                    seatsCheckout(checkoutProps, this.props.setStepCB);
                }
            } else {
                swal("Checkout has been canceled!");
            }
        });
    }

    buyWithoutPayPal() {
        const {
            checkout,
            seatsCheckout,
            customSeatingPlan,
            event,
            assignedSeats,
        } = this.props;
        const {paymentOption} = this.state;
        swal({
            title: "Checkout Summary",
            text: "Please review your invoice",
            content: (
                <div>
                    <div className="billSummary">
                        <div className="col-md-12">
                            <div className="ticketTotalPrice">
                                <div className="row">
                                    <div className="col-md-12">
                                        <p className="Checkout-final-msg">
                                            The total amount will be deducted from your wallet. Do you
                                            want to proceed?
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ),
            buttons: true,
        }).then((res) => {
            if (res) {
                if (customSeatingPlan) {
                    checkout(
                        this.props.assignedSeats,
                        this.props.assignedSeatsForDisplay,
                        event,
                        null,
                        this.props.passesAssignedSeats,
                        this.props.passesAssignedSeatsForDisplay,
                        JSON.parse(localStorage.getItem("conversionRatesOnCheckout")),
                        this.props.setStepCB
                    );
                } else {
                    const checkoutProps = getSeatCheckoutProps(assignedSeats, event);
                    checkoutProps.paymentOption = paymentOption;

                    seatsCheckout(checkoutProps, this.props.setStepCB);
                }
            } else {
                swal("Checkout has been canceled!");
            }
        });
    }

    onSuccess = (transIds) => {
        this.props.setStepCB();
    }

    onFailure = (error) => {

    }

    render() {
        const info = getPaymentInfo();

        return (
            <PaymentProcessor {...info} onSuccess={this.onSuccess} onFailure={this.onFailure}/>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        clientToken: state.ticket.clientToken,
        totalBill: state.ticket.totalBill,
        event: state.ticket.event,
        wallet: state.user.userWallet,
        assignedSeats: state.ticket.assignedSeats,
        assignedSeatsForDisplay: state.ticket.assignedSeatsForDisplay,
        currency: state.ticket.ticketCurrency,
        passesAssignedSeats: state.ticket.passesAssignedSeats,
        passesAssignedSeatsForDisplay: state.ticket.passesAssignedSeatsForDisplay,
        ravePayResponse: state.ticket.ravePayResponse,
        error: state.ticket.error,
        errorMessage: state.ticket.errorMessage,
    };
};

const connectedComponent = connect(mapStateToProps, {
    setClientToken,
    checkout,
    setSplitPayment,
    ravePayPaymentRequest,
    seatsCheckout,
})(Checkout);
export default withRouter(connectedComponent);
