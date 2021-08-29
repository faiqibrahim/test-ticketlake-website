import React, {Component} from "react";
import PaymentProcessorFactory from "./payment-processor-factory";
import {Col, Container, Row} from "reactstrap";
import styles from './styles.module.css';
import _ from 'lodash';
import {formatCurrency} from "../../utils/common-utils";

class PaymentProcessor extends Component {

    state = {
        processing: true,
        paymentMethods: [],
        autoPayment: null,
        transIds: [],
        childComponent: null
    };

    componentDidMount() {
        const {amount, currency, purpose, paymentMethods} = this.props;

        const methods = paymentMethods.map(method => {
            return {
                ...method,
                amount: _.round(amount, 2),
                currency: currency,
                splitPayment: this.splitPayment,
                onPaymentFailure: this.onPaymentFailure,
                onPaymentSuccessful: this.onPaymentSuccessful,
                purpose,
                setActiveComponent: this.setChildComponent
            };
        });

        this.setState({paymentMethods: methods, processing: false});
    }

    splitPayment = (type, maxAmount, transId) => {
        const paymentMethods = [];
        let autoPayment = null;

        this.state.paymentMethods.forEach(method => {
            if (method.type === type) {
                autoPayment = {
                    ...method,
                    amount: +maxAmount,
                    fixedPayment: true
                }
            } else {
                paymentMethods.push({
                    ...method,
                    amount: +method.amount - +maxAmount
                });
            }
        });

        const transIds = [...this.state.transIds];
        transIds.push(transId);

        this.setState({paymentMethods, autoPayment, transIds, childComponent: null});
    };

    onPaymentSuccessful = (type, transId) => {
        const {transIds} = this.state;
        transIds.push(transId);
        this.props.onSuccess && this.props.onSuccess(transIds);
    }

    onPaymentFailure = (type, error) => {
        this.props.onFailure && this.props.onFailure(error);
    }

    setChildComponent = (childComponent) => {
        console.log("here", childComponent);
        this.setState({childComponent});
    }

    render() {
        const {paymentMethods, processing, autoPayment, childComponent} = this.state;

        if (processing) return <div>Loading...</div>;
        if (childComponent) return childComponent;

        return (
            <Container>

                {!_.isNil(autoPayment) ? (
                    <Container>
                        <Row>
                            <Col xs={12}>
                                <p>Wallet balance used</p>
                            </Col>
                        </Row>
                        <Row>

                            <Col xs={4} className={styles.methodContainer}>
                                {PaymentProcessorFactory.getProcessor(autoPayment.type, {...autoPayment})}
                            </Col>
                        </Row>

                        <br/> <br/>

                        <Row>
                            <Col xs={12}>
                                <p>Choose method for remaining:
                                    {` ${formatCurrency(paymentMethods[0].amount, paymentMethods[0].currency)}`}</p>
                            </Col>
                        </Row>
                    </Container>
                ) : null}

                <Row style={{display: 'flex', alignItems: 'center'}}>

                    {
                        paymentMethods.map(method => (
                            <Col xs={4} key={method.type} className={styles.methodContainer}>
                                {PaymentProcessorFactory.getProcessor(method.type, {...method})}
                            </Col>
                        ))
                    }
                </Row>
            </Container>
        );
    }
}

export default PaymentProcessor;
