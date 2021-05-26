// library
import React, {Component} from "react";
import Loader from "../../commonComponents/loader";
import {withRouter} from "react-router-dom";
import Timer from 'react-compound-timer';
// Components
import UserPagesContainer from '../../commonComponents/userPagesContainer';
import CheckoutStepTwo from "../../commonComponents/checkoutStepTwo";
import CheckoutStepThreeVerification from "../../commonComponents/checkoutStepThreeVerification";

// Redux
import {connect} from "react-redux";
import swal from "@sweetalert/with-react";
import {NotificationManager} from "react-notifications";
import {userWalletTopUp, setTopUpAmount} from '../../redux/user/user-actions';
// import {hubtelTopup} from '../../redux/ticket/ticket-actions';
import {BreadcrumbsItem} from "react-breadcrumbs-dynamic";
// import axios1 from 'axios';
import CardViewWithImgAndName from '../../commonComponents/cardViewWithImgAndName';
import {ravePayPaymentRequest} from "../../redux/ticket/ticket-actions";
import RavePayIFrameResponse from '../../commonComponents/ravepayIFrameModal';

class UserWalletTopUp extends Component {

    instance;
    state = {
        clientToken: null,
        modalOpen: false,
        focusAfterClose: true,
        setFocusAfterClose: true,
        paymentIsLoaded: false,
        orderId: '80c6e5b5638e443caaa988144c2a599b',
        checkoutUrl: '',
        postData: {},
        price: 0.01,
        conversionRatesOnCheckout: 0,
        showCheckoutStepTwo: false,
        showCheckoutStepThree: false,
        ravePayModalOpen: false
    };

    componentWillMount() {
        if (!this.props.topUpAmount) {
            this.props.history.goBack();
        }
        const clientToken = "eyJ2ZXJzaW9uIjoyLCJhdXRob3JpemF0aW9uRmluZ2VycHJpbnQiOiI0MzMzMmQxMDZjNTY3N2Q4ZjczYTM1YzhlYzJiNzc0N2M2MjY0NmMzYWVjMzM0NTg3Y2QzZGVlY2FlMWI5MGU5fGNyZWF0ZWRfYXQ9MjAxOS0wNS0wN1QwOToyNzozMC4wMTA4NTgxMTArMDAwMFx1MDAyNm1lcmNoYW50X2lkPXI4aHpnajV0emN3a2R2NGNcdTAwMjZwdWJsaWNfa2V5PTM1dHJ3aHc2djdneDdmbWYiLCJjb25maWdVcmwiOiJodHRwczovL2FwaS5zYW5kYm94LmJyYWludHJlZWdhdGV3YXkuY29tOjQ0My9tZXJjaGFudHMvcjhoemdqNXR6Y3drZHY0Yy9jbGllbnRfYXBpL3YxL2NvbmZpZ3VyYXRpb24iLCJncmFwaFFMIjp7InVybCI6Imh0dHBzOi8vcGF5bWVudHMuc2FuZGJveC5icmFpbnRyZWUtYXBpLmNvbS9ncmFwaHFsIiwiZGF0ZSI6IjIwMTgtMDUtMDgifSwiY2hhbGxlbmdlcyI6W10sImVudmlyb25tZW50Ijoic2FuZGJveCIsImNsaWVudEFwaVVybCI6Imh0dHBzOi8vYXBpLnNhbmRib3guYnJhaW50cmVlZ2F0ZXdheS5jb206NDQzL21lcmNoYW50cy9yOGh6Z2o1dHpjd2tkdjRjL2NsaWVudF9hcGkiLCJhc3NldHNVcmwiOiJodHRwczovL2Fzc2V0cy5icmFpbnRyZWVnYXRld2F5LmNvbSIsImF1dGhVcmwiOiJodHRwczovL2F1dGgudmVubW8uc2FuZGJveC5icmFpbnRyZWVnYXRld2F5LmNvbSIsImFuYWx5dGljcyI6eyJ1cmwiOiJodHRwczovL29yaWdpbi1hbmFseXRpY3Mtc2FuZC5zYW5kYm94LmJyYWludHJlZS1hcGkuY29tL3I4aHpnajV0emN3a2R2NGMifSwidGhyZWVEU2VjdXJlRW5hYmxlZCI6dHJ1ZSwicGF5cGFsRW5hYmxlZCI6dHJ1ZSwicGF5cGFsIjp7ImRpc3BsYXlOYW1lIjoic3luYXZvcyIsImNsaWVudElkIjoiQVNETUFpblFDUDJ2LWpoU19LWC1Od3BSYlp3SWZibnlDVm9NMUZaeWtncEZVR2RpdUdxQkZwd3lvdlhHTU9tbDA5aWx5QlZ5TUE3NFFDZWUiLCJwcml2YWN5VXJsIjoiaHR0cDovL2V4YW1wbGUuY29tL3BwIiwidXNlckFncmVlbWVudFVybCI6Imh0dHA6Ly9leGFtcGxlLmNvbS90b3MiLCJiYXNlVXJsIjoiaHR0cHM6Ly9hc3NldHMuYnJhaW50cmVlZ2F0ZXdheS5jb20iLCJhc3NldHNVcmwiOiJodHRwczovL2NoZWNrb3V0LnBheXBhbC5jb20iLCJkaXJlY3RCYXNlVXJsIjpudWxsLCJhbGxvd0h0dHAiOnRydWUsImVudmlyb25tZW50Tm9OZXR3b3JrIjpmYWxzZSwiZW52aXJvbm1lbnQiOiJvZmZsaW5lIiwidW52ZXR0ZWRNZXJjaGFudCI6ZmFsc2UsImJyYWludHJlZUNsaWVudElkIjoibWFzdGVyY2xpZW50MyIsImJpbGxpbmdBZ3JlZW1lbnRzRW5hYmxlZCI6dHJ1ZSwibWVyY2hhbnRBY2NvdW50SWQiOiJzeW5hdm9zIiwiY3VycmVuY3lJc29Db2RlIjoiVVNEIn0sIm1lcmNoYW50SWQiOiJyOGh6Z2o1dHpjd2tkdjRjIiwidmVubW8iOiJvZmYifQ==" // If returned as JSON string
        this.setState({
            clientToken
        });
    }

