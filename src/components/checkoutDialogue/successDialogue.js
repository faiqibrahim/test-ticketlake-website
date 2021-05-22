import React, {Component} from "react";
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";
import {showContentOutsideMainWrapper} from "../../redux/common/common-actions";
import {getOrderDetails, showCheckoutDialogue} from "../../redux/ticket/ticket-actions";
import Confetti from 'react-confetti';

const outerDivStyle = {
    margin: "5% 0%"
};

const paraStyle = {
    padding: '2%', marginTop: '6%'
};

const btnStyle = {
    margin: '1%'
};

const firstDivStyle = {
    marginTop: '2%'
};

const secondDivStyle = {
    padding: '0% 15%'
};

class SuccessDialogue extends Component {

    onViewTicketClick = () => {
        this.props.history.push('/user/ticket');
        this.props.showContentOutsideMainWrapper(false);
    };

    onViewInvoiceClick = () => {
        if (this.props.orderDetails) {
            this.props.getOrderDetails(this.props.orderDetails.orderId, () => {
                this.props.showContentOutsideMainWrapper(true);
                this.props.showCheckoutDialogue({transactionDialogue: true});
            });
        }
    };

    onMoreEventsClick = () => {
        this.props.history.push('/');
        this.props.showContentOutsideMainWrapper(false)
    };

    render() {

        return (
            <div className={'row'}>
                <Confetti
                    width={500}
                    height={ this.props.topUpAmount ? 565 : 650}
                    numberOfPieces={80}
                    gravity={0.1}
                    opacity={1.5}
                    colors={['#DC143C',
                        '#DB7093',
                        '#FFFF33',
                        '#1E4C55',
                        '#3A2737',
                        '#87CEEB'
                    ]}
                />
                <div className={'col-md-12'} style={outerDivStyle}>
                    {
                        this.props.topUpAmount ?
                            <>
                                <h4 className="title"> Hurray! </h4>
                                <h4 className="title">Wallet Top Up Successfully!</h4>
                            </> :
                            <h4 className="title">Oh Yaah, Let's get Going!</h4>
                    }
                </div>
                <div className={'col-md-12'}>
                    <img src={'/images/checkout/success.svg'}
                         style={{width: '60%'}}
                         alt={'img'}/>
                </div>
                <div className={'col-md-12'}>
                    {
                        this.props.topUpAmount ?
                            <p className={'paraStyle'} style={paraStyle}>
                                Congratulations, Top Up is made<br/>
                                Successfully! Remember to check <br/>
                                your wallet.
                            </p> :
                            <p className={'paraStyle'} style={paraStyle}>
                                Congratulations, ticket(s) reserved! let<br/>
                                the fun begin, can't wait to see you there.<br/>
                                Remember to check your email.
                            </p>
                    }
                </div>
                {
                    this.props.topUpAmount ? null :
                        <>
                            <div className={'col-md-12'} style={firstDivStyle}>
                                <button className={'simpleBlueBtn'}
                                        onClick={() => this.onViewTicketClick()}
                                        style={btnStyle}>View Ticket
                                </button>
                                <button className={'simpleBlueBtn'}
                                        onClick={() => this.onViewInvoiceClick()}
                                        style={btnStyle}>View Receipt
                                </button>
                            </div>
                            <div className={'col-md-12'} style={secondDivStyle}>
                                <button className='fullWidthRedButton'
                                        onClick={() => this.onMoreEventsClick()}>
                                    Shop more events
                                </button>
                            </div>
                        </>
                }
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        orderDetails: state.ticket.orderDetails,
        topUpAmount: state.user.topUpAmount
    }
};

const connectedComponent = connect(mapStateToProps, {
    showContentOutsideMainWrapper,
    getOrderDetails,
    showCheckoutDialogue
})(SuccessDialogue);
export default withRouter(connectedComponent);
