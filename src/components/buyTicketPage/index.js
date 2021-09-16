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
import { seatSessionKey } from "../../utils/constant";
import { fetchSeatsCapacity } from "./apiHandler";

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
      purchaseType: "ticket",
      seatsType: "",
      seatSelection: "",
      venueSeats: [],
    };
  }

  componentDidMount() {
    this.props.resetRedux();
    let eventId = this.props.match.params.id;
    this.props.getEventDetail(eventId);
    this.props.fetchUserProfile();
    sessionStorage.removeItem(seatSessionKey);
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
    const bills = this.props.billSummary;
    const itemIndex = bills.findIndex(
      (obj) =>
        obj.ticketClassName === name &&
        obj.ticketClassId === ticketClassId &&
        obj.uniqueId === uniqueId
    );

    if (
      parseInt(val) <= parseInt(event.target.max) &&
      parseInt(val) >= parseInt(event.target.min)
    ) {
      bills[itemIndex].ticketClassQty = parseInt(val);
    } else if (val > bills[itemIndex].ticketClassQty) {
      NotificationManager.error(
        "You cannot select more than Available Tickets.",
        "",
        3000
      );
    }

    this.props.setBillSummary(bills);
    this.setState({ bills });
  };

  getSeatInfo = (seat) => {
    const { labels: labelInfo, label, seatId } = seat;
    const { parent, own: seatNumber, section } = labelInfo;
    const row = parent || "N/A";

    return {
      label,
      seatNumber,
      seatName: seatId,
      sectionId: section,
      sectionName: section,
      rowName: `${row}`,
      rowNumber: `${row}`,
    };
  };

  prepareVenueSeatsData = (seat, selected = true) => {
    const { venueSeats } = this.state;
    const { category, label } = seat;
    const selectedSeatClass = category.label;
    let classSeats = venueSeats[selectedSeatClass] || [];

    if (selected) {
      classSeats.push(this.getSeatInfo(seat));
    } else {
      classSeats = classSeats.filter((seatItem) => seatItem.label !== label);
    }

    venueSeats[selectedSeatClass] = [...classSeats];

    return venueSeats;
  };

  onSeatChange = (seat, selected = true) => {
    const { billSummary } = this.props;
    const { category } = seat;

    const bills = [...billSummary];

    const selectedSeatClass = category.label;

    const itemIndex = bills.findIndex(
      (item) => item.ticketClassName === selectedSeatClass
    );

    const { ticketClassQty } = bills[itemIndex];

    if (selected) {
      bills[itemIndex].ticketClassQty = ticketClassQty + 1;
    } else {
      bills[itemIndex].ticketClassQty = ticketClassQty - 1;
    }

    this.props.setBillSummary(bills);
    this.setState({
      bills,
      venueSeats: this.prepareVenueSeatsData(seat, selected),
    });
  };

  resetBillSummary = () => {
    const { billSummary, setBillSummary } = this.props;
    const bills = [...billSummary];

    bills.forEach((billItem) => (billItem.ticketClassQty = 0));

    setBillSummary(bills);
    this.setState({ bills: bills });
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
      if (singleItem.ticketClassType !== "PASS") {
        if (singleItem.availableTickets > 0) {
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

    return jsx;
  };

  prepareReservationData = () => {
    const {
      event: { data },
      billSummary,
    } = this.props;


    const ticketClassesInfo = billSummary
      .filter(({ ticketClassQty }) => ticketClassQty > 0)
      .map((billItem) => {
        const { ticketClassId, ticketClassName, ticketClassQty } = billItem;
        return {
          ticketClassId,
          ticketClassName,
          count: ticketClassQty,
        };
      });

    const reservationData = {
      eventId: data.data._id,
      ticketClassesInfo,
    };

    return reservationData;
  };

  changeStepForward = async (isCustomSeats) => {
    const {
      bills,

      seatsAssignedFlag,
      passesAssignedFlag,
    } = this.props;
    const { seatSelection } = this.state;
    let { venueSeats } = this.state;


    if (this.state.step === 1) {
      let billsData = bills || [];
      let buyingFreeTicketsCount = this.getBuyingFreeTickets(billsData);
      let totalFreeTickets = buyingFreeTicketsCount + totalFreeTicketCount;
      if (!(seatsAssignedFlag || passesAssignedFlag) && isCustomSeats) {
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
          3000
        );
      } else {
        console.log("Api Data", this.prepareReservationData());
        if(seatSelection === 'auto'){
          const reservationData = this.prepareReservationData();
          const seatsData = await fetchSeatsCapacity(reservationData);
          
          seatsData.forEach((seatItem)=>{
            venueSeats = this.prepareVenueSeatsData(seatItem);
          })
        }


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
            venueSeats,
            isCustomSeats,
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

  findClassType = (type) => {
    const { billSummary } = this.props;
    return Boolean(
      billSummary.find(
        ({ ticketClassType }) => ticketClassType.toLowerCase() === type
      )
    );
  };

  renderBuyTicketForm = (data, ticketClassData, customSeatingPlan) => {
    const { billSummary, currency } = this.props;
    const { eventDateTimeSlot, parentEventInfo } = data;
    const eventTime = getDateAndTimeFromIso(eventDateTimeSlot.eventStartTime);
    const isStandard =
      parentEventInfo && parentEventInfo.eventType === "STANDARD";

    const { step, purchaseType, seatsType, seatSelection } = this.state;
    switch (step) {
      case 1:
        return (
          <BuyTicketStepOne
            eventDetail={data}
            eventTime={eventTime}
            isStandard={isStandard}
            currency={currency}
            customSeatingPlan={customSeatingPlan}
            ticketClassData={ticketClassData}
            ticketClasses={this.getFormView(ticketClassData)}
            passClasses={this.getPassesView(ticketClassData)}
            seatProps={{ purchaseType, seatSelection, seatsType }}
            setSeatState={(seatState, cb) =>
              this.setState(seatState, cb && cb())
            }
            onSeatChange={this.onSeatChange}
            resetBill={this.resetBillSummary}
            hasTable={this.findClassType("table")}
            hasSeat={this.findClassType("regular")}
          />
        );
      case 2:
        return (
          <BuyTicketStepTwo
            eventDetail={data}
            eventTime={eventTime}
            customSeatingPlan={customSeatingPlan}
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
            customSeatingPlan={customSeatingPlan}
            seatProps={{ purchaseType, seatSelection, seatsType }}
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
            customSeatingPlan={customSeatingPlan}
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
              compare={(a, b) => a.weight - b.weight}
              removeProps={{ weight: true }}
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
                    {this.renderBuyTicketForm(data, billSummary, customSeats)}
                  </div>

                  <div className="col-lg-4 col-md-12 col-sm-12 float-left billSummaryContainer">
                    <BillSummary
                      forward={() =>
                        this.changeStepForward(customSeats).catch(console.error)
                      }
                      backward={() => this.changeStepBackward(customSeats)}
                      currentStep={step}
                      paymentPage={() => this.goToPayment(customSeats)}
                      customSeatingPlan={customSeats}
                    />
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

const connectedComponent = connect(mapStateToProps, {
  getEventDetail,
  setStep,
  setBillSummary,
  setAssignedSeats,
  resetRedux,
  resetCopounValue,
  fetchUserProfile,
  setUserPurchasedTickets,
})(BuyTicketPage);

export default withRouter(connectedComponent);
