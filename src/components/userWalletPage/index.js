// Library
import React, {Component} from 'react';
import {withRouter} from "react-router-dom";
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    FormGroup,
    Label,
    Input,
    Table
} from 'reactstrap';
import swal from "@sweetalert/with-react";

// Component

import HeadingWithButton from '../../commonComponents/headingWithButton';
import UserPagesContainer from '../../commonComponents/userPagesContainer';
import AuthRoutes from '../../commonComponents/authRotes';
import TableHead from '../../commonComponents/tableHead';
import Loader from "../../commonComponents/loader";

// Redux
import {connect} from "react-redux";
import {fetchUserProfile, setTopUpAmount, getConversion} from '../../redux/user/user-actions';
import {BreadcrumbsItem} from "react-breadcrumbs-dynamic";
import {getTransactionHistory} from '../../redux/wallet/wallet-actions';
import moment from "moment";
import axios from '../../utils/axios'
import {Helmet} from "react-helmet";

const header = ["Date", "Transaction ID", "Payment Method", "Payment Type", "Amount", "Details"];

class Wallet extends Component {

    constructor(props) {
        super(props);
        this.state = {
            modal: false,
            modal2: false,
            changePrice: 0,
            conversionRates: {},
            conversionRatesGivenAmount: 0,
            modalData: [],
            modalDataFromApi: [],
            isLaded: false,
            ticketsState: [],
            passesState: [],
            passesPriceState:[],
            ticketsPriceState:[],
            isLoadedKey: false
        };

        this.toggle = this.toggle.bind(this);
    }

    toggle2 = (data) => {
        axios.get(`/consumers/get-order-details/${data.orderId}`)
            .then(response => {
                this.setState({
                    modalDataFromApi: response.data,
                    isLaded: true,
                })

                var ticketsState = this.state.modalDataFromApi.tickets
                if (ticketsState !== null && ticketsState !== undefined) {
                    var ticketsArray = []
                    for (var key of Object.keys(ticketsState)) {
                        ticketsArray.push(key)
                    }
                    this.setState({
                        ticketsState: ticketsArray,
                        isLoadedKey: true,
                    })
                   
                }

                var passesState = this.state.modalDataFromApi.passes
                if (passesState !== null && passesState !== undefined) {
                    var passesArray = []
                    var passesPriceArray = []
                    for (var passesKey of Object.keys(passesState)) {
                        passesArray.push(passesKey)
                    }
                    if (passesKey!==undefined){
                        for (let i = 0; i < passesState[passesKey].length; i++) {
                            passesPriceArray.push(passesState[passesKey][i].price)
                          }
                    }
                    this.setState({
                        passesState: passesArray,
                        passesPriceState: passesPriceArray,
                        isLoadedKey: true,
                    })
                }

            })
            .catch(err => {
                console.error('Error /consumers/get-order-details', err)
            });
        this.setState({
            modal2: !this.state.modal2,
            modalData: data,
        });

    }
    canceltoggle2 = () => {
        this.setState({
            modal2: !this.state.modal2,
            modalData: [],
            isLaded: false,
            isLoadedKey: false,
            modalDataFromApi: []
        });
    }

    componentDidMount() {
        this.props.getTransactionHistory(1, 10);
        this.props.fetchUserProfile();
        var url = new URL(document.URL);
        var query_string = url.search;
        var search_params = new URLSearchParams(query_string);
        var checkoutid = search_params.get('checkoutid');
        if (checkoutid !== null) {
            axios.get(`/hubtel/fetch-hubtel-status/${checkoutid}?isTopUp=true`)
                .then(response => {
                })
                .catch(err => {
                    console.error('request faild!', err)
                });
        }
    }

    toggle() {
        this.setState(prevState => ({
            modal: !prevState.modal
        }));
    }

    pageTitle = () => {
        return (
            <Helmet>
                <title>Wallet</title>
            </Helmet>
        )
    }

    changePrice = (e) => {
        var val = parseFloat(e.target.value);
        this.setState({
            changePrice: val
        })
    }

    getRate = (e) => {
        const amount = this.state.changePrice;

        if (isNaN(amount)) {
            swal({
                    title: 'Error',
                    icon: "warning",
                    text: 'Please enter a valid amount',
                }
            )
        } else {
            this.props.setTopUpAmount(parseFloat(amount));
            this.props.history.push('/user/wallet/top-up');
            // this.props.getConversion({ amount });
        }
    }
    /******************** END ***********************/


