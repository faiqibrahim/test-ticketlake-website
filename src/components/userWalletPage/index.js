// Library
import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  FormGroup,
  Label,
  Input,
} from "reactstrap";
import swal from "@sweetalert/with-react";
import { InfoCircleOutlined } from "@ant-design/icons";
// Component

import HeadingWithButton from "../../commonComponents/headingWithButton";
import UserPagesContainer from "../../commonComponents/userPagesContainer";
import AuthRoutes from "../../commonComponents/authRotes";
import TableHead from "../../commonComponents/tableHead";
import Loader from "../../commonComponents/loader";

// Redux
import { connect } from "react-redux";
import {
  fetchUserProfile,
  setTopUpAmount,
  getConversion,
} from "../../redux/user/user-actions";
import { BreadcrumbsItem } from "react-breadcrumbs-dynamic";
import { getTransactionHistory } from "../../redux/wallet/wallet-actions";
import moment from "moment";
import axios from "../../utils/axios";
import { Helmet } from "react-helmet";
import TransactionHistoryModal from "../../commonComponents/ModalFactory/TransactionHistoryModal/TransactionHistoryModal";
import "./style.css";

const header = [
  "Date",
  "Transaction ID",
  "Payment Method",
  "Type",
  "Amount",
  "Details",
];

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
      isLoaded: false,
      ticketsState: [],
      passesState: [],
      passesPriceState: [],
      ticketsPriceState: [],
      isLoadedKey: false,
    };

    this.toggle = this.toggle.bind(this);
  }

  toggle2 = (data) => {
    axios
      .get(`/consumers/get-order-details/${data.orderId}`)
      .then((response) => {
        this.setState(
          {
            modalDataFromApi: response.data,
            isLoaded: true,
          },
          () => {
            const { modalDataFromApi } = this.state;
            const { tickets, passes } = modalDataFromApi;
            const ticketKeys = tickets ? Object.keys(tickets) : [];
            const passKeys = passes ? Object.keys(passes) : [];
            const passPrices = [];

            passKeys.forEach((keyItem) => {
              passPrices.push(passes[keyItem][0].price);
            });

            this.setState({
              ticketsState: ticketKeys,
              passesState: passKeys,
              passesPriceState: passPrices,
              isLoadedKey: true,
            });
          }
        );
      })
      .catch((err) => {
        console.error("Error /consumers/get-order-details", err);
      });
    this.setState({
      modal2: !this.state.modal2,
      modalData: data,
    });
  };
  canceltoggle2 = () => {
    this.setState({
      modal2: !this.state.modal2,
      modalData: [],
      isLoaded: false,
      isLoadedKey: false,
      modalDataFromApi: [],
    });
  };

  componentDidMount() {
    this.props.getTransactionHistory(1, 10);
    this.props.fetchUserProfile();
    var url = new URL(document.URL);
    var query_string = url.search;
    var search_params = new URLSearchParams(query_string);
    var checkoutid = search_params.get("checkoutid");
    if (checkoutid !== null) {
      axios
        .get(`/hubtel/fetch-hubtel-status/${checkoutid}?isTopUp=true`)
        .then((response) => {})
        .catch((err) => {
          console.error("request faild!", err);
        });
    }
  }

  toggle() {
    this.setState((prevState) => ({
      modal: !prevState.modal,
    }));
  }

  pageTitle = () => {
    return (
      <Helmet>
        <title>Wallet</title>
      </Helmet>
    );
  };

  changePrice = (e) => {
    var val = parseFloat(e.target.value);
    this.setState({
      changePrice: val,
    });
  };

  getRate = (e) => {
    const amount = this.state.changePrice;

    if (isNaN(amount)) {
      swal({
        title: "Error",
        icon: "warning",
        text: "Please enter a valid amount",
      });
    } else {
      this.props.setTopUpAmount(parseFloat(amount));
      this.props.history.push("/user/wallet/top-up");
      // this.props.getConversion({ amount });
    }
  };
  /******************** END ***********************/

  loadMoreTransaction = (e) => {
    e.preventDefault();

    if (
      this.props.walletPagination &&
      this.props.walletPagination.hasNextPage === true
    ) {
      if (this.props.walletPagination.page) {
        this.props.walletPagination.page = this.props.walletPagination.page + 1;
      }
    }

    this.props.getTransactionHistory(this.props.walletPagination.page, 10);
  };

  convertNumberValue = (value) => {
    // Nine Zeroes for Billions
    return Math.abs(Number(value)) >= 1.0e9
      ? (Math.abs(Number(value)) / 1.0e9).toFixed(2) + "B"
      : // Six Zeroes for Millions
      Math.abs(Number(value)) >= 1.0e6
      ? (Math.abs(Number(value)) / 1.0e6).toFixed(2) + "M"
      : // Three Zeroes for Thousands
      Math.abs(Number(value)) >= 1.0e3
      ? (Math.abs(Number(value)) / 1.0e3).toFixed(2) + "K"
      : Math.abs(Number(value));
  };

  renderTransactionModal = () => {
    return (
      <TransactionHistoryModal
        parentState={this.state}
        closeModal={this.canceltoggle2}
      />
    );
  };

  getData = () => {
    const { transactionHistory } = this.props;
    let jsx =
      transactionHistory && transactionHistory.length === 0 ? (
        <tbody key={2}>
          <tr>
            <td colSpan={5}>No Wallet Transaction</td>
          </tr>
        </tbody>
      ) : (
        Array.isArray(transactionHistory) &&
        transactionHistory.map((data) => {
          const { paymentMethod } = data;
          const notRefundTopup = !["Refund", "Top-up"].includes(paymentMethod);
          return (
            <tr key={data._id}>
              <td>{moment(data.createdAt).format("MM-DD-YYYY")}</td>
              <td>{data.transactionId}</td>
              <td>{data.paymentMethod}</td>
              <td>{data.type}</td>
              <td style={{ display: "inline-flex" }}>
                <span
                  className={`${notRefundTopup ? "red-color" : "green-color"}`}
                >
                  {data.transactionAmount && data.transactionAmount.toFixed(2)}
                </span>
              </td>
              <td>
                {notRefundTopup ? (
                  <>
                    <InfoCircleOutlined
                      onClick={() => this.toggle2(data)}
                      size="large"
                      fill="#000"
                      style={{
                        cursor: "pointer",
                        marginLeft: "10px",
                        fontSize: "1.3rem",
                        color: "#ccc",
                      }}
                    />
                  </>
                ) : null}
              </td>
            </tr>
          );
        })
      );

    return <tbody id="scrollTable">{jsx}</tbody>;
  };

  getWallet = (walletBalance) => {
    const hrefLink = "#";
    return (
      <>
        <section className="middle-padding">
          <div className="container custom-container">
            <div className="dasboard-wrap fl-wrap">
              <HeadingWithButton
                heading={"Wallet"}
                buttonText={"+ Top-up balance"}
                clicker={this.toggle}
              />
              <div className="list-single-facts fl-wrap">
                <div className="inline-facts-wrap text-left profile-bal-box">
                  <div className="inline-facts">
                    <div className="milestone-counter">
                      <div className="stats animaper">Current balance</div>
                    </div>
                    <br />
                    <h4 style={{ marginBottom: "0px", fontFamily: "inherit" }}>
                      {walletBalance}
                    </h4>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="middle-padding" style={{ paddingTop: "15px" }}>
          <div className="container custom-container">
            <div className="dasboard-wrap fl-wrap">
              <div className="dashboard-content fl-wrap">
                <div className="box-widget-item-header">
                  <h3> Transaction History</h3>
                </div>
              </div>

              {this.renderTransactionModal()}

              <div className={"table-responsive"}>
                <table className={"customTable transaction-table"}>
                  <thead style={{ backgroundColor: "#f2f3f8" }}>
                    <TableHead>{header}</TableHead>
                  </thead>

                  {this.props.processing ? (
                    <React.Fragment>
                      <Loader style={{ marginLeft: "430%" }} />
                    </React.Fragment>
                  ) : (
                    this.getData()
                  )}
                </table>
                {this.props.walletPagination &&
                this.props.walletPagination.hasNextPage === true ? (
                  <a
                    className="load-more-button load-more-button-light"
                    href={hrefLink}
                    onClick={(e) => this.loadMoreTransaction(e)}
                  >
                    Load more
                    {this.props.walletPaginationProcessing ? (
                      <i className="fas fa-spinner" />
                    ) : null}
                  </a>
                ) : null}
              </div>
            </div>
          </div>
        </section>
      </>
    );
  };

  render() {
    const breadCrumbs = [];
    breadCrumbs.push(
      <BreadcrumbsItem glyph="home" to="/" key={1}>
        Home Page
      </BreadcrumbsItem>
    );
    breadCrumbs.push(
      <BreadcrumbsItem to="/user/wallet" key={2}>
        User Wallet
      </BreadcrumbsItem>
    );

    let filteredNumber = this.convertNumberValue(
      this.props.userWallet.availableBalance
    );
    let walletBalance = `GHS ${
      this.props.userWallet ? filteredNumber : ` "GHS 0.00" `
    }`;

    return (
      <AuthRoutes>
        <div id="wrapper">
          {this.pageTitle()}
          <UserPagesContainer
            page={"wallet"}
            breadcrumbs={breadCrumbs}
            walletBalance={walletBalance}
          >
            {this.getWallet(walletBalance)}
          </UserPagesContainer>
        </div>
        <Modal
          isOpen={this.state.modal}
          toggle={this.toggle}
          className={this.props.className}
        >
          <ModalHeader toggle={this.toggle}>Top up your balance</ModalHeader>
          <ModalBody>
            <FormGroup>
              <Label for="amount">Top Up Amount</Label>
              <Input
                type="number"
                name="amount"
                id="topUpAmount"
                onChange={(e) => this.changePrice(e)}
                placeholder="Top up amount"
              />
            </FormGroup>
            {this.props.isUserLoading ? <Loader /> : null}
          </ModalBody>
          <ModalFooter>
            <Button
              color="secondary"
              className={"buttonDefault defaultBackground"}
              onClick={this.toggle}
            >
              Cancel
            </Button>{" "}
            <Button
              color="success"
              className={"buttonDefault"}
              onClick={() => this.getRate()}
            >
              Proceed
            </Button>
          </ModalFooter>
        </Modal>
      </AuthRoutes>
    );
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
    currencyConversion: state.user.currencyConversion,
  };
};

const connectedComponent = connect(mapStateToProps, {
  setTopUpAmount,
  getTransactionHistory,
  fetchUserProfile,
  getConversion,
})(Wallet);
export default withRouter(connectedComponent);
