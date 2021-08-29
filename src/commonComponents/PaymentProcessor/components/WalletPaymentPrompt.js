import React from "react";
import styles from "./wallet-prompt.module.css";
import Loader from '../../../commonComponents/loader';
import axios from "../../../utils/axios";

class WalletPaymentPrompt extends React.Component {

    state = {
        loading: false
    }

    componentDidMount() {
        if (!this.props.isSplitPayment) {
            this.processPayment();
        }
    }

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
            splitPayment
        } = this.props;

        const transactionAmount = Math.min(balanceInRequestedCurrency, amount);
        this.setState({loading: true}, () => {
            axios.post('/transaction/wallet', {amount: transactionAmount, currency, transactionType: purpose}, 'v2')
                .then(({data}) => {
                    const {_id} = data.data;
                    isSplitPayment ? splitPayment(type, transactionAmount, _id) : onPaymentSuccessful(type, _id);
                })
                .catch(error => {
                    onPaymentFailure(type, error);
                });
        });
    }


    render() {
        if (this.props.isSplitPayment && !this.state.loading) {
            return (
                <div className={styles.splitContainer}>
                    <h4 className={styles.header}>Insufficient Wallet Balance</h4>
                    <hr className={styles.borderLine}/>
                    <div className={styles.bodyContainer}>
                        <p>
                            Pay the difference using a different payment method by selecting split
                            pay.
                        </p>
                    </div>

                    <button className={styles.layoutBtn} onClick={this.processPayment}>Split Pay</button>

                    <p className={`${styles.redText} ${styles.linkText}`}
                       onClick={() => this.props.setActiveComponent(null)}>Cancel</p>
                </div>
            );
        } else {
            return <Loader/>
        }
    }
}

export default WalletPaymentPrompt;
