// Library
import React, { Component } from "react";
import { connect } from "react-redux";
import { NavLink, withRouter } from "react-router-dom";
import { NotificationManager } from "react-notifications";
import { Breadcrumbs, BreadcrumbsItem } from "react-breadcrumbs-dynamic";
import padZeros from "padzeros";
// Component

import ResultForHeading from "../../commonComponents/resultForHeading";
import BillSummary from "../billSummary";
import BuyTicketStepOne from "../buyTicketStepOne";
import BuyTicketStepTwo from "../buyTicketStepTwo";
import Checkout from "../checkout";
import BuyTicketConfirmation from "../buyTicketConfirmation";
import Loader from "../../commonComponents/loader";
import AuthRoutes from "../../commonComponents/authRotes";
import CheckoutStepTwo from "../../commonComponents/checkoutStepTwo";
import CheckoutStepThreeVerification from "../../commonComponents/checkoutStepThreeVerification";

// Helper
import {
  getDateAndTimeFromIso,
  hasTicketsQuantity,
} from "../../utils/common-utils";
import { Helmet } from "react-helmet";

// Redux
import {
  setStep,
  setBillSummary,
  getEventDetail,
  setAssignedSeats,
  resetRedux,
  resetCopounValue,
} from "../../redux/ticket/ticket-actions";
import { setUserPurchasedTickets } from "../../redux/user/user-actions";
// Error
import Error from "../../commonComponents/error";
import { fetchUserProfile } from "../../redux/user/user-actions";
import PassInfoModal from "../../commonComponents/ModalFactory/PassInfoModal/PassInfoModal";

let totalFreeTicketCount = null;

class BuyTicketPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      popoverOpen: false,
      step: 1,
      isActiveModal: false,
      passData: null,
      eventId: undefined,
      bills: [],
      purchaseType: "",
      seatsType: "",
    };
  }

  componentDidMount() {
    this.props.resetRedux();
    let eventId = this.props.match.params.id;
    this.props.getEventDetail(eventId);
    this.props.fetchUserProfile();
  }

  getSnapshotBeforeUpdate(nextProps, prevState) {
    let userTicketData = null;
    let myTicketCount = null;
    let guestTicketCount = null;

    if (
      nextProps.event &&
      nextProps.event.data.data &&
      nextProps.event.data.data._id !== prevState.eventId
    ) {
      this.props.setUserPurchasedTickets(
        nextProps.event &&
          nextProps.event.data &&
          nextProps.event.data.data &&
          nextProps.event.data.data._id,
        (data) => {
          userTicketData = data;
          if (userTicketData != null) {
            myTicketCount = this.getFreeTicketCount(userTicketData.myTickets);
            guestTicketCount = this.getFreeTicketCount(
              userTicketData.guestTickets
            );
            totalFreeTicketCount = myTicketCount + guestTicketCount;
          }
        }
      );
      this.setState({ eventId: nextProps.event.data.data._id });
      return { eventId: nextProps.event.data.data._id };
    }
    return null;
  }

  getFreeTicketCount = (tickets) => {
    let freeTicketCount = 0;
    for (let i = 0; i < tickets.length; i++) {
      if (tickets[i].price === "0") {
        freeTicketCount++;
      }
    }
    return freeTicketCount;
  };

  componentWillUnmount() {
    this.props.resetRedux();
  }

  toggleInfoModal = (passData = null) => {
    this.setState({
      isActiveModal: !this.state.isActiveModal,
      passData: passData,
    });
  };

  pageTitle = () => {
    return (
      <Helmet>
        <title>Buy Ticket</title>
      </Helmet>
    );
  };

  onInputChange = (name, val, event, ticketClassId, uniqueId) => {
    const billS = this.props.billSummary;
    billS.forEach((obj) => {
      if (
        obj.ticketClassName === name &&
        obj.ticketClassId === ticketClassId &&
        obj.uniqueId === uniqueId
      ) {
        if (
          parseInt(val) <= parseInt(event.target.max) &&
          parseInt(val) >= parseInt(event.target.min)
        ) {
          obj.ticketClassQty = parseInt(val);
        }
        if (val > obj.ticketClassQty) {
          NotificationManager.error(
            "You cannot select more than Available Tickets.",
            "",
            3000
          );
        } else {
          obj.ticketClassQty = val;
        }
      }
    });

    this.props.setBillSummary(billS);
    this.setState({ bills: billS });
  };

  getBuyingFreeTickets = (arr) => {
    let freeTicketCount = 0;
    for (let i = 0; i < arr.length; i++) {
      if (arr[i].ticketClassPrice === 0) {
        freeTicketCount += arr[i].ticketClassQty;
      }
    }
    return freeTicketCount;
  };

  numberIncrease = (singleItem, maxTickets) => {
    let eventTarget = {
      target: {
        max: maxTickets,
        min: 0,
      },
    };
    let value = singleItem.ticketClassQty;
    if (parseInt(value) < maxTickets) {
      value = parseInt(value) + 1;
    }
    this.onInputChange(
      singleItem.ticketClassName,
      value,
      eventTarget,
      singleItem.ticketClassId,
      singleItem.uniqueId
    );
  };

  numberDecrease = (singleItem, maxTickets) => {
    let eventTarget = {
      target: {
        max: maxTickets,
        min: 0,
      },
    };
    let value = singleItem.ticketClassQty;
    if (parseInt(value) > 0) {
      value = parseInt(value) - 1;
    }
    this.onInputChange(
      singleItem.ticketClassName,
      value,
      eventTarget,
      singleItem.ticketClassId,
      singleItem.uniqueId
    );
  };

  getFormView = (arr) => {
    const jsx = [];
    const _this = this;
    arr.forEach((singleItem, i) => {
      if (singleItem.ticketClassType === "REGULAR") {
        if (
          singleItem.availableTickets > 0 &&
          this.props.seats[singleItem.ticketClassName].length
        ) {
          jsx.push(
            <tr key={i}>
              <td>{singleItem.ticketClassName}</td>
              <td>
                {this.props.currency}
                {singleItem.ticketClassPrice}
              </td>
              <td>{singleItem.availableTickets}</td>
              <td>
                <div className="quantity">
                  <button
                    className={"button-decrease"}
                    onClick={() =>
                      _this.numberDecrease(
                        singleItem,
                        singleItem.availableTickets
                      )
                    }
                  >
                    -
                  </button>
                  <input
                    type="number"
                    id={"inputTypeNumber" + singleItem.ticketClassName}
                    value={singleItem.ticketClassQty}
                    name={singleItem.ticketClassName}
                    onChange={(e) =>
                      this.onInputChange(
                        e.target.name,
                        e.target.value,
                        e,
                        singleItem.ticketClassId,
                        singleItem.uniqueId
                      )
                    }
                    min="0"
                    max={singleItem.availableTickets}
                  />
                  <button
                    className={"button-increase"}
                    onClick={() =>
                      _this.numberIncrease(
                        singleItem,
                        singleItem.availableTickets
                      )
                    }
                  >
                    +
                  </button>
                </div>
              </td>
            </tr>
          );
        }
      }
    });

    if (!jsx.length) {
      jsx.push(
        <tr key={0}>
          <td colSpan={4}>No Seats Available</td>
        </tr>
      );
    }

    return jsx;
  };
  renderPassInformationModal = (eventData) => {
    let { isActiveModal, passData } = this.state;

    if (!passData || !isActiveModal) return null;

    let modalProps = {
      isOpen: isActiveModal,
      toggle: this.toggleInfoModal,
      parentEventInfo: eventData.parentEventInfo,
      eventSlotDetail: passData.eventSlotDetail,
      className: "event-passes",
    };
    return <PassInfoModal {...modalProps} />;
  };

  getPassesView = (passData) => {
    const jsx = [];
    const _this = this;
    passData.forEach((singleItem, i) => {
      if (singleItem.availablePassCount > 0) {
        jsx.push(
          <tr key={i}>
            <td>{singleItem.passTitle}</td>
            <td>{singleItem.ticketClassName}</td>
            <td>
              {this.props.currency}
              {singleItem.passPrice}
            </td>
            <td>{singleItem.availablePassCount}</td>
            <td>
              <div className="quantity">
                <button
                  className={"button-decrease"}
                  onClick={() =>
                    _this.numberDecrease(
                      singleItem,
                      singleItem.availablePassCount
                    )
                  }
                >
                  -
                </button>
                <input
                  type="number"
                  id={
                    "inputTypeNumber " +
                    singleItem.ticketClassName +
                    singleItem.ticketClassId
                  }
                  value={singleItem.ticketClassQty}
                  name={singleItem.ticketClassName}
                  onChange={(e) =>
                    this.onInputChange(
                      e.target.name,
                      e.target.value,
                      e,
                      singleItem.ticketClassId,
                      singleItem.uniqueId
                    )
                  }
                  min="0"
                  max={singleItem.availablePassCount}
                />
                <button
                  className={"button-increase"}
                  onClick={() =>
                    _this.numberIncrease(
                      singleItem,
                      singleItem.availablePassCount
                    )
                  }
                >
                  +
                </button>
              </div>
            </td>
            <td>
              <span
                onClick={() => this.toggleInfoModal(singleItem)}
                style={{
                  border: "1px solid #ccc",
                  width: "20px",
                  display: "block",
                  textAlign: "center",
                  borderRadius: "50%",
                  cursor: "pointer",
                }}
              >
                i
              </span>
            </td>
          </tr>
        );
      }
    });

    if (!jsx.length) {
      jsx.push(
        <tr key={0}>
          <td colSpan={4}>No Passes Available</td>
        </tr>
      );
    }

    return jsx;
  };

  changeStepForward = () => {
    if (this.state.step === 1) {
      let billsData = this.state.bills;
      let buyingFreeTicketsCount = this.getBuyingFreeTickets(billsData);
      let totalFreeTickets = buyingFreeTicketsCount + totalFreeTicketCount;
      if (!(this.props.seatsAssignedFlag || this.props.passesAssignedFlag)) {
        NotificationManager.error(
          "Seats are not assigned for this event",
          "",
          3000
        );
      }
      if (totalFreeTickets > 10) {
        NotificationManager.error(
          `You've reached maximum limit of 10 for your free event tickets.`,
          "",
          6000
        );
      } else {
        if (this.props.totalBill < 0 || !hasTicketsQuantity()) {
          NotificationManager.error(
            "Please Select at-least one seat",
            "",
            3000
          );
        } else {
          this.props.setAssignedSeats(
            this.props.billSummary,
            this.props.seats,
            this.props.wallet,
            this.props.event,
            this.props.passData,
            this.props.passTicketClasses,
            () => {
              this.setState({ step: this.state.step + 1 });
            }
          );
        }
      }
    }
  };

  changeStepBackward = () => {
    this.setState({ step: 1 });
  };

  goToPayment = () => {
    this.setState({ step: this.state.step + 1 });
  };

  renderBuyTicketForm = (data, ticketClassData) => {
    const { billSummary } = this.props;
    const eventTime = getDateAndTimeFromIso(
      data.eventDateTimeSlot.eventStartTime
    );
    const { step } = this.state;

    switch (step) {
      case 1:
        return (
          <BuyTicketStepOne
            eventDetail={data}
            eventTime={eventTime}
            ticketClasses={this.getFormView(ticketClassData)}
            passClasses={this.getPassesView(ticketClassData)}
            currency={this.props.currency}
            processing={this.props.processing}
            isStandard={
              data.parentEventInfo &&
              data.parentEventInfo.eventType === "STANDARD"
            }
          />
        );
      case 2:
        return (
          <BuyTicketStepTwo
            eventDetail={data}
            eventTime={eventTime}
            isPasses={Boolean(
              billSummary.find(
                (item) =>
                  item.ticketClassType === "PASS" && item.ticketClassQty > 0
              )
            )}
          />
        );
      case 3:
        return (
          <Checkout
            setStepCB={() => this.setState({ step: step + 1 })}
            setCheckoutStepTwo={() => this.setState({ step: 5 })}
          />
        );
      case 4:
        return (
          <BuyTicketConfirmation confirmation={this.props.successfulPayment} />
        );
      case 5:
        return (
          <CheckoutStepTwo
            setCheckoutStepThree={() => this.setState({ step: 6 })}
          />
        );
      case 6:
        return <CheckoutStepThreeVerification />;
      default:
        return (
          <BuyTicketStepOne
            eventTime={eventTime}
            ticketClasses={this.getFormView(ticketClassData)}
            currency={this.props.currency}
          />
        );
    }
  };

  renderBreadCrumbs = () => {
    return (
      <div className="breadcrumbs-fs no-bg">
        <BreadcrumbsItem glyph="home" to="/">
          Home Page
        </BreadcrumbsItem>
        <BreadcrumbsItem to="/events/listing">All Events</BreadcrumbsItem>
        <BreadcrumbsItem to={"/event/detail/" + this.props.match.params.id}>
          Event Detail
        </BreadcrumbsItem>
        <BreadcrumbsItem to={"/event/buy/ticket/" + this.props.match.params.id}>
          Buy Ticket
        </BreadcrumbsItem>

        <div className="breadcrumbs-hero-buttom fl-wrap buy-ticket-bc">
          <div className="breadcrumbs">
            <Breadcrumbs
              item={NavLink}
              finalItem={"span"}
              finalProps={{
                style: { color: "red" },
              }}
            />
          </div>
        </div>
      </div>
    );
  };

  getFormSteps = (step) => {
    const steps = [
      {
        title: "Selection",
      },
      {
        title: "Add More Information",
      },
      {
        title: "Checkout",
      },
    ];

    return (
      <div className="col-lg-12 whiteBackground">
        <ul id="progressbar">
          {steps.map((item, index) => (
            <li
              key={item.title}
              className={step === index + 1 ? "active" : null}
              style={{ width: 100 / steps.length + "%" }}
            >
              <span>{padZeros(index + 1, 2)}.</span>
              {item.title}
            </li>
          ))}
        </ul>
      </div>
    );
  };

  getForm = () => {
    const { event, billSummary } = this.props;
    if (event && event.data) {
      const { step } = this.state;
      const { data } = event.data;
      const { eventTitle, eventDateTimeSlot, parentEventInfo } = data;
      const { eventStartTime } = eventDateTimeSlot;
      const { customSeatingPlan: customSeats } = parentEventInfo;
      return (
        <div id="wrapper">
          {this.renderPassInformationModal(data)}

          <div className="content">
            <section className="Checkout-wrp gre light-red-bg">
              <div className="container custom-container">
                {this.renderBreadCrumbs()}

                <ResultForHeading
                  firstText={"Buy Ticket: "}
                  secondText={
                    eventTitle
                      ? eventTitle +
                        " / " +
                        getDateAndTimeFromIso(eventStartTime)
                      : "Event Title"
                  }
                />

                <div
                  className="row blockOnMobile"
                  style={{
                    display: "block",
                    padding: "0px 15px",
                    marginBottom: "50px",
                    float: "left",
                    width: "100%",
                  }}
                >
                  <div className="col-lg-8 col-md-12 col-sm-12 float-left whiteBackground">
                    {this.getFormSteps(step)}
                    {customSeats && this.renderBuyTicketForm(data, billSummary)}
                  </div>

                  <div className="col-lg-4 col-md-12 col-sm-12 float-left billSummaryContainer">
                    {customSeats && (
                      <BillSummary
                        forward={this.changeStepForward}
                        backward={this.changeStepBackward}
                        currentStep={step}
                        paymentPage={this.goToPayment}
                      />
                    )}
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      );
    }

    return null;
  };

  render() {
    if (this.props.processing) {
      return (
        <AuthRoutes>
          <div id="wrapper">
            <div className="content">
              {this.pageTitle()}
              <div className="breadcrumbs-fs">
                <div className="container">
                  <Breadcrumbs />
                </div>
              </div>
              <Loader height={"100px"} />
            </div>
          </div>
        </AuthRoutes>
      );
    } else {
      if (this.props.error) {
        return <Error message={this.props.errorMessage} />;
      } else {
        return <AuthRoutes>{this.getForm()}</AuthRoutes>;
      }
    }
  }
}

