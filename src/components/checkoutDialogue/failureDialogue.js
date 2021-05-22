import React, {Component} from "react";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import {initiateHubtelDirectPayment, retryPaymentProcess} from "../../redux/ticket/ticket-actions";
import {showContentOutsideMainWrapper} from "../../redux/common/common-actions";

const iconDivStyle = {
    marginTop : '8px',
};

const iconStyle = {
    fontSize : '19px'
};

class FailureDialogue extends Component {

    onTryAgainClick = () => {
        this.props.initiateHubtelDirectPayment(true);
    };

    onCrossClick = () => {
        this.props.showContentOutsideMainWrapper(false);
        this.props.retryPaymentProcess(true)
    };

    render() {
        return (
            <div className={'row'}>
                <div className={'col-md-12'} style={{margin: "5% 0%"}}>
                    <div className={'row'}>
                        <div className={'col-md-8 offset-2'}>
                            <h4 className="title">Sale Pending</h4>
                        </div>
                        <div className={'col-md-2 pointer'}
                             onClick={() => this.onCrossClick()}
                             style={iconDivStyle}>
                            <i className="fa fa-times" style={iconStyle}/>
                        </div>
                    </div>
                </div>
                <div className={'col-md-12'}>
                    <img src={'/images/checkout/sale.svg'}
                         style={{width: '43%'}}
                         alt={'img'}/>
                </div>
                <div className={'col-md-12'} style={{margin: '5% 0 -4%'}}>
                    <p className={'paraStyle'}>
                        Please wait for a while & tap again
                    </p>
                </div>
                <div className={'col-md-12'} style={{padding: '0% 15%'}}>
                    <button className='fullWidthRedButton'
                            onClick={() => this.onTryAgainClick()}
                    >Try Again</button>
                </div>
                <div className={'col-md-12'} style={{marginTop: '2%'}}>
                    <p className={'paraStyle'} style={{padding: '0px'}}>
                        Didn't receive the prompt? You may not<br/>
                        have enough money in your wallet.
                    </p>
                </div>
                <div className={'col-md-12'} style={{padding: '0 10%'}}>
                    <p className={'paraStyle borderBottom'} style={{paddingBottom: '7%'}}>
                        Else, Dial *170#. Please Select<br/>
                        My Wallet > Approvals to complete.
                    </p>
                </div>
                <div className={'col-lg-12'} style={{marginBottom: '2%'}}>
                    <img src={'/images/checkout/report.svg'} alt='img' style={{width: '17px', marginBottom: '4px'}}/>
                    <span style={{color: 'red', fontSize: '16px', marginLeft: '1%', marginTop: '40px'}}>Transaction Failed</span>
                </div>
            </div>
        );
    }
}

const connectedComponent = connect(null, {
    initiateHubtelDirectPayment,
    showContentOutsideMainWrapper,
    retryPaymentProcess
})(FailureDialogue);
export default withRouter(connectedComponent);