    componentWillUnmount() {
        this.props.setTopUpAmount(0);
    }

    async buy() {
        if (this.instance) {
            if (this.instance.isPaymentMethodRequestable()) {
                const {nonce} = await this.instance.requestPaymentMethod();
                swal({
                        title: 'Top Up Summary',
                        text: 'Please review your top up bill',
                        content: <div>
                            <div className='billSummary'>
                                <div className="col-md-12">

                                    <div className='ticketTotalPrice'>
                                        <div className='row'>
                                            <div className='col-md-6'>
                                                <strong>Total Top Up</strong>
                                            </div>
                                            <div className='col-md-6'>
                                                <span>GHS {this.props.topUpAmount}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <br/>
                                    <br/>
                                    <span>Are you sure you want to continue?</span>
                                </div>
                            </div>
                        </div>,
                        buttons: true
                    }
                ).then(res => {
                    if (res) {
                        this.props.userWalletTopUp(this.props.topUpAmount, nonce);
                    } else {
                        swal("Top Up has been canceled!");
                    }
                });

            } else {
                NotificationManager.error("Please login to your PayPal Account before checking out", '', 3000);
            }
        } else {
            NotificationManager.error("Please login to your PayPal Account before checking out", '', 3000);
        }
    }

    ravePayModal = (requestPayment) => {
        if (requestPayment === true) {
            this.props.ravePayPaymentRequest()
        }
        this.setState({
            ravePayModalOpen: !this.state.ravePayModalOpen
        })
    };

