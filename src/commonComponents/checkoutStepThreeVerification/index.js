import React, {Component} from "react";
import TopBar from '../topBar';
import {sendSmsOTP, verifySmsOTP} from "../../redux/ticket/ticket-actions";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import {showContentOutsideMainWrapper} from '../../redux/common/common-actions';
import {showCheckoutDialogue} from '../../redux/ticket/ticket-actions';

class CheckoutStepThreeVerification extends Component {

    constructor(props) {
        super(props);

        this.state = {
            verificationCode1: '',
            verificationCode2: '',
            verificationCode3: '',
            verificationCode4: ''
        };
    }

    onInputChange = (e) => {
        e.preventDefault();
        let field = e.target;
        let state = {...this.state};
        state[e.target.name] = e.target.value;
        if (e.target.value.length < 2) {
            if(e.target.name !== 'verificationCode4'){
                this.setState(state);
            }else {
                this.setState(state, () => {
                    this.onVerifyPinClick();
                });
            }
        }
        let next = this.refs[field.name].nextSibling;
        if (next && ((next.tagName === "INPUT") || (next.tagName === "BUTTON"))) {
            this.refs[field.name].nextSibling.focus();
        }
    };

    getInput = (id, value) => {
        return (
            <input
                className={'verification-input'}
                type="number"
                id={id}
                name={id}
                ref={id}
                value={value}
                onChange={(e) => this.onInputChange(e)}
                min="0"
                max="9"
            />
        )
    };

    onVerifyPinClick = () => {
        const {verificationCode1, verificationCode2, verificationCode3, verificationCode4} = this.state;
        const smsOTP = (verificationCode1).concat(verificationCode2, verificationCode3, verificationCode4);
        this.props.verifySmsOTP(smsOTP, () => {
            this.props.showContentOutsideMainWrapper(true);
            this.props.showCheckoutDialogue({statusDialogue: true});
            this.setState({
                verificationCode1: '',
                verificationCode2: '',
                verificationCode3: '',
                verificationCode4: ''
            })
        }, () => {
            this.setState({
                verificationCode1: '',
                verificationCode2: '',
                verificationCode3: '',
                verificationCode4: ''
            })
        })
    };

    onResendClick = (phoneNumber, network) => {
        this.props.sendSmsOTP(phoneNumber, network);
        this.setState({
            verificationCode1: '',
            verificationCode2: '',
            verificationCode3: '',
            verificationCode4: ''
        })
    };

    render() {
        
        return (
            <div className="mtn-payment-wrp">
                <div className={"row"}>
                    <TopBar/>
                    <div className={'col-lg-12'}>
                        <div className={'static-box'}>
                            <div className={'row'}>
                                <div className={'col-lg-12'}>
                                    <div className={'label-heading'}>
                                        Enter 4-digit pin sent to {this.props.phoneNhubtelChannel.phoneNumber}
                                    </div>
                                </div>
                                <div className={'col-lg-12'}>
                                    <p style={{color: 'rgba(0, 0, 0, 0.85)'}}>
                                        For Verification, an OTP will be sent to the number you've entered.
                                    </p>
                                </div>
                                <div className={'col-lg-12'} style={{marginTop: '3%'}}>
                                    {this.getInput('verificationCode1', this.state.verificationCode1)}
                                    {this.getInput('verificationCode2', this.state.verificationCode2)}
                                    {this.getInput('verificationCode3', this.state.verificationCode3)}
                                    {this.getInput('verificationCode4', this.state.verificationCode4)}
                                    <button className={'simpleRedBtn'}
                                            style={{marginLeft: '1%'}}
                                            onClick={() => this.onVerifyPinClick()}>
                                        Verify Pin
                                    </button>
                                </div>
                                <div className={'col-lg-12'} style={{marginTop: '5%'}}>
                                    <p style={{color: 'rgba(0, 0, 0, 0.85)'}}>
                                        Didn't receive? <span
                                        style={{color: 'red', textDecoration: 'underline', cursor: 'pointer'}}
                                        onClick={() => this.onResendClick(this.props.phoneNhubtelChannel.phoneNumber,
                                            this.props.phoneNhubtelChannel.network)}>Resend
                                    </span>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        phoneNhubtelChannel: state.ticket.phoneNhubtelChannel
    }
};

const connectedComponent = connect(mapStateToProps, {
    verifySmsOTP,
    showContentOutsideMainWrapper,
    showCheckoutDialogue,
    sendSmsOTP
})(CheckoutStepThreeVerification);
export default withRouter(connectedComponent);