const mapStateToProps = (state) => {
  return {
    event: state.ticket.event,
    processing: state.ticket.processing,
    step: state.ticket.step,
    billSummary: state.ticket.billSummary,
    seats: state.ticket.seats,
    assignedSeats: state.ticket.assignedSeats,
    successfulPayment: state.ticket.successfulPayment,
    user: state.user.user,
    userToken: state.user.token,
    totalBill: state.ticket.totalBill,
    currency: state.ticket.ticketCurrency,
    assignedSeatsForDisplay: state.ticket.assignedSeatsForDisplay,
    seatsAssignedFlag: state.ticket.seatsAssignedFlag,
    passesAssignedFlag: state.ticket.passesAssignedFlag,
    error: state.ticket.error,
    errorMessage: state.ticket.errorMessage,
    wallet: state.user.userWallet,
    passData: state.ticket.passData,
    passTicketClasses: state.ticket.passTicketClasses,
    userPurchasedTickets: state.user.userPurchasedTickets,
  };
};

const connectedComponent = connect(
  mapStateToProps,
  {
    getEventDetail,
    setStep,
    setBillSummary,
    setAssignedSeats,
    resetRedux,
    resetCopounValue,
    fetchUserProfile,
    setUserPurchasedTickets,
  }
)(BuyTicketPage);

export default withRouter(connectedComponent);
