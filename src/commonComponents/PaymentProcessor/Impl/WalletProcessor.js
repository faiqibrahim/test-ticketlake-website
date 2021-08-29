import React, {Component} from "react";
import {Col, Row} from "reactstrap";
import walletImg from '../assets/Wallet.svg';
import {convertAmount, formatCurrency} from "../../../utils/common-utils";
import WalletPaymentPrompt from "../components/WalletPaymentPrompt";

class WalletProcessor extends Component {

    state = {
        balanceInRequestedCurrency: null,
        processing: false
    }

    componentDidMount() {
        this.setBalanceInRequestCurrency();
    }

    setBalanceInRequestCurrency = () => {
        const {balance, currency, walletCurrency, fixedPayment, amount} = this.props;

        if (!fixedPayment) {
            convertAmount(walletCurrency, currency, balance)
                .then(balanceInRequestedCurrency => {
                    console.log("balanceInRequestedCurrency", balanceInRequestedCurrency);
                    this.setState({balanceInRequestedCurrency})
                })
                .catch(console.error);

        } else {
            this.setState({balanceInRequestedCurrency: amount})
        }
    };

    processPayment = () => {
        const {fixedPayment, amount, setActiveComponent} = this.props;
        const {balanceInRequestedCurrency} = this.state;

        if (fixedPayment || !balanceInRequestedCurrency) return;
        const isSplitPayment = balanceInRequestedCurrency < amount

        setActiveComponent((
            <WalletPaymentPrompt {...this.props} isSplitPayment={isSplitPayment} balanceInRequestedCurrency={balanceInRequestedCurrency}/>
        ));
    }

    getBalanceInfo = () => {
        const {balance, walletCurrency, currency, fixedPayment} = this.props;
        const {balanceInRequestedCurrency} = this.state;

        if (fixedPayment) {
            return (
                <Col>
                    <b>Wallet</b> <br/>
                    <b>{formatCurrency(balanceInRequestedCurrency, currency)}</b> used
                </Col>
            );
        } else {
            return (
                <Col>
                    <b>Wallet</b> <br/>
                    <b>{formatCurrency(balance, walletCurrency)}</b> available
                    <br/>
                    <b>{formatCurrency(balanceInRequestedCurrency, currency)}</b> available
                </Col>
            );
        }
    }

    render() {
        return (
            <Row onClick={this.processPayment}>
                <Col xs={12}>
                    <Row>
                        <Col>
                            <img src={walletImg} style={{width: '71px', height: '62px'}} alt={'wallet-img'}/>
                        </Col>
                    </Row>

                    <br/>

                    <Row>
                        {this.getBalanceInfo()}
                    </Row>
                </Col>
            </Row>
        )
    }
}

export default WalletProcessor;
