// Library
import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import Loader from "../../commonComponents/loader";
import axios from "../../utils/axios";
import {
  setCopounValue,
  setBillSummary,
  resetCopounValue,
  setCouponProcessing,
} from "../../redux/ticket/ticket-actions";
import { fetchUserProfile } from "../../redux/user/user-actions";

import store from "../../redux/store";
import { handleError } from "../../utils/store-utils";
import { capitalize, hasTicketsQuantity } from "../../utils/common-utils";
import { Modal, Button, Form, Input } from "antd";
import { NavLink } from "react-router-dom";
import { NotificationManager } from "react-notifications";
import validator from "validator";

class BillSummary extends Component {
  state = {
    initialWallet: this.props.wallet,
    enterCouponCode: "",
    isDisable: true,
    copounData: {},
    loadingData: true,
    errorLoading: false,
    errorMessage: "Coupon expired",
  };

  enterCouponCode = (e) => {
    this.setState({
      errorLoading: false,
      enterCouponCode: e.target.value,
      isDisable: false,
    });
  };
  validateCoupon = (sum) => {
    let { dispatch } = store;
    let { data } = this.props.event;
    dispatch(setCouponProcessing(true));
    if (this.state.enterCouponCode.trim().length > 1) {
      axios
        .post(
          "/coupons/validate-coupons",
          {
            promoCode: this.state.enterCouponCode,
            eventId: data.data.parentEventId,
          },
          "v1"
        )
        .then((res) => {
          let { billSummary } = this.props;

          dispatch(setCopounValue(res.data.data));

          this.setState({
            copounData: res.data.data,
            loadingData: false,
            errorLoading: false,
            isDisable: true,
          });

          if (this.props.currentStep === 2) {
            this.props.setBillSummary(billSummary, this.state.initialWallet);
            // this.props.setBillSummary(billSummary);
          } else {
            this.props.setBillSummary(billSummary);
          }
          dispatch(setCouponProcessing(false));
        })
        .catch((err) => {
          dispatch(setCouponProcessing(false));
          let errorMessage = handleError(err);
          this.setState({
            errorLoading: true,
            errorMessage,
          });
        });
    }
  };

  /**** Checking whether user has provided information for Guest ticket or not ****/
  hasEmptySeat = () => {
    let { assignedSeatsForDisplay } = this.props;
    let isEmpty = false;

    for (let index = 0; index < assignedSeatsForDisplay.length; index++) {
      let { userInfo } = assignedSeatsForDisplay[index];
      isEmpty =
        userInfo.name === "" ||
        userInfo.email === "" ||
        validator.isEmail(userInfo.email) === false ||
        userInfo.phoneNumber === "";

      if (isEmpty) {
        break;
      }
    }

    return isEmpty;
  };

  /**** Checking whether user has provided information for Guest Pass or not ****/
  hasEmptyPass = () => {
    let { passesAssignedSeatsForDisplay } = this.props;
    let isEmpty = false;
    for (let index = 0; index < passesAssignedSeatsForDisplay.length; index++) {
      let { userInfo } = passesAssignedSeatsForDisplay[index];
      isEmpty =
        userInfo.name === "" ||
        userInfo.email === "" ||
        userInfo.phoneNumber === "";

      if (isEmpty) {
        break;
      }
    }

    return isEmpty;
  };

  /****************** Getting Coupon Section *********************/
  handleRemoveCouponClick = () => {
    this.setState(
      { enterCouponCode: "", isDisable: true, copounData: {} },
      () => {
        this.props.resetCopounValue();

        if (this.props.currentStep === 2) {
          this.props.setBillSummary(
            this.props.billSummary,
            this.state.initialWallet
          );
        } else {
          this.props.setBillSummary(this.props.billSummary);
        }
      }
    );
  };

