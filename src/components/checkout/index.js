// library
import React, { Component } from "react";
import Loader from "../../commonComponents/loader";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { NotificationManager } from "react-notifications";
import swal from "@sweetalert/with-react";
import {
  setClientToken,
  checkout,
  setSplitPayment,
  ravePayPaymentRequest,
  seatsCheckout,
} from "../../redux/ticket/ticket-actions";
import axios from "../../utils/axios";
import CardViewWithImgAndName from "../../commonComponents/cardViewWithImgAndName";
import { formatCurrency, getSeatCheckoutProps } from "../../utils/common-utils";

const splitWalletIconStyle = {
  fontSize: "64px",
  marginRight: "10px",
  color: "#F44336",
};

const simpleWalletIconStyle = {
  fontSize: "64px",
  marginRight: "10px",
  marginTop: "25px",
  color: "#F44336",
};

class Checkout extends Component {
  instance;

  state = {
    clientToken: null,
    ravePayModalOpen: false,
    modalOpen2: false,
    focusAfterClose: true,
    setFocusAfterClose: true,
    orderId: "80c6e5b5638e443caaa988144c2a599b",
    checkoutUrl: "",
    postData: {},
    price: 0.01,
    conversionRatesOnCheckout: 0,
    isLoading: true,
    showSplitBlock: false,
    paymentOption: "WALLET",
  };

  componentDidMount() {
    localStorage.removeItem("conversionRatesOnCheckout");
    // Uncomment it when paypal wants to integrate
    // if(parseFloat(this.props.totalBill)){
    //     this.convertPrice();
    // }
    const clientToken =
      "eyJ2ZXJzaW9uIjoyLCJhdXRob3JpemF0aW9uRmluZ2VycHJpbnQiOiI0MzMzMmQxMDZjNTY3N2Q4ZjczYTM1YzhlYzJiNzc0N2M2MjY0NmMzYWVjMzM0NTg3Y2QzZGVlY2FlMWI5MGU5fGNyZWF0ZWRfYXQ9MjAxOS0wNS0wN1QwOToyNzozMC4wMTA4NTgxMTArMDAwMFx1MDAyNm1lcmNoYW50X2lkPXI4aHpnajV0emN3a2R2NGNcdTAwMjZwdWJsaWNfa2V5PTM1dHJ3aHc2djdneDdmbWYiLCJjb25maWdVcmwiOiJodHRwczovL2FwaS5zYW5kYm94LmJyYWludHJlZWdhdGV3YXkuY29tOjQ0My9tZXJjaGFudHMvcjhoemdqNXR6Y3drZHY0Yy9jbGllbnRfYXBpL3YxL2NvbmZpZ3VyYXRpb24iLCJncmFwaFFMIjp7InVybCI6Imh0dHBzOi8vcGF5bWVudHMuc2FuZGJveC5icmFpbnRyZWUtYXBpLmNvbS9ncmFwaHFsIiwiZGF0ZSI6IjIwMTgtMDUtMDgifSwiY2hhbGxlbmdlcyI6W10sImVudmlyb25tZW50Ijoic2FuZGJveCIsImNsaWVudEFwaVVybCI6Imh0dHBzOi8vYXBpLnNhbmRib3guYnJhaW50cmVlZ2F0ZXdheS5jb206NDQzL21lcmNoYW50cy9yOGh6Z2o1dHpjd2tkdjRjL2NsaWVudF9hcGkiLCJhc3NldHNVcmwiOiJodHRwczovL2Fzc2V0cy5icmFpbnRyZWVnYXRld2F5LmNvbSIsImF1dGhVcmwiOiJodHRwczovL2F1dGgudmVubW8uc2FuZGJveC5icmFpbnRyZWVnYXRld2F5LmNvbSIsImFuYWx5dGljcyI6eyJ1cmwiOiJodHRwczovL29yaWdpbi1hbmFseXRpY3Mtc2FuZC5zYW5kYm94LmJyYWludHJlZS1hcGkuY29tL3I4aHpnajV0emN3a2R2NGMifSwidGhyZWVEU2VjdXJlRW5hYmxlZCI6dHJ1ZSwicGF5cGFsRW5hYmxlZCI6dHJ1ZSwicGF5cGFsIjp7ImRpc3BsYXlOYW1lIjoic3luYXZvcyIsImNsaWVudElkIjoiQVNETUFpblFDUDJ2LWpoU19LWC1Od3BSYlp3SWZibnlDVm9NMUZaeWtncEZVR2RpdUdxQkZwd3lvdlhHTU9tbDA5aWx5QlZ5TUE3NFFDZWUiLCJwcml2YWN5VXJsIjoiaHR0cDovL2V4YW1wbGUuY29tL3BwIiwidXNlckFncmVlbWVudFVybCI6Imh0dHA6Ly9leGFtcGxlLmNvbS90b3MiLCJiYXNlVXJsIjoiaHR0cHM6Ly9hc3NldHMuYnJhaW50cmVlZ2F0ZXdheS5jb20iLCJhc3NldHNVcmwiOiJodHRwczovL2NoZWNrb3V0LnBheXBhbC5jb20iLCJkaXJlY3RCYXNlVXJsIjpudWxsLCJhbGxvd0h0dHAiOnRydWUsImVudmlyb25tZW50Tm9OZXR3b3JrIjpmYWxzZSwiZW52aXJvbm1lbnQiOiJvZmZsaW5lIiwidW52ZXR0ZWRNZXJjaGFudCI6ZmFsc2UsImJyYWludHJlZUNsaWVudElkIjoibWFzdGVyY2xpZW50MyIsImJpbGxpbmdBZ3JlZW1lbnRzRW5hYmxlZCI6dHJ1ZSwibWVyY2hhbnRBY2NvdW50SWQiOiJzeW5hdm9zIiwiY3VycmVuY3lJc29Db2RlIjoiVVNEIn0sIm1lcmNoYW50SWQiOiJyOGh6Z2o1dHpjd2tkdjRjIiwidmVubW8iOiJvZmYifQ=="; // If returned as JSON string
    this.setState({
      clientToken,
    });
  }

