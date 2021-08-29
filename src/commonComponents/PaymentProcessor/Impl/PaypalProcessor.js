import React, {Component} from "react";
import axios from "../../../utils/axios";
import {PayPalButton} from "react-paypal-button-v2";

class PaypalProcessor extends Component {

    render() {
        const {
            type,
            amount,
            currency,
            clientId,
            onPaymentSuccessful,
            onPaymentFailure,
            purpose
        } = this.props;

        return <div>
            <PayPalButton
                amount={amount}
                currency={currency}
                onSuccess={(details, data) => {
                    axios.post('/transaction/paypal', {orderId: data.orderID, transactionType: purpose}, 'v2')
                        .then(({data}) => {
                            onPaymentSuccessful(type, data.data._id);
                        })
                        .catch(error => {
                            onPaymentFailure(type, error);
                        });
                }}
                options={{clientId}}
            />
        </div>
    }
}

export default PaypalProcessor;