    loadMoreTransaction = (e) => {
        e.preventDefault();

        if (this.props.walletPagination && this.props.walletPagination.hasNextPage === true) {
            if (this.props.walletPagination.page) {
                this.props.walletPagination.page = this.props.walletPagination.page + 1
            }
        }

        this.props.getTransactionHistory(this.props.walletPagination.page, 10);

    };


    convertNumberValue = (value) => {
        // Nine Zeroes for Billions
        return Math.abs(Number(value)) >= 1.0e+9

            ? (Math.abs(Number(value)) / 1.0e+9).toFixed(2) + "B"
            // Six Zeroes for Millions
            : Math.abs(Number(value)) >= 1.0e+6

                ? (Math.abs(Number(value)) / 1.0e+6).toFixed(2) + "M"
                // Three Zeroes for Thousands
                : Math.abs(Number(value)) >= 1.0e+3

                    ? (Math.abs(Number(value)) / 1.0e+3).toFixed(2) + "K"

                    : Math.abs(Number(value));

    }


    getData = () => {
        let jsx = this.props.transactionHistory && this.props.transactionHistory.length === 0 ?
            <tbody key={2}>
            <tr>
                <td colSpan={5}>No Wallet Transaction</td>
            </tr>
            </tbody> :
            Array.isArray(this.props.transactionHistory) && this.props.transactionHistory.map(data => {
                return (

                    <tr key={data._id}>
                        <td>{moment(data.createdAt).format("MM/DD/YYYY")}</td>
                        <td>{data.transactionId}</td>
                        <td>{data.paymentMethod}</td>
                        <td>{data.type}</td>
                        <td style={{display: 'inline-flex'}}>
                            {data.transactionAmount && data.transactionAmount.toFixed(2)}
                        </td>
                        <td>
                            {data.paymentMethod !== 'Refund' && data.paymentMethod !== 'Top-up' ?
                                <>
                                    <span onClick={() => this.toggle2(data)} style={{
                                        border: '1px solid #ccc',
                                        width: '20px',
                                        display: 'block',
                                        textAlign: 'center',
                                        borderRadius: '50%',
                                        cursor: 'pointer',
                                        marginLeft: '10px'
                                    }}>
                                                i
                                            </span>
                                    <Modal key={data._id} isOpen={this.state.modal2} toggle2={this.toggle2}
                                           className="transaction-modal">
                                        {this.state.isLaded ?
                                            <div className="row">
                                                {/*start left aside */}
                                                <div className="col-md-3 red-bg">
                                                        <span color="secondary" className="close-button"
                                                              onClick={this.canceltoggle2}>X</span>
                                                    <div className="row" style={{padding: '20px'}}>
                                                        <div className="col-md-12">
                                                            <h2>GHS {this.state.modalData.transactionAmount}</h2>
                                                        </div>
                                                        <div className="col-md-12">
                                                            <p className="str">
                                                                <strong>Transaction Date</strong>
                                                                <br/>
                                                                {moment(this.state.modalData.createdAt).format("MM/DD/YYYY")}
                                                            </p>
                                                        </div>
                                                        <div className="col-md-12">
                                                            <p className="str">
                                                                <strong>Payment Method</strong>
                                                                <br/>
                                                                {this.state.modalData.paymentMethod}
                                                            </p>
                                                        </div>
                                                        <div className="col-md-12">
                                                            <p className="str">
                                                                <strong>Event Name</strong>
                                                                <br/>
                                                                {this.state.modalDataFromApi.eventDetails !== undefined ? this.state.modalDataFromApi.eventDetails.eventTitle : 'null'}
                                                            </p>
                                                        </div>
                                                        <div className="col-md-12">
                                                            <p className="str">
                                                                <strong>Status</strong>
                                                                <br/>
                                                                Completed
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                                {/*end left aside */}

                                                {/*end right aside */}
                                                <div className="col-md-9 white-bg">
                                                    <h3>Transaction# {this.state.modalData.transactionId}</h3>
                                                    <div className="row">
                                                        <div className="col-md-12">
                                                            <Table responsive borderless className="border">
                                                                <thead className="border-bottom">
                                                                <tr>
                                                                    <th>Item Details</th>
                                                                    <th>Price</th>
                                                                    <th>Quantity</th>
                                                                    <th>Total</th>
                                                                </tr>
                                                                </thead>
                                                                {this.state.isLoadedKey ?
                                                                    <tbody className="border-bottom"
                                                                           key={this.state.isLoadedKey}>
                                                                    {this.state.modalDataFromApi.tickets !== null ?
                                                                        <>
                                                                            {this.state.ticketsState !== undefined && this.state.ticketsState !== null ?
                                                                                <>
                                                                                    {this.state.ticketsState.map((keyIs, i) => {
                                                                                        return (
                                                                                            this.state.modalDataFromApi.tickets[keyIs].map((data, i) => {
                                                                                                return (
                                                                                                    <tr>
                                                                                                        <td>{keyIs}</td>
                                                                                                        <td>GHS {data.price}</td>
                                                                                                        <td>{this.state.modalDataFromApi.tickets[keyIs].length}</td>
                                                                                                        <td>GHS {data.price}</td>
                                                                                                    </tr>
                                                                                                )
                                                                                            })
                                                                                        )
                                                                                    })
                                                                                    }
                                                                                </>
                                                                                :
                                                                                'no data'
                                                                            }
                                                                        </>
                                                                        : null}
                                                                    </tbody>
                                                                    : null
                                                                }
                                                                {this.state.isLoadedKey ?
                                                                    <tbody className="border-bottom"
                                                                           key={this.state.isLoadedKey}>
                                                                    {this.state.modalDataFromApi.passes !== null ?
                                                                        <>
                                                                            {this.state.passesState !== undefined && this.state.passesState !== null ?
                                                                                <>
                                                                                    {this.state.passesState.map((keyIs, i) => {
                                                                                        return (
                                                                                            this.state.modalDataFromApi.passes[keyIs].map((data, i) => {
                                                                                                return (
                                                                                                    <tr key={i}>
                                                                                                        <td>Passes {data.ticketClassInfo.ticketClassName}</td>
                                                                                                        <td>GHS {data.price}</td>
                                                                                                        <td>{this.state.modalDataFromApi.passes[keyIs].length}</td>
                                                                                                        <td>GHS {data.price}</td>
                                                                                                    </tr>
                                                                                                )
                                                                                            })
                                                                                        )
                                                                                    })
                                                                                    }
                                                                                </>
                                                                                :
                                                                                'no data'
                                                                            }
                                                                        </>
                                                                        : null}
                                                                    </tbody>
                                                                    : null
                                                                }
                                                                <tbody className="border-bottom">
                                                                {
                                                                    this.state.modalData.type && (this.state.modalData.type).toLowerCase().includes('wallet'.toLowerCase()) ?
                                                                        <tr>
                                                                            <td>Wallet Balance</td>
                                                                            <td className="grey-text">GHS {this.state.modalData.lastBalance}</td>
                                                                            <td className="grey-text"/>
                                                                            <td className="grey-text">{this.state.modalData.eventCurrency} {this.state.modalData.transactionAmount}</td>
                                                                        </tr> : null
                                                                }
                                                                {this.state.modalDataFromApi.couponInfo !== null ?
                                                                    <tr>
                                                                        <td>Copoun- {this.state.modalDataFromApi.couponInfo.promoCode}</td>
                                                                        <td className="grey-text"/>
                                                                        <td className="grey-text"/>
                                                                        <td className="red-text">{this.state.modalDataFromApi.couponInfo.discountValue}
                                                                            {this.state.modalDataFromApi.couponInfo.discountType === 'fixed' ? 'GHS' : '%'} OFF
                                                                        </td>
                                                                    </tr>
                                                                    :
                                                                    null
                                                                }

                                                                </tbody>
                                                                <tbody>
                                                                <tr>
                                                                    <td className="p25"/>
                                                                    <td className="p25"/>
                                                                    <td className="sub-total p25">Sub Total</td>
                                                                    <td className="red-text p25">GHS {this.state.modalData.transactionAmount !== null ? this.state.modalData.transactionAmount : 0}</td>
                                                                </tr>
                                                                </tbody>
                                                            </Table>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            :
                                            null
                                        }
                                        {/*end right aside */}
                                    </Modal>
                                </>
                                :
                                null
                            }
                        </td>
                    </tr>
                )
            });

        return (

            <tbody id="scrollTable">
                {jsx}
            </tbody>

        )
    };

