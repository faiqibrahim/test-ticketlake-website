import React, {Component} from "react";
import axios from '../../../../utils/axios';
import {NotificationManager} from "react-notifications";

let intervalRef = null;
let checkCount = 0;
const _clearInterval = () => {
    if (intervalRef) clearInterval(intervalRef);
    checkCount = 0;
}

class MobileMoneyBillPrompt extends Component {

    componentDidMount() {
        this.requestPayment()
            .catch(error => {
                console.error("Could not request payment.", error);
                NotificationManager.error("Could not request for payment from this phone number", "", 3000);
                this.props.setActiveComponent(this.props.parent);
            });
    }

    componentWillUnmount() {
        _clearInterval();
    }

    requestPayment = async () => {
        const {
            phone: CustomerMsisdn,
            network: hubtelChannel,
            type,
            amount,
            currency,
            purpose: transactionType,
            onPaymentFailure,
            description: paymentDescription
        } = this.props;

        const {data} = await axios.post('/transaction/mobile-money',
            {
                paymentDescription,
                amount,
                currency,
                CustomerMsisdn,
                hubtelChannel,
                transactionType
            },
            'v2');

        const transactionId = data.data.Data.TransactionId;

        _clearInterval();
        intervalRef = setInterval(() => {
            ++checkCount;
            const checkInternally = checkCount % 24 !== 0;

            this.trackPayment(checkInternally, transactionId)
                .catch((error) => {
                    onPaymentFailure(type, error);
                });
        }, 5000);
    }

    trackPayment = async (checkInternally, transactionId) => {
        const {type, onPaymentSuccessful, purpose: purchaseType} = this.props;

        const {data} = await axios.post(`/tickets/hubtel-payment-status/${transactionId}`, {
            checkInternally,
            purchaseType
        }, 'v2');

        const {code} = data.data;

        if (code === '00') {
            onPaymentSuccessful(type, data.data.transaction._id);
        }
    }

    render() {
        return (
            <div className={'row fl-l'}>
                <div className={'col-md-12'} style={{margin: "2% 0%"}}>
                    <h4 className="title">Bill Prompt Sent</h4>
                </div>

                <div className={'col-md-12'}>
                    <img src={'/images/checkout/bill.svg'}
                         style={{width: '100px'}}
                         alt={'img'}/>
                </div>

                <div className={'col-md-12'} style={{padding: '0% 10%'}}>
                    <p className={'paraStyle borderBottom'} style={{padding: '7% 13%'}}>
                        Please authorise the payment via bill prompt sent on
                        <span className={'innerText'}>{` ${this.props.phone}`}</span>
                    </p>
                </div>

                <div className={'col-md-12'} style={{padding: '0% 10%'}}>
                    <img alt='img' src={'/images/spin.svg'} className="rotate" width="40px" height="40px"/>
                    <p className={'paraStyle borderBottom'} style={{padding: '1% 14% 7%'}}>
                        Waiting for payment to complete
                    </p>
                </div>

                <div className={'col-md-12'}>
                    <p className={'paraStyle'} style={{padding: '2% 14%'}}>
                        No prompt? Dial *170#.<br/>Select My Wallet >
                        Approvals<br/>to complete this transaction.</p>
                </div>
            </div>
        );
    }
}

export default MobileMoneyBillPrompt;
