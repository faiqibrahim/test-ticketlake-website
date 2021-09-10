import React from "react";
import Loader from "../../../loader";
import axios from "../../../../utils/axios";
import SplitPaymentDialog from "./SplitPaymentDialog";
import ConfirmPaymentDialog from "./ConfirmPaymentDialog";

class WalletPaymentPrompt extends React.Component {
  state = {
    loading: false,
  };

  processPayment = () => {
    const {
      balanceInRequestedCurrency,
      type,
      amount,
      currency,
      purpose,
      onPaymentSuccessful,
      onPaymentFailure,
      isSplitPayment,
      splitPayment,
      changeProp
    } = this.props;

    const transactionAmount = Math.min(balanceInRequestedCurrency, amount);
    this.setState({ loading: true }, () => {
      axios
        .post(
          "/transaction/wallet",
          { amount: transactionAmount, currency, transactionType: purpose },
          "v2"
        )
        .then(({ data }) => {
          const { _id } = data.data;
          isSplitPayment
            ? splitPayment(type, transactionAmount, _id)
            : onPaymentSuccessful(type, _id);
        })
        .catch((error) => {
          const { data } = error.response;
          if (data.info) {
            const { consumerBalance } = data.info;
            changeProp('balance', consumerBalance, () => {
              //TODO Show Error Message
              this.cancelPayment();
            })
          } else {
            onPaymentFailure(type, error);
          }
        });
    });
  };

  cancelPayment = () => {
    this.props.setActiveComponent(null);
  };

  render() {
    if (this.state.loading) return <Loader />;

    if (this.props.isSplitPayment)
      return (
        <SplitPaymentDialog
          onClick={this.processPayment}
          onCancel={this.cancelPayment}
        />
      );
    else
      return (
        <ConfirmPaymentDialog
          onClick={this.processPayment}
          onCancel={this.cancelPayment}
        />
      );
  }
}

export default WalletPaymentPrompt;