    getWallet = (walletBalance) => {
        const hrefLink = "#";
        return (
            <>
                <section className="middle-padding">
                    <div className="container custom-container">
                        <div className="dasboard-wrap fl-wrap">
                            <HeadingWithButton
                                heading={'My Wallet'}
                                buttonText={'+ Top-up balance'}
                                clicker={this.toggle}
                            />
                            <div className="list-single-facts fl-wrap">
                                <div className="inline-facts-wrap text-left profile-bal-box">
                                    <div className="inline-facts">
                                        <div className="milestone-counter">
                                            <div className="stats animaper">
                                                Available balance
                                            </div>
                                        </div>
                                        <br/>
                                        <h4 style={{marginBottom: '0px',fontFamily:"inherit"}}>
                                            {walletBalance}
                                            </h4>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="middle-padding" style={{paddingTop: '15px'}}>
                    <div className="container custom-container">
                        <div className="dasboard-wrap fl-wrap">
                            <div className="dashboard-content fl-wrap">
                                <div className="box-widget-item-header">
                                    <h3> Transaction History</h3>
                                </div>
                            </div>

                            <div className={'table-responsive'}>
                                <table className={'customTable'}>
                                    <thead key={1} style={{backgroundColor: '#f2f3f8'}}>

                                    <TableHead>
                                        {header}
                                    </TableHead>

                                    </thead>

                                    {
                                        this.props.processing ?
                                            <Loader style={{marginLeft: '430%'}}/> :
                                            this.getData()
                                    }

                                </table>
                                {
                                    this.props.walletPagination && this.props.walletPagination.hasNextPage === true ?
                                        <a className="load-more-button load-more-button-light" href={hrefLink}
                                           onClick={(e) => this.loadMoreTransaction(e)}>Load more
                                            {
                                                this.props.walletPaginationProcessing ?
                                                    <i className="fas fa-spinner"/> : null
                                            }
                                        </a> : null
                                }
                            </div>
                        </div>
                    </div>
                </section>
            </>
        )
    };