    getTopUpView = () => {
        if (this.props.processing) {
            return <Loader height={'300px'}/>;
        } else if (this.props.message && this.props.topUpAmount === 0) {
            return <div>
                <div className="col-md-12" style={{height: '300px'}}>
                    <span>{this.props.message}</span>
                </div>
            </div>;
        } else {
            return <>
                {
                    (this.state.showCheckoutStepTwo || this.state.showCheckoutStepThree) === false ?
                        <>
                            <CardViewWithImgAndName image={'/images/mtn-logos.png'}
                                                    heading={'Mobile Money'}
                                                    imgWidth={'mtnImgWidth'}
                                                    description={'Pay via phone #'}
                                                    onClick={() => this.setState({showCheckoutStepTwo: true})}/>

                            <CardViewWithImgAndName image={'/images/bank.svg'}
                                                    heading={'Bank Card'}
                                                    imgWidth={'bankImgWidth'}
                                                    description={'Pay via Credit Card'}
                                                    onClick={() => this.ravePayModal(true)}
                            />
                        </> : null
                }
                {this.state.showCheckoutStepTwo ?
                    <CheckoutStepTwo selectStyleId={true} setCheckoutStepThree={() => this.setState({
                        showCheckoutStepThree: true,
                        showCheckoutStepTwo: false
                    })}/> : null}
                {this.state.showCheckoutStepThree ?
                    <CheckoutStepThreeVerification/> : null}
            </>
        }
    };

    render() {

        const breadCrumbs = [];
        breadCrumbs.push(<BreadcrumbsItem glyph='home' to='/'>Home Page</BreadcrumbsItem>);
        breadCrumbs.push(<BreadcrumbsItem to='/user/wallet'>User Wallet</BreadcrumbsItem>);

        if (this.props.message && this.props.topUpAmount === 0) {
            swal({
                title: 'Top Up Summary',
                text: 'Please review your top up bill',
                content: <div>
                    <div className='billSummary'>
                        <div className="col-md-12">
                            <div className='ticketTotalPrice'>
                                <div className='row'>
                                    <div className='col-md-6'>
                                        <strong>Wallet</strong>
                                    </div>
                                    <div className='col-md-6'>
                                        <span>GHS {this.props.userWallet.availableBalance}</span>
                                    </div>
                                </div>
                            </div>
                            <span>
                                We are redirecting you back in &nbsp;
                                <Timer
                                    initialTime={5000}
                                    direction="backward"
                                >
                                    <Timer.Seconds/> seconds
                                </Timer>
                            </span>
                        </div>
                    </div>
                </div>,
                buttons: false
            });
            setTimeout(() => {
                swal.close();
                this.props.history.goBack();
            }, 5000);
        }

        return (
            <div id="wrapper">
                <div className="content">
                    <UserPagesContainer
                        page={'wallet'}
                        breadcrumbs={breadCrumbs}>
                        <section className="middle-padding wallet-wrapper">
                            <div className="container">
                                <div className="dasboard-wrap fl-wrap">
                                    <div className="box-widget-item-header">
                                        <h3> Wallet Top Up</h3>
                                    </div>
                                    {this.getTopUpView()}
                                </div>
                            </div>
                        </section>
                    </UserPagesContainer>
                </div>
                <div className="Paypal-wrp">
                    <RavePayIFrameResponse isOpen={this.state.ravePayModalOpen}
                                           focusAfterClose={this.state.focusAfterClose}
                                           toggle={this.ravePayModal}
                                           ravePayResponse={this.props.ravePayResponse}
                                           link={this.props.ravePayResponse && this.props.ravePayResponse.link}
                                           className={this.props.className}
                    />
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        topUpAmount: state.user.topUpAmount,
        message: state.user.message,
        processing: state.user.processing,
        userWallet: state.user.userWallet,
        currencyConverted: state.user.currencyConversion,
        ravePayResponse: state.ticket.ravePayResponse
    }
};

const connectedComponent = connect(mapStateToProps, {userWalletTopUp, ravePayPaymentRequest, setTopUpAmount})(UserWalletTopUp);
export default withRouter(connectedComponent);