import React, {Component} from "react";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";

class StatusDialogue extends Component {
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
                        <span className={'innerText'}>{this.props.phoneNhubtelChannel.phoneNumber}</span>
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

const mapStateToProps = (state) => {
    return {
        phoneNhubtelChannel: state.ticket.phoneNhubtelChannel
    }
};

const connectedComponent = connect(mapStateToProps)(StatusDialogue);
export default withRouter(connectedComponent);
