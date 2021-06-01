import React, {Component} from 'react';
import {Button} from 'antd';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import paymentMethods from '../../paymentMethod.json';
import CheckoutStepTwo from '../../../../commonComponents/checkoutStepTwo/index';
import CheckoutStepThreeVerification from "../../../../commonComponents/checkoutStepThreeVerification";
import RavePayIFrameResponse from '../../../../commonComponents/ravepayIFrameModal';
import {
    setClientToken,
    checkout,
    setSplitPayment,
    ravePayPaymentRequest
} from "../../../../redux/ticket/ticket-actions";

import '../../VotingModule.css';

class PaidModalContent extends Component {

    constructor(props){
        super(props);
        this.state = {
            paymentMethod : null,
            activeMethodId : null,
            voteCastSuccess : false,
            showCheckoutStepTwo: false,
            showCheckoutStepThree: false,
            clientToken: null,
            ravePayModalOpen: false,
            focusAfterClose: true        }
    }

    componentDidMount() {
        localStorage.removeItem("conversionRatesOnCheckout");
        const clientToken = "eyJ2ZXJzaW9uIjoyLCJhdXRob3JpemF0aW9uRmluZ2VycHJpbnQiOiI0MzMzMmQxMDZjNTY3N2Q4ZjczYTM1YzhlYzJiNzc0N2M2MjY0NmMzYWVjMzM0NTg3Y2QzZGVlY2FlMWI5MGU5fGNyZWF0ZWRfYXQ9MjAxOS0wNS0wN1QwOToyNzozMC4wMTA4NTgxMTArMDAwMFx1MDAyNm1lcmNoYW50X2lkPXI4aHpnajV0emN3a2R2NGNcdTAwMjZwdWJsaWNfa2V5PTM1dHJ3aHc2djdneDdmbWYiLCJjb25maWdVcmwiOiJodHRwczovL2FwaS5zYW5kYm94LmJyYWludHJlZWdhdGV3YXkuY29tOjQ0My9tZXJjaGFudHMvcjhoemdqNXR6Y3drZHY0Yy9jbGllbnRfYXBpL3YxL2NvbmZpZ3VyYXRpb24iLCJncmFwaFFMIjp7InVybCI6Imh0dHBzOi8vcGF5bWVudHMuc2FuZGJveC5icmFpbnRyZWUtYXBpLmNvbS9ncmFwaHFsIiwiZGF0ZSI6IjIwMTgtMDUtMDgifSwiY2hhbGxlbmdlcyI6W10sImVudmlyb25tZW50Ijoic2FuZGJveCIsImNsaWVudEFwaVVybCI6Imh0dHBzOi8vYXBpLnNhbmRib3guYnJhaW50cmVlZ2F0ZXdheS5jb206NDQzL21lcmNoYW50cy9yOGh6Z2o1dHpjd2tkdjRjL2NsaWVudF9hcGkiLCJhc3NldHNVcmwiOiJodHRwczovL2Fzc2V0cy5icmFpbnRyZWVnYXRld2F5LmNvbSIsImF1dGhVcmwiOiJodHRwczovL2F1dGgudmVubW8uc2FuZGJveC5icmFpbnRyZWVnYXRld2F5LmNvbSIsImFuYWx5dGljcyI6eyJ1cmwiOiJodHRwczovL29yaWdpbi1hbmFseXRpY3Mtc2FuZC5zYW5kYm94LmJyYWludHJlZS1hcGkuY29tL3I4aHpnajV0emN3a2R2NGMifSwidGhyZWVEU2VjdXJlRW5hYmxlZCI6dHJ1ZSwicGF5cGFsRW5hYmxlZCI6dHJ1ZSwicGF5cGFsIjp7ImRpc3BsYXlOYW1lIjoic3luYXZvcyIsImNsaWVudElkIjoiQVNETUFpblFDUDJ2LWpoU19LWC1Od3BSYlp3SWZibnlDVm9NMUZaeWtncEZVR2RpdUdxQkZwd3lvdlhHTU9tbDA5aWx5QlZ5TUE3NFFDZWUiLCJwcml2YWN5VXJsIjoiaHR0cDovL2V4YW1wbGUuY29tL3BwIiwidXNlckFncmVlbWVudFVybCI6Imh0dHA6Ly9leGFtcGxlLmNvbS90b3MiLCJiYXNlVXJsIjoiaHR0cHM6Ly9hc3NldHMuYnJhaW50cmVlZ2F0ZXdheS5jb20iLCJhc3NldHNVcmwiOiJodHRwczovL2NoZWNrb3V0LnBheXBhbC5jb20iLCJkaXJlY3RCYXNlVXJsIjpudWxsLCJhbGxvd0h0dHAiOnRydWUsImVudmlyb25tZW50Tm9OZXR3b3JrIjpmYWxzZSwiZW52aXJvbm1lbnQiOiJvZmZsaW5lIiwidW52ZXR0ZWRNZXJjaGFudCI6ZmFsc2UsImJyYWludHJlZUNsaWVudElkIjoibWFzdGVyY2xpZW50MyIsImJpbGxpbmdBZ3JlZW1lbnRzRW5hYmxlZCI6dHJ1ZSwibWVyY2hhbnRBY2NvdW50SWQiOiJzeW5hdm9zIiwiY3VycmVuY3lJc29Db2RlIjoiVVNEIn0sIm1lcmNoYW50SWQiOiJyOGh6Z2o1dHpjd2tkdjRjIiwidmVubW8iOiJvZmYifQ==" // If returned as JSON string
        this.setState({
            clientToken
        });

    }

 