    render() {
        const breadCrumbs = [];
        breadCrumbs.push(<BreadcrumbsItem glyph='home' to='/' key={1}>Home Page</BreadcrumbsItem>);
        breadCrumbs.push(<BreadcrumbsItem to='/user/wallet' key={2}>User Wallet</BreadcrumbsItem>);

        let filteredNumber = this.convertNumberValue(this.props.userWallet.availableBalance);
        let walletBalance = `GHS ${this.props.userWallet ? filteredNumber : ` "GHS 0.00" `}`


        return (
            <AuthRoutes>

                <div id="wrapper">
                    {this.pageTitle()}
                    <UserPagesContainer
                        page={'wallet'}
                        breadcrumbs={breadCrumbs}
                        walletBalance = {walletBalance}

                    >
                        {this.getWallet(walletBalance)}
                    </UserPagesContainer>
                </div>
                <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                    <ModalHeader toggle={this.toggle}>Top up your balance</ModalHeader>
                    <ModalBody>

                        <FormGroup>
                            <Label for="amount">Top Up Amount</Label>
                            <Input type="number" name="amount" id="topUpAmount" onChange={(e) => this.changePrice(e)}
                                   placeholder="Top up amount"/>
                        </FormGroup>
                        {
                            this.props.isUserLoading ?
                                <Loader/>
                                : null
                        }
                    </ModalBody>
                    <ModalFooter>
                        <Button color="secondary" className={'buttonDefault defaultBackground'}
                                onClick={this.toggle}>Cancel</Button>{' '}
                        <Button color="success" className={'buttonDefault'}
                                onClick={() => this.getRate()}>Proceed</Button>
                    </ModalFooter>
                </Modal>

            </AuthRoutes>

        )
    }
}


const mapStateToProps = (state) => {
    return {
        userWallet: state.user.userWallet,
        transactionHistory: state.wallet.transactionHistory,
        walletPagination: state.wallet.walletPagination,
        walletPaginationProcessing: state.wallet.walletPaginationProcessing,
        processing: state.wallet.processing,
        isUserLoading: state.user.processing,
        isCurrencyConverted: state.user.isCurrencyConverted,
        currencyConversion: state.user.currencyConversion
    }
};

const connectedComponent = connect(mapStateToProps, {
    setTopUpAmount,
    getTransactionHistory,
    fetchUserProfile,
    getConversion
})(Wallet);
export default withRouter(connectedComponent);