  getCouponSection = () => {
    let couponValue = this.props.couponValue;
    let { currentStep } = this.props;
    if (typeof couponValue === "object") {
      let { discountType, discountValue } = couponValue;
      let couponDeduction = couponValue.couponDeduction || 0;
      discountValue =
        discountType === "fixed" ? `GHS${discountValue}` : `${discountValue}%`;

      return (
        <div className="ticketPriceDetail">
          <div className="row">
            <div className="col-md-6">
              <strong>Coupon</strong>
              <small>
                Type: <b>{capitalize(discountType)}</b>
              </small>
              <small>
                Discount: <b>{`${discountValue}`}</b>
              </small>
            </div>
            <div
              className="col-md-6 coupon-right-div"
              style={{ textAlign: "right" }}
            >
              <div>
                <span>
                  -{this.props.currency}
                  {couponDeduction.toFixed(2)}
                </span>
                {currentStep <= 2 ? (
                  <i
                    className="fa fa-trash"
                    onClick={this.handleRemoveCouponClick}
                  />
                ) : null}
              </div>
            </div>
          </div>
        </div>
      );
    }
  };

  showModal = () => {
    this.setState({
      visible: true,
    });
  };
  handleCancel = (e) => {
    console.log(e);
    this.setState({
      visible: false,
    });
  };
  showOtp = () => {
    // this.props.fetchUserProfile()
    axios
      .post("/consumers/send-email-otp")
      .then((response) => {
        this.setState({
          showOtp: true,
          tokenId: response.data.verificationCredentials.tokenId,
        });
      })
      .catch((err) => {
        console.log(err.response.data._error);
        let error =
          err.response && err.response.data && err.response.data._error;
        NotificationManager.error(error, "", 3000);
      });
  };
  resendOtp = () => {
    axios
      .post("/consumers/send-email-otp")
      .then((response) => {
        this.setState({
          tokenId: response.data.verificationCredentials.tokenId,
        });
      })
      .catch((err) => {
        console.log(err.response.data._error);
      });
  };
  onFinish = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        axios
          .post("/consumers/verify-email-otp", {
            emailOtp: values.otp,
            _id: this.state.tokenId,
          })
          .then((response) => {
            this.props.fetchUserProfile();
            sessionStorage.setItem("verifyLater", true);
            NotificationManager.success("Email Successfully Verified");
            this.setState({
              visible: false,
              showOtp: false,
              verifyLater: true,
            });
          })
          .catch((err) => {
            console.log(
              err.response !== undefined ? err.response.data._error : "Error"
            );
            this.setState({
              optError:
                err.response !== undefined ? err.response.data._error : "Error",
            });
            // NotificationManager.error(err.response!==undefined?err.response.data._error:'Error');
          });
      }
    });
    // this.handleOk();
  };

  onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  /****************** Getting Bill Summary *********************/
  getDisplay = () => {
    const displayButton = [];
    const displayData = [];

    if (this.props.currentStep === 1) {
      if (
        this.props.user !== null &&
        this.props.profileData !== undefined &&
        this.props.profileData === true
      ) {
        displayButton.push(
          <button
            className="checkoutButton"
            key={0}
            onClick={this.props.forward}
          >
            Continue
          </button>
        );
      } else {
        displayButton.push(
          <button className="checkoutButton" onClick={this.showModal}>
            Continue
          </button>
        );
      }
    } else if (this.props.currentStep === 2) {
      let {
        assignedSeatsForDisplay,
        passesAssignedSeatsForDisplay,
      } = this.props;

      let isEmptySeat =
        assignedSeatsForDisplay &&
        assignedSeatsForDisplay.length &&
        this.hasEmptySeat();
      let isEmptyPass =
        passesAssignedSeatsForDisplay &&
        passesAssignedSeatsForDisplay.length &&
        this.hasEmptyPass();

      let isButtonDisable = Boolean(isEmptySeat);
      isButtonDisable = isButtonDisable || Boolean(isEmptyPass);
      let disableClass = isButtonDisable ? "disableCheckoutBtn" : "";

      displayButton.push(
        <button
          disabled={isButtonDisable}
          key={0}
          className={`checkoutButton ${disableClass}`}
          onClick={this.props.paymentPage}
        >
          Checkout
        </button>
      );
    } else {
      displayButton.push("");
    }

    const sum = [0];
    if (this.props.billSummary) {
      let { isDisable, enterCouponCode } = this.state;
      let { couponValue } = this.props;
      const billData = this.props.billSummary;
      let canApplyCoupon = hasTicketsQuantity();

      let isCouponExist = Boolean(typeof couponValue === "object");
      let couponInputValue = isCouponExist
        ? couponValue.promoCode
        : enterCouponCode;

      return (
        <div className="billSummary whiteBackground">
          <div className="col-md-12">
            <h1>Bill Summary</h1>
            {billData.forEach((item, i) => {
              if (item.ticketClassType === "REGULAR") {
                if (
                  item.availableTickets > 0 &&
                  this.props.seats[item.ticketClassName].length
                ) {
                  sum.push(item.ticketClassPrice * item.ticketClassQty);

                  displayData.push(
                    <div className="ticketPriceDetail" key={i}>
                      <div className="row">
                        <div className="col-md-6">
                          <strong>{item.ticketClassName}</strong>
                          <small>
                            Type: <b>Regular</b>
                          </small>
                          <small>
                            {this.props.currency +
                              item.ticketClassPrice +
                              " X " +
                              item.ticketClassQty}
                          </small>
                        </div>
                        <div
                          className="col-md-6"
                          style={{ textAlign: "right" }}
                        >
                          <span>
                            {this.props.currency}
                            {(
                              item.ticketClassPrice * item.ticketClassQty
                            ).toFixed(2)}
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                }
              } else {
                sum.push(item.passPrice * item.ticketClassQty);

                displayData.push(
                  <div className="ticketPriceDetail" key={i}>
                    <div className="row">
                      <div className="col-md-6">
                        <strong>{item.passTitle}</strong>
                        <small>
                          Type: <b>Pass</b>
                        </small>
                        <small>
                          Class: <b>{item.ticketClassName}</b>
                        </small>
                        <small>
                          {this.props.currency +
                            item.passPrice +
                            " X " +
                            item.ticketClassQty}
                        </small>
                      </div>
                      <div className="col-md-6" style={{ textAlign: "right" }}>
                        <span>
                          {this.props.currency}
                          {(item.passPrice * item.ticketClassQty).toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              }
            })}

            {displayData}

            {canApplyCoupon ? this.getCouponSection() : null}
            {canApplyCoupon && this.props.currentStep <= 2 ? (
              <>
                <div className="ticketTotalPrice">
                  <div className="row">
                    <div className="col-md-12 custom-form">
                      <input
                        disabled={isCouponExist}
                        type="text"
                        className="coupen-field"
                        placeholder="Enter Coupon..."
                        value={couponInputValue}
                        min={1}
                        style={{
                          padding: "10px 20px 10px 20px",
                          marginBottom: "0px",
                          marginTop: "30px",
                          width: "75%",
                        }}
                        onChange={(e) => this.enterCouponCode(e)}
                      />
                      <button
                        style={{ cursor: isDisable && "default" }}
                        type="button"
                        className="checkoutButton coupen-apply-btn"
                        onClick={this.validateCoupon}
                        disabled={isDisable}
                      >
                        Apply
                      </button>
                    </div>
                    <div
                      className="col-md-12 error-msg-wrp"
                      style={{ textAlign: "left" }}
                    >
                      {this.state.errorLoading === true ? (
                        <small style={{ color: "red" }}>
                          {this.state.errorMessage + " !"}
                        </small>
                      ) : null}

                      {this.props.couponProcessing ? (
                        <small style={{ color: "red" }}>
                          Validating Coupon....
                        </small>
                      ) : null}
                    </div>
                  </div>
                </div>
              </>
            ) : null}

            <div className="ticketTotalPrice">
              <div className="row">
                <div className="col-md-6">
                  <strong>Total Cost </strong>
                </div>
                <div className="col-md-6">
                  <span>
                    {this.props.currency}
                    {this.props.totalBill}
                  </span>
                </div>
              </div>
            </div>

            {displayData.length ? (
              displayButton
            ) : (
              <button
                className="checkoutButton"
                onClick={() => {
                  // eslint-disable-next-line no-unused-expressions
                  this.props.history.goBack;
                }}
              >
                Back
              </button>
            )}
          </div>
        </div>
      );
    } else {
      return <Loader />;
    }
  };

  renderOtpModal = () => {
    const { getFieldDecorator } = this.props.form;
    return (
      <Modal
        visible={this.state.visible}
        onCancel={this.handleCancel}
        footer={false}
        style={{ textAlign: "left" }}
        destroyOnClose={"true"}
        className="verify-modal"
      >
        <p>
          <img
            alt="img"
            src={window.location.origin + "/images/nav-logo.svg"}
          />
        </p>
        {!this.state.showOtp ? (
          <>
            <p>
              <h3>Please verify your email </h3>
              Please verify your email{" "}
              <span style={{ fontWeight: "500", fontSize: "14px" }}>
                {this.props.user !== null
                  ? this.props.user.email
                  : "no email found"}{" "}
              </span>
              linked with your Ticketlake account Once email is verified, you
              will be able to make your Wishlist, set up wallet and access more
              features.{" "}
            </p>
            <p>
              <button
                className="btn btn-danger buttonDefault defaultBackground"
                onClick={this.showOtp}
              >
                Verify Now
              </button>
            </p>
            <p>
              <NavLink to="/user/profile" style={{ color: "red" }}>
                Use a different email?
              </NavLink>
            </p>
          </>
        ) : (
          <>
            <h3>Verification</h3>
            <Form
              name="basic"
              initialValues={{ remember: true }}
              onSubmit={this.onFinish}
              style={{ display: "inline-block", width: "100%" }}
              // onFinishFailed={this.onFinishFailed}
            >
              <Form.Item label="Enter OTP">
                {getFieldDecorator("otp", {
                  rules: [
                    {
                      required: true,
                      message: "Please input your OTP",
                      whitespace: true,
                    },
                  ],
                })(
                  <Input
                    style={{
                      background: "#F2F3F8",
                      border: "1px solid #eee",
                      lineHeight: "45px",
                      height: "44px",
                    }}
                  />
                )}
              </Form.Item>
              <p style={{ color: "red" }}>{this.state.optError}</p>
              <p style={{ textAlign: "center", color: "rgb(102, 102, 102)" }}>
                I didn't receive the code!{" "}
                <span
                  onClick={this.resendOtp}
                  style={{
                    color: "red",
                    fontWeight: "500",
                    cursor: "pointer",
                  }}
                >
                  Resend
                </span>
              </p>
              <Form.Item className="custom-form">
                <Button
                  type="primary"
                  htmlType="submit"
                  className="log-submit-btn"
                  style={{ maxWidth: "109px", height: "47px" }}
                >
                  Verify
                </Button>
              </Form.Item>
            </Form>
          </>
        )}
      </Modal>
    );
  };
  render() {
    return (
      <React.Fragment>
        {this.renderOtpModal()}
        {this.getDisplay()}
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    event: state.ticket.event,
    profileData:
      state.user.profileData !== undefined
        ? state.user.profileData.isEmailVerfied
        : undefined,
    user: state.user.user,
    couponProcessing: state.ticket.couponProcessing,
    billSummary: state.ticket.billSummary,
    totalBill: state.ticket.totalBill,
    currency: state.ticket.ticketCurrency,
    seats: state.ticket.seats,
    couponValue: state.ticket.couponValue,
    wallet: state.user.userWallet,
    assignedSeats: state.ticket.assignedSeats,
    assignedSeatsForDisplay: state.ticket.assignedSeatsForDisplay,
    passesAssignedSeats: state.ticket.passesAssignedSeats,
    passesAssignedSeatsForDisplay: state.ticket.passesAssignedSeatsForDisplay,
  };
};

const OrgAddForm = Form.create()(BillSummary);
const connectedComponent = connect(
  mapStateToProps,
  {
    fetchUserProfile,
    setCopounValue,
    setBillSummary,
    resetCopounValue,
    setCouponProcessing,
  }
)(OrgAddForm);
export default withRouter(connectedComponent);