    selectPaymentHandler = (method) => {

        this.setState({
            paymentMethod : method,
            activeMethodId : method.id,
            showCheckoutStepTwo: true,
        })
    }

    voteCastSuccessHandler = () => {

        if(this.state.activeMethodId){
            this.setState({
                voteCastSuccess : true
            }) 
        }
    }

    ravePayModal = (requestPayment) => {

        if (requestPayment === true) {
            this.props.ravePayPaymentRequest()
        }
    };
    
    showSelectedPaymentScreen = () => {
        
        const { paymentMethod } = this.state;

        if(paymentMethod.cardTitle === "Mobile Money"){
            return this.mobileMoneyPaymentMethod();
        }

        if(paymentMethod.cardTitle === "Bank Card"){
             this.ravePayModal(true);
            return this.bankCardPaymentMethod();
        }

    }


    mobileMoneyPaymentMethod = () => {

        const { showCheckoutStepTwo, showCheckoutStepThree } = this.state;
        
        
        return showCheckoutStepTwo ? <CheckoutStepTwo setCheckoutStepThree={() => this.setState({
                                        showCheckoutStepThree: true,
                                        showCheckoutStepTwo: false
                                    })} /> : showCheckoutStepThree ? <CheckoutStepThreeVerification /> : this.renderVoteCastScreen();
    }

    bankCardPaymentMethod = () => {

        return (
            <RavePayIFrameResponse 
                isOpen={this.state.ravePayModalOpen}
                focusAfterClose={this.state.focusAfterClose}
                toggle={this.ravePayModal}
                ravePayResponse={this.props.ravePayResponse}
                link={this.props.ravePayResponse && this.props.ravePayResponse.link}
                errorMessage={this.props.error ? this.props.errorMessage : ''}
            />
        )
    }

    renderVoteCastScreen = () => {
        const { paymentMethod, activeMethodId } = this.state;

        return(
            <>
                <div className="title" style={{marginBottom : '20px'}}>
                        Vote for {this.props.nomineeDetail.nomineeName} 
                </div>
                <div className="subTitle">
                        <div className="text">GHS 4.00 per vote</div>
                </div>
                
                <div className="paymentDetail">
    
                    <div className="voteCount">
                        <div className="title">Number of Votes</div>
                        <div style={{position :'relative'}}>
                            <i className="voting_dropdown_arrow"></i>
                            <select name="number_of_votes">
                                <option value="02 Votes">02 Votes</option>
                            </select>
                        </div>
                    </div>
    
                    <div className="paymentMethod">
                        <div className="title">Payment Method</div>
                        <div className="row">
                            {
                                paymentMethods.paymentMethodsList.map((method) => {
                                    
                                    const isActive =  paymentMethod && paymentMethod.id === method.id;
                                    
                                    return(
                                        <div className="col4" key={method.id} onClick={() => this.selectPaymentHandler(method)}>
                                            <div className="paymentContent">
                                                <div className={`${"tickMark"} ${isActive ?"active_method" : ""}`}>
                                                    <img src={"/images/votingimages/tickmark.svg"} alt="img"/>
                                                </div>
                                                <div className="paymentCard">
                                                    <img src={method.imgSrc} alt={'img'}/>
                                                </div>
                                                <div className="paymentTitle">{method.cardTitle}</div>
                                                <div className="paymentCurrencey">{method.currency}</div>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                </div>
                <div className="castVote">
                    <Button 
                        className = {`${activeMethodId ? "active_method enabled" : "disabled"}`}
                        onClick = {this.voteCastSuccessHandler}>Pay GHS 8.00</Button>
                </div>
            </>
        )
    }

    renderVoteSuccessScreen = () => {
        return(
            <>
                <div className="title">
                    Thanks for voting. Your vote has been cast successfully.
                </div>
                <div className="detailContent">
                    <div className="detailImg">
                        <img src={this.props.nomineeDetail.imgSrc} alt={'img'}/>
                    </div>
                    <div className="detailName">{this.props.nomineeDetail.nomineeName}</div>
                    <div className="detailVoteType">{this.props.nomineeDetail.votingType}</div>
                </div>
                <div className="castVote" style={{paddingTop : '50px'}}>
                   <Button onClick={this.props.handleOk} className="active_method">Go Back To Nominees</Button>
                </div>
            </>
        )
    }

    render(){
        const { voteCastSuccess } = this.state;
    
        return( 
            <div className={`${voteCastSuccess ? "DetailBox paidPadding" : "DetailBox"}`}>
                {
                    !voteCastSuccess ? this.renderVoteCastScreen() : this.showSelectedPaymentScreen()
                }
            </div> 
        )
    }
}

const mapStateToProps = (state) => {
    return {
        ravePayResponse: state.ticket.ravePayResponse,
    };
};

const connectedComponent = connect(mapStateToProps, {
    setClientToken,
    checkout,
    setSplitPayment,
    ravePayPaymentRequest
})(PaidModalContent);

export default withRouter(connectedComponent);