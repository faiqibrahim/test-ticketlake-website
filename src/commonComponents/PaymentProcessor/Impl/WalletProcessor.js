import React, { Component } from "react";
import { convertAmount, formatCurrency } from "../../../utils/common-utils";
import walletImg from "../assets/Wallet.svg";
import WalletPaymentPrompt from "../components/Wallet/WalletPaymentPrompt";
import styles from "../styles.module.css";

class WalletProcessor extends Component {
  state = {
    balanceInRequestedCurrency: null,
    processing: false,
  };

  componentDidMount() {
    this.setBalanceInRequestCurrency();
  }

  setBalanceInRequestCurrency = () => {
    const {
      balance,
      currency,
      walletCurrency,
      fixedPayment,
      amount,
    } = this.props;

    if (!fixedPayment) {
      convertAmount(walletCurrency, currency, balance)
        .then((balanceInRequestedCurrency) => {
          console.log("balanceInRequestedCurrency", balanceInRequestedCurrency);
          this.setState({ balanceInRequestedCurrency });
        })
        .catch(console.error);
    } else {
      this.setState({ balanceInRequestedCurrency: amount });
    }
  };

  processPayment = () => {
    const { fixedPayment, amount, setActiveComponent } = this.props;
    const { balanceInRequestedCurrency } = this.state;

    if (fixedPayment || !balanceInRequestedCurrency) return;
    const isSplitPayment = balanceInRequestedCurrency < amount;

    setActiveComponent(
      <WalletPaymentPrompt
        {...this.props}
        isSplitPayment={isSplitPayment}
        balanceInRequestedCurrency={balanceInRequestedCurrency}
      />
    );
  };

  getBalanceInfo = () => {
    const { balance, walletCurrency, currency, fixedPayment } = this.props;
    const { balanceInRequestedCurrency } = this.state;

    if (fixedPayment) {
      return (
        <div className={"payment-box"}>
          <span className={styles.methodName}>Wallet</span> <br />
          <span className={styles.methodText}>
            <span className={styles.currency}>{`${formatCurrency(
              balanceInRequestedCurrency,
              currency
            )} `}</span>
            used
          </span>
        </div>
      );
    } else {
      return (
        <div className={"payment-box"}>
          <span className={styles.methodName}>Wallet</span> <br />
          <span className={styles.methodText}>
            <span className={styles.currency}>{`${formatCurrency(
              balance,
              walletCurrency
            )} `}</span>
            available
          </span>
          <br />
          <span className={styles.methodText}>
            <span className={styles.currency}>{`${formatCurrency(
              balanceInRequestedCurrency,
              currency
            )} `}</span>
            available
          </span>
        </div>
      );
    }
  };

  render() {
    return (
      <div onClick={this.processPayment} className={styles.method}>
        <div className={"information-img"}>
          <img
            src={walletImg}
            style={{ width: "71px", height: "62px" }}
            alt={"wallet-img"}
          />
        </div>
        <div className={"information"}>{this.getBalanceInfo()}</div>
      </div>
    );
  }
}

export default WalletProcessor;
