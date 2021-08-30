import React, {Component} from "react";
import axios from "../../../utils/axios";
import {PayPalButton} from "react-paypal-button-v2";
import {Col, Row} from 'reactstrap';
import styles from "../styles.module.css";

class PaypalProcessor extends Component {

    render() {
        const {
            type,
            amount,
            currency,
            clientId,
            onPaymentSuccessful,
            onPaymentFailure,
            purpose,
            description
        } = this.props;

        return (
            <Row className={styles.method}>
                <Col>
                    <PayPalButton
                        description={description}
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
                        options={{clientId, currency}}
                    />
                </Col>
            </Row>
        )
    }
}

export default PaypalProcessor;
