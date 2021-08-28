import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { showContentOutsideMainWrapper } from "../../redux/common/common-actions";
import { setTopUpAmount } from "../../redux/user/user-actions";
import { showCheckoutDialogue } from "../../redux/ticket/ticket-actions";
import StatusDialogue from "../checkoutDialogue/statusDialogue";
import SuccessDialogue from "../checkoutDialogue/successDialogue";
import FailureDialogue from "../checkoutDialogue/failureDialogue";
import TransactionDialogue from "../../components/transactionModal";
import { Modal } from "reactstrap";

import "./customModalStyle.css";

let ticketArrayWithKey;
let passesArrayWithKey;

class CustomModal extends Component {
  toggle = () => {
    this.props.showContentOutsideMainWrapper(false);
  };

  render() {
    let tickets,
      passes,
      couponInfo,
      eventDetails,
      couponSign,
      transactionId,
      transactionAmount,
      type,
      paymentMethod,
      walletDeductedAmount,
      createdAt,
      lastBalance;

    const { wallet } = this.props;
    if (this.props.orderItemDetails) {
      let data = this.props.orderItemDetails;
      tickets = data.tickets;
      passes = data.passes;
      couponInfo = data.couponInfo;
      eventDetails = data.eventDetails;
      couponSign =
        couponInfo && couponInfo.discountType === "fixed"
          ? wallet.currency
          : "%";
    }

    if (this.props.orderDetails) {
      let data = this.props.orderDetails;
      transactionId = data.transactionId;
      transactionAmount = data.transactionAmount;
      type = data.type;
      paymentMethod = data.paymentMethod;
      walletDeductedAmount = data.walletDeductedAmount;
      createdAt = data.createdAt;
      lastBalance = data.lastBalance;
    }

    if (tickets !== null && tickets !== undefined) {
      let ticketsArray = [];
      for (let key of Object.keys(tickets)) {
        ticketsArray.push(key);
      }
      ticketArrayWithKey = ticketsArray;
    }

    if (passes !== null && passes !== undefined) {
      let passesArray = [];
      for (let passesKey of Object.keys(passes)) {
        passesArray.push(passesKey);
      }
      passesArrayWithKey = passesArray;
    }

    const onTransactionCrossClick = () => {
      this.props.showContentOutsideMainWrapper(true);
      this.props.showCheckoutDialogue({ successDialogue: true });
    };

    const onCustomModalClick = () => {
      this.props.setTopUpAmount(0);
      this.props.showContentOutsideMainWrapper(false);
      this.props.history.push("/user/wallet");
    };

    return (
      <>
        {this.props.contentOutsideMainWrapper ? (
          <>
            {this.props.transactionDialogue ? (
              <Modal
                isOpen={this.props.transactionDialogue}
                toggle2={this.toggle}
                className="transaction-modal"
              >
                <TransactionDialogue
                  onCrossClick={() => onTransactionCrossClick()}
                  transactionAmount={transactionAmount}
                  transactionDate={createdAt}
                  paymentMethod={paymentMethod}
                  eventName={eventDetails && eventDetails.eventTitle}
                  transactionStatus={"Completed"}
                  transactionId={transactionId}
                  ticketsArr={tickets}
                  ticketsArrWithKey={ticketArrayWithKey}
                  passesArr={passes}
                  passesArrWithKey={passesArrayWithKey}
                  lastBalance={lastBalance}
                  amountDeducted={walletDeductedAmount}
                  paymentType={type}
                  currency={wallet.currency || ""}
                  couponApplied={
                    couponInfo && couponInfo.discountValue + couponSign
                  }
                />
              </Modal>
            ) : (
              <div
                className="custom-modal custom-fade show custom-modal-open"
                onClick={
                  this.props.topUpAmount && this.props.successDialogue
                    ? () => {
                        onCustomModalClick();
                      }
                    : null
                }
                role="dialog"
                tabIndex="-1"
                style={{ display: "block" }}
              >
                <div
                  className={
                    this.props.topUpAmount && this.props.successDialogue
                      ? "custom-modal-dialog-top-margin"
                      : "custom-modal-dialog"
                  }
                  role="document"
                >
                  <div className="custom-modal-content">
                    <div className="custom-modal-body">
                      {this.props.statusDialogue ? <StatusDialogue /> : null}
                      {this.props.successDialogue ? <SuccessDialogue /> : null}
                      {this.props.failureDialogue ? <FailureDialogue /> : null}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </>
        ) : null}
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    contentOutsideMainWrapper: state.common.contentOutsideMainWrapper,
    statusDialogue: state.ticket.statusDialogue,
    successDialogue: state.ticket.successDialogue,
    failureDialogue: state.ticket.failureDialogue,
    transactionDialogue: state.ticket.transactionDialogue,
    orderItemDetails: state.ticket.orderItemDetails,
    orderDetails: state.ticket.orderDetails,
    topUpAmount: state.user.topUpAmount,
    wallet: state.user.userWallet,
  };
};

const connectedComponent = connect(mapStateToProps, {
  showContentOutsideMainWrapper,
  showCheckoutDialogue,
  setTopUpAmount,
})(CustomModal);
export default withRouter(connectedComponent);
