import React, {Component} from "react";
import axios from '../../../utils/axios';

let intervalRef = null;
let checkCount = 0;
const _clearInterval = () => {
    if (intervalRef) clearInterval(intervalRef);
    checkCount = 0;
}


class MobileMoneyBillPrompt extends Component {

    componentDidMount() {
        console.log(this.props);
        this.requestPayment()
            .catch(console.error);
    }

    requestPayment = async () => {
        const {phone, network, type, amount, currency, onPaymentFailure} = this.props;

         axios.post('/transaction/mobile-money', {amount, currency, phone, network}, 'v2');
        const transactionId = "1234";

        _clearInterval();
        intervalRef = setInterval(() => {
            ++checkCount;
            const checkInternally = checkCount % 6 !== 0;

            this.trackPayment(checkInternally, transactionId)
                .catch((error) => {
                    onPaymentFailure(type, error);
                    _clearInterval();
                });
        }, 5000);
    }

    trackPayment = async (checkInternally, transactionId) => {
        console.log(checkInternally);
        const {type, onPaymentSuccessful} = this.props;
        if (!checkInternally) {
            _clearInterval();
            onPaymentSuccessful(type, transactionId);
        }
    }

    componentWillUnmount() {
        if (intervalRef) clearInterval(intervalRef);
    }


    render() {
        return (
            <div className={'row'}>
                <div className={'col-md-12'} style={{margin: "5% 0%"}}>
                    <h4 className="title">Bill Prompt Sent</h4>
                </div>

                <div className={'col-md-12'}>
                    <img src={'/images/checkout/bill.svg'}
                         style={{width: '45%'}}
                         alt={'img'}/>
                </div>

                <div className={'col-md-12'} style={{padding: '0% 10%'}}>
                    <p className={'paraStyle borderBottom'} style={{padding: '7% 13%'}}>
                        Please authorise the payment via bill prompt sent on
                        <span className={'innerText'}>{this.props.phone}</span>
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
