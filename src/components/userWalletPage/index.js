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
  Row
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
import { CURRENCY_IMG, currencies } from "../../utils/config";

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
import { Helmet } from "react-helmet";
import "./style.css";
import { formatCurrency } from "../../utils/common-utils";
import InvoiceDetail from "../../commonComponents/invoiceDetail";

const _ = require("lodash");
const header = ["Date", "Order ID", "Purchase Type", "Amount", "Details"];

const options = currencies.map((currency) => ({
  value: currency,
  label: currency,
  icon: `/Flags/${currency}.svg`,
}));

class Wallet extends Component {
  constructor(props) {
    super(props);

    this.state = {
      topUpModal: false,
      topUpAmount: null,
      walletCurrency: "",
      orderDetails: null,
      detailModal: false,
      currentPage: 1,
    };
  }

  toggleOrderDetails = (data = null) => {
    const { detailModal } = this.state;
    this.setState({
      detailModal: !detailModal,
      orderDetails: data,
    });
  };

  componentDidMount() {
    
    this.fetchOrderHistory();
    this.props.fetchUserProfile();
  }

  fetchOrderHistory = () => {
    const { currentPage } = this.state;
    this.props.getTransactionHistory(currentPage, 10);
  };

  toggleTopupModal = () => {
    const { userWallet } = this.props;
    const { currency } = userWallet;
    this.setState((prevState) => ({
      topUpModal: !prevState.topUpModal,
      topUpAmount: null,
      walletCurrency: currency || "",
    }));
  };

  pageTitle = () => {
    return (
      <Helmet>
        <title>Wallet</title>
      </Helmet>
    );
  };

  handleInputChange = (target) => {
    const { name, value } = target;
    this.setState({ [name]: value });
  };

  handleCurrencyChange = (target, saveInput = true) => {
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

  renderOrderDetailModal = () => {
    const { detailModal, orderDetails } = this.state;

    return (
      <Modal centered isOpen={detailModal} className="transaction-modal">
        <Row style={{ paddingTop: "115px" }} >
        <InvoiceDetail
          orderDetails={orderDetails}
          closeModalCB={() => this.toggleOrderDetails()}
        />
        </Row>
      </Modal>
    );
  };

  renderOrders = () => {
    const { transactionHistory: orderHistory } = this.props;

    if (!orderHistory.length)
      return (
        <tr>
          <td colSpan={5}>No Wallet Transaction</td>
        </tr>
      );

    return (
      <>
        {orderHistory.map((orderItem) => {
          const {
            orderId,
            currency,
            amount,
            createdAt,
            purchaseType,
          } = orderItem;
          return (
            <tr key={orderId}>
              <td>{moment(createdAt).format("MM-DD-YYYY")}</td>
              <td>{orderId}</td>
              <td>{purchaseType}</td>
              <td>{formatCurrency(amount, currency)}</td>

              <td>
                <InfoCircleOutlined
                  onClick={() => this.toggleOrderDetails(orderItem)}
                  size="large"
                  fill="#000"
                  style={{
                    cursor: "pointer",
                    marginLeft: "10px",
                    fontSize: "1.3rem",
                    color: "#ccc",
                  }}
                />
              </td>
            </tr>
          );
        })}
      </>
    );
  };

  getWallet = (walletBalance) => {
    const hrefLink = "#";
    const { walletPagination, walletPaginationProcessing } = this.props;
    return (
      <>
        <section className="middle-padding">
          <div className="container custom-container">
            <div className="dasboard-wrap fl-wrap">
              <HeadingWithButton
                heading={"Wallet"}
                buttonText={"+ Top-up balance"}
                clicker={this.toggleTopupModal}
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
                  <h3> Order History</h3>
                </div>
              </div>

              {this.renderOrderDetailModal()}

              <div className={"table-responsive"}>
                <table className={"customTable transaction-table"}>
                  <thead style={{ backgroundColor: "#f2f3f8" }}>
                    <TableHead>{header}</TableHead>
                  </thead>
                  <tbody>
                    {this.props.processing ? (
                      <tr>
                        <td colSpan={5}>
                          <Loader
                            style={{
                              marginTop: "unset",
                              marginBottom: "unset",
                            }}
                          />
                        </td>
                      </tr>
                    ) : (
                      this.renderOrders()
                    )}
                  </tbody>
                </table>

                {walletPagination && walletPagination.hasNextPage === true ? (
                  <a
                    className="load-more-button load-more-button-light"
                    href={hrefLink}
                    onClick={(e) => this.loadMoreTransaction(e)}
                  >
                    Load more
                    {walletPaginationProcessing ? (
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

    const validTopup = !isNaN(+topUpAmount) && _.round(+topUpAmount, 2) > 0;

    return (
      <Modal
        isOpen={this.state.topUpModal}
        className={this.props.className}
        style={{ width: "40%" }}
      >
        <ModalHeader toggle={this.toggleTopupModal}>
          Top up your balance
        </ModalHeader>
        <ModalBody className="topUpBody">
          <FormGroup>
            <Label for="topUpAmount">Wallet Currency</Label>
            <CustomSelectIconDropDown
              id={"walletCurrency"}
              name={"walletCurrency"}
              placeholder={"Select Currency"}
              options={options}
              onChange={(value) =>
                this.handleCurrencyChange(
                  { name: "walletCurrency", value },
                  !currency
                )
              }
              isDisabled={Boolean(currency)}
              defaultValue={
                currency
                  ? options.filter(({ value }) => value === currency)
                  : null
              }
              networkImg={CURRENCY_IMG}
            />

            {!currency && (
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
            onClick={this.toggleTopupModal}
          >
            Cancel
          </Button>{" "}
          <Button
            color="success"
            className={"buttonDefault"}
            disabled={!walletCurrency || !validTopup}
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
    const { userWallet, ticketPagination = {} } = this.props;
    const { myTicketsCount = 0 } = ticketPagination;

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

    let walletBalance = `${formatCurrency(availableBalance, currency)}`;

    return (
      <AuthRoutes>
        <div id="wrapper">
          {this.pageTitle()}
          {this.getWalletTopUpModal()}
          <UserPagesContainer
            page={"wallet"}
            breadcrumbs={breadCrumbs}
            walletBalance={walletBalance}
            userTickets={myTicketsCount}
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
    ticketPagination: state.user.ticketPagination,
  };
};

const connectedComponent = connect(mapStateToProps, {
  setTopUpAmount,
  getTransactionHistory,
  fetchUserProfile,
  getConversion,
})(Wallet);
export default withRouter(connectedComponent);