  convertPrice = () => {
    var totalBillConversion = this.props.totalBill;
    axios
      .get(
        `/currency/get-conversion?from=GHS&to=USD&amount=${totalBillConversion}`
      )
      .then((response) => {
        localStorage.setItem(
          "conversionRatesOnCheckout",
          JSON.stringify(response.data.data)
        );
        this.setState({
          conversionRatesOnCheckout: response.data.data,
          isLoading: false,
        });
      })
      .catch((err) => {
        console.error("getrate err", err);
      });
  };

  openSplitWalletModalVerify = () => {
    this.props.setSplitPayment(true);
    this.setState({
      showSplitBlock: true,
      modalOpen2: !this.state.modalOpen2,
    });
  };

  ravePayModal = (requestPayment) => {
    if (requestPayment === true) {
      this.props.ravePayPaymentRequest();
    }
    this.setState({
      ravePayModalOpen: !this.state.ravePayModalOpen,
    });
  };

  openSplitWalletModal = () => {
    this.setState({
      modalOpen2: !this.state.modalOpen2,
      paymentOption: "WALLET",
    });
  };

  payWithWallet = () => {
    let totalBillNow = parseFloat(this.props.totalBill);
    let totalWalletNow = this.props.wallet.availableBalance;

    if (parseFloat(totalWalletNow) >= parseFloat(totalBillNow)) {
      this.buyWithoutPayPal();
    } else {
      this.openSplitWalletModal();
    }
  };

  async buy() {
    if (this.instance) {
      if (this.instance.isPaymentMethodRequestable()) {
        const { nonce } = await this.instance.requestPaymentMethod();
        swal({
          title: "Checkout Summary",
          text: "Please review your invoice",
          content: (
            <div>
              <div className="billSummary">
                <div className="col-md-12">
                  <div className="ticketTotalPrice">
                    <div className="row">
                      <div className="col-md-6">
                        <strong>Total Cost</strong>
                      </div>
                      <div className="col-md-6">
                        <span>
                          $
                          {this.state.conversionRatesOnCheckout.convertedAmount}
                        </span>
                      </div>
                    </div>
                  </div>
                  <br />
                  <br />
                  <span>Are you sure you want to continue?</span>
                </div>
              </div>
            </div>
          ),
          buttons: true,
        }).then((res) => {
          if (res) {
            this.props.checkout(
              this.props.assignedSeats,
              this.props.assignedSeatsForDisplay,
              this.props.event,
              nonce,
              this.props.passesAssignedSeats,
              this.props.passesAssignedSeatsForDisplay,
              JSON.parse(localStorage.getItem("conversionRatesOnCheckout")),
              this.props.setStepCB
            );
          } else {
            swal("Checkout has been canceled!");
          }
        });
      } else {
        NotificationManager.error(
          "Please login to your PayPal Account before checking out",
          "",
          3000
        );
      }
    } else {
      NotificationManager.error(
        "Please login to your PayPal Account before checking out",
        "",
        3000
      );
    }
  }

  buyWithoutAnyMethod() {
    const { customSeatingPlan, assignedSeats, event } = this.props;

    swal({
      title: "Checkout Summary",
      text: "Please review your invoice",
      content: (
        <div>
          <div className="billSummary">
            <div className="col-md-12">
              <div className="ticketTotalPrice">
                <div className="row">
                  <div className="col-md-12">
                    <strong>Do you want to proceed?</strong>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ),
      buttons: true,
    }).then((res) => {
      if (res) {
        if (customSeatingPlan) {
          this.props.checkout(
            this.props.assignedSeats,
            this.props.assignedSeatsForDisplay,
            this.props.event,
            null,
            this.props.passesAssignedSeats,
            this.props.passesAssignedSeatsForDisplay,
            JSON.parse(localStorage.getItem("conversionRatesOnCheckout")),
            this.props.setStepCB
          );
        } else {
          const checkoutProps = getSeatCheckoutProps(assignedSeats, event);
          seatsCheckout(checkoutProps, this.props.setStepCB);
        }
      } else {
        swal("Checkout has been canceled!");
      }
    });
  }

  buyWithoutPayPal() {
    const {
      checkout,
      seatsCheckout,
      customSeatingPlan,
      event,
      assignedSeats,
    } = this.props;
    const { paymentOption } = this.state;
    swal({
      title: "Checkout Summary",
      text: "Please review your invoice",
      content: (
        <div>
          <div className="billSummary">
            <div className="col-md-12">
              <div className="ticketTotalPrice">
                <div className="row">
                  <div className="col-md-12">
                    <p className="Checkout-final-msg">
                      The total amount will be deducted from your wallet. Do you
                      want to proceed?
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ),
      buttons: true,
    }).then((res) => {
      if (res) {
        if (customSeatingPlan) {
          checkout(
            this.props.assignedSeats,
            this.props.assignedSeatsForDisplay,
            event,
            null,
            this.props.passesAssignedSeats,
            this.props.passesAssignedSeatsForDisplay,
            JSON.parse(localStorage.getItem("conversionRatesOnCheckout")),
            this.props.setStepCB
          );
        } else {
          const checkoutProps = getSeatCheckoutProps(assignedSeats, event);
          checkoutProps.paymentOption = paymentOption;

          seatsCheckout(checkoutProps, this.props.setStepCB);
        }
      } else {
        swal("Checkout has been canceled!");
      }
    });
  }

  noClickPerform() {
    console.log("noClickPerform");
  }

  render() {
    const { wallet, currency, totalBill } = this.props;
    let walletIsEmpty = wallet && wallet.availableBalance === 0;
    return parseFloat(this.props.totalBill) === 0 ? (
      <button
        className="checkoutButton"
        onClick={this.buyWithoutAnyMethod.bind(this)}
      >
        Checkout
      </button>
    ) : (
      <>
        {!this.state.clientToken && this.props.totalBill ? (
          <Loader height={"100px"} />
        ) : (
          <div style={{ clear: "both" }}>
            <div className={"col-lg-12 float-left"} style={{ marginTop: "2%" }}>
              <h4
                style={{
                  textAlign: "left",
                  fontSize: "20px",
                  float: "left",
                  margin: "0px 0px 25px",
                }}
              >
                Choose a Payment Method
              </h4>
            </div>

            <div
              className={"col-lg-12 float-left"}
              style={{ marginBottom: "78px" }}
            >
              {this.state.showSplitBlock ? (
                <>
                  <h1
                    style={{
                      textAlign: "left",
                      color: "rgba(0, 0, 0, 0.85)",
                      fontSize: "18px",
                      fontWeight: "500",
                    }}
                  >
                    Wallet Balance Used
                  </h1>
                  <div
                    className="payment-selection row hubtel-payment-cliked"
                    onClick={() => {
                      this.noClickPerform();
                    }}
                  >
                    <div
                      className="col-md-12 selected-wallet-inner-section"
                      style={{ margin: "auto 0px" }}
                    >
                      <i class="fas fa-wallet" style={splitWalletIconStyle} />
                      <h6
                        style={{
                          marginTop: "15px",
                          marginBottom: "12px",
                          width: "70%",
                        }}
                      >
                        Wallet
                        <br />
                        <small style={{ fontFamily: "Helvetica" }}>
                          <span style={{ color: "#EC1C24" }}>
                            {formatCurrency(
                              parseFloat(wallet.availableBalance).toFixed(2),
                              currency
                            )}
                          </span>{" "}
                          Used
                        </small>
                      </h6>
                      <div className="right">
                        {this.state.showSplitBlock ? (
                          <i
                            class="fas fa-check-circle"
                            style={{
                              marginRight: "10px",
                              color: "#4CAF50",
                              fontSize: "25px",
                              marginTop: "18px",
                            }}
                          />
                        ) : null}
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <div
                  className={
                    walletIsEmpty
                      ? "payment-non-selection row hubtel-payment"
                      : "payment-selection row hubtel-payment"
                  }
                  onClick={
                    walletIsEmpty
                      ? null
                      : () => {
                          this.payWithWallet(this);
                        }
                  }
                >
                  <div className="col-md-12" style={{ margin: "auto 0px" }}>
                    <i class="fas fa-wallet" style={simpleWalletIconStyle} />
                    <h6 style={{ marginTop: "15px", marginBottom: "12px" }}>
                      Wallet
                      <br />
                      <small style={{ fontFamily: "Helvetica" }}>
                        <span style={{ color: "#EC1C24" }}>
                          {`${formatCurrency(
                            parseFloat(wallet.availableBalance).toFixed(2),
                            currency
                          )} `}
                        </span>{" "}
                        Available
                      </small>
                    </h6>
                    {this.state.showSplitBlock ? (
                      <i
                        class="fas fa-check-circle"
                        style={{
                          marginRight: "10px",
                          color: "#4CAF50",
                          fontSize: "25px",
                          marginTop: "18px",
                        }}
                      />
                    ) : null}
                  </div>
                </div>
              )}
              {this.state.showSplitBlock ? (
                <div style={{ width: "100%", clear: "both" }}>
                  <h1
                    style={{
                      textAlign: "left",
                      color: "rgba(0, 0, 0, 0.85)",
                      fontSize: "18px",
                      fontWeight: "500",
                    }}
                  >
                    Choose method for remaining
                    <span className="red-currency">
                      {`${formatCurrency(
                        parseFloat(totalBill - wallet.availableBalance).toFixed(
                          2
                        ),
                        currency
                      )} `}
                    </span>
                  </h1>
                  <CardViewWithImgAndName
                    image={"/images/mtn-logos.png"}
                    heading={"Mobile Money"}
                    imgWidth={"mtnImgWidth"}
                    description={"Pay via phone #"}
                    onClick={this.props.setCheckoutStepTwo}
                  />
                </div>
              ) : (
                <CardViewWithImgAndName
                  image={"/images/mtn-logos.png"}
                  heading={"Mobile Money"}
                  imgWidth={"mtnImgWidth"}
                  description={"Pay via phone #"}
                  onClick={this.props.setCheckoutStepTwo}
                />
              )}
            </div>
          </div>
        )}
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    clientToken: state.ticket.clientToken,
    totalBill: state.ticket.totalBill,
    event: state.ticket.event,
    wallet: state.user.userWallet,
    assignedSeats: state.ticket.assignedSeats,
    assignedSeatsForDisplay: state.ticket.assignedSeatsForDisplay,
    currency: state.ticket.ticketCurrency,
    passesAssignedSeats: state.ticket.passesAssignedSeats,
    passesAssignedSeatsForDisplay: state.ticket.passesAssignedSeatsForDisplay,
    ravePayResponse: state.ticket.ravePayResponse,
    error: state.ticket.error,
    errorMessage: state.ticket.errorMessage,
  };
};

const connectedComponent = connect(mapStateToProps, {
  setClientToken,
  checkout,
  setSplitPayment,
  ravePayPaymentRequest,
  seatsCheckout,
})(Checkout);
export default withRouter(connectedComponent);
