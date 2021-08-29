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
import CustomSelectIconDropDown from "../../commonComponents/selectDropdownWithIcon";
import { NETWORK_IMG, currencies } from "../../utils/config";

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
import { formatCurrency } from "../../utils/common-utils";

const header = [
  "Date",
  "Transaction ID",
  "Payment Method",
  "Type",
  "Amount",
  "Details",
];

const options = currencies.map((currency) => ({
  value: currency,
  label: currency,
  icon: `/Flags/${currency}.png`,
}));

class Wallet extends Component {
  constructor(props) {
    super(props);
    const { currency } = props.userWallet;
    this.state = {
      modal: false,
      modal2: false,
      topUpAmount: 0,
      walletCurrency: currency,
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
      topUpAmount: 0,
    }));
  }

  pageTitle = () => {
    return (
      <Helmet>
        <title>Wallet</title>
      </Helmet>
    );
  };

  handleInputChange = (target, saveInput = true) => {
    const { name, value } = target;

    if (saveInput) {
      this.setState({ [name]: value });
    }
  };

  submitTopUpAmount = () => {
    const { topUpAmount, walletCurrency } = this.state;

    if (isNaN(parseFloat(topUpAmount))) {
      swal({
        title: "Error",
        icon: "warning",
        text: "Please enter a valid amount",
      });
    } else {
      this.props.setTopUpAmount({
        topUpAmount: parseFloat(topUpAmount),
        walletCurrency,
      });
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

  getWalletTopUpModal = () => {
    const { topUpAmount, walletCurrency } = this.state;
    const { currency } = this.props.userWallet;
    return (
      <Modal
        isOpen={this.state.modal}
        className={this.props.className}
        style={{ width: "40%" }}
      >
        <ModalHeader toggle={this.toggle}>Top up your balance</ModalHeader>
        <ModalBody className="topUpBody">
          <FormGroup>
            <Label for="topUpAmount">Wallet Currency</Label>
            <CustomSelectIconDropDown
              id={"walletCurrency"}
              name={"walletCurrency"}
              placeholder={"Select Currency"}
              options={options}
              onChange={(value) =>
                this.handleInputChange(
                  { name: "walletCurrency", value },
                  !currency
                )
              }
              isDisabled={Boolean(walletCurrency)}
              defaultValue={
                walletCurrency
                  ? options.filter(({ value }) => value === walletCurrency)
                  : null
              }
              networkImg={NETWORK_IMG}
            />

            {!walletCurrency && (
              <span className="critical-info">
                * Currency will remain consistent afterwards
              </span>
            )}
          </FormGroup>

          <FormGroup>
            <Label for="topUpAmount">Top Up Amount</Label>
            <Input
              type="number"
              name="topUpAmount"
              value={topUpAmount}
              onChange={(e) => this.handleInputChange(e.target)}
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
            disabled={!walletCurrency || !topUpAmount}
            onClick={() => this.submitTopUpAmount()}
          >
            Proceed
          </Button>
        </ModalFooter>
      </Modal>
    );
  };
  render() {
    const breadCrumbs = [];
    const { userWallet } = this.props;
    const { availableBalance, currency } = userWallet;
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

    let filteredNumber = this.convertNumberValue(availableBalance);
    let walletBalance = `${formatCurrency(filteredNumber, currency)}`;

    return (
      <AuthRoutes>
        <div id="wrapper">
          {this.pageTitle()}
          {this.getWalletTopUpModal()}
          <UserPagesContainer
            page={"wallet"}
            breadcrumbs={breadCrumbs}
            walletBalance={walletBalance}
          >
            {this.getWallet(walletBalance)}
          </UserPagesContainer>
        </div>
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
