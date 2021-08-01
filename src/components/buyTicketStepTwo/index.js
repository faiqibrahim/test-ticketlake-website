// Library
import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
// Component
import BuyTicketUserInfoForm from "../buyTicketUserInfoForm";
import BuyTicketMySelfForm from "../buyTicketMyselfForm";
import BuyTicketPassesDisplay from "../buyTicketPassesDisplay";
// Redux Action
import {
  setAssignedBillFromForm,
  removeAssignedSeatsFromDisplay,
  setAssignedBillFromFormForPasses,
} from "../../redux/ticket/ticket-actions";
import Loader from "../../commonComponents/loader";

let keyIndex = -1;
class BuyTicketStepTwo extends Component {
  state = {
    isReset: false,
  };

  displayFormForTicket = (arr) => {
    if (!arr) return null;

    const display = [];
    arr.forEach((item, index) => {
      if (item.ticketClassType !== "PASS") {
        keyIndex++;
        display.push(
          !this.state.isReset && (
            <BuyTicketUserInfoForm
              key={index}
              keyIndex={keyIndex}
              ticketClassName={item.ticket.name}
              seatNumber={item.seatNumber}
              seatName={item.seatName}
              rowNumber={item.rowNumber}
              rowName={item.rowName}
              ticketClassColor={item.ticket.color}
              uniqueId={item.uniqueId}
              onInputChange={this.onInputChange}
              isReset={this.state.isReset}
            />
          )
        );
      }
    });
    return (
      <>
        {
          <div className="card ticketCard">
            <div className="card-header">Guest Tickets</div>
            <div className="card-body">{display}</div>
          </div>
        }
      </>
    );
  };

  displayMySelfForm = (arr, passesArray) => {
    return (
      <BuyTicketMySelfForm
        seats={arr}
        passes={passesArray}
        changer={this.onMyselfChange}
      />
    );
  };

  displayPasses = (passedSeats) => {
    if (passedSeats) {
      const display = [];
      let { eventDetail } = this.props;
      passedSeats.forEach((item, i) => {
        keyIndex++;
        display.push(
          !this.state.isReset && (
            <BuyTicketPassesDisplay
              key={i}
              eventDetail={eventDetail}
              keyIndex={keyIndex}
              passes={item}
              onInputChange={this.onInputChangeForPasses}
            />
          )
        );
      });
      return (
        <>
          {
            <div className="card ticketCard">
              <div className="card-header">Guest Passes</div>
              <div className="card-body">{display}</div>
            </div>
          }
        </>
      );
    }

    return null;
  };

  onMyselfChange = (ticketsArr) => {
    const { customSeatingPlan } = this.props;
    this.setState({ isReset: true }, () => {
      this.props.removeAssignedSeatsFromDisplay(
        ticketsArr ? ticketsArr : null,
        this.props.assignedSeats,
        this.props.passesAssignedSeats,
        customSeatingPlan,
        () => this.setState({ isReset: false })
      );
    });
  };

  onInputChangeForPasses = (index, val, uniqueIndex, passId) => {
    this.props.setAssignedBillFromFormForPasses(
      index,
      val,
      uniqueIndex,
      passId,
      this.props.passesAssignedSeats
    );
  };

  onInputChange = (index, val, rowNumber, seatNumber, uniqueId) => {
    this.props.setAssignedBillFromForm(
      index,
      val,
      rowNumber,
      seatNumber,
      this.props.assignedSeats,
      uniqueId
    );
  };

  render() {
    const {
      processing,
      passesAssignedSeats,
      assignedSeats,
      passesAssignedSeatsForDisplay,
      isPasses,
    } = this.props;

    const isPassLoading =
      isPasses && (!passesAssignedSeats || !passesAssignedSeatsForDisplay);

    if (processing || isPassLoading) return <Loader />;

    return (
      <div className={"col-lg-12"}>
        {this.displayMySelfForm(
          this.props.assignedSeats,
          this.props.passesAssignedSeats
        )}

        {assignedSeats ? (
          <h4
            style={{
              textAlign: "left",
              fontSize: "20px",
              float: "left",
              margin: "25px 0px",
            }}
          >
            Tickets ({this.props.eventTime})
          </h4>
        ) : null}

        {this.displayFormForTicket(this.props.assignedSeatsForDisplay)}

        {this.props.passesAssignedSeats ? (
          <h4
            style={{ textAlign: "left", fontSize: "20px", margin: "45px 0px" }}
          >
            Passes ({this.props.eventTime})
          </h4>
        ) : null}
        {this.displayPasses(this.props.passesAssignedSeatsForDisplay)}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    processing: state.ticket.processing,
    assignedSeats: state.ticket.assignedSeats,
    totalBill: state.ticket.totalBill,
    assignedSeatsForDisplay: state.ticket.assignedSeatsForDisplay,
    passesAssignedSeats: state.ticket.passesAssignedSeats,
    passesAssignedSeatsForDisplay: state.ticket.passesAssignedSeatsForDisplay,
  };
};
const connectedComponent = connect(
  mapStateToProps,
  {
    setAssignedBillFromForm,
    setAssignedBillFromFormForPasses,
    removeAssignedSeatsFromDisplay,
  }
)(BuyTicketStepTwo);

export default withRouter(connectedComponent);
