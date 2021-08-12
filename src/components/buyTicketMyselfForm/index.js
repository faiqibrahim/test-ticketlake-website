// Library
import React from "react";
import {
  Row,
  Col,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from "reactstrap";
import { Checkbox, Divider } from "antd";
import { connect } from "react-redux";
import {
  setAssignedSeatsForDisplay,
  setPassesAssignedSeatsForDisplay,
} from "../../redux/ticket/ticket-actions";
import { withRouter } from "react-router-dom";

class BuyTicketMyselfForm extends React.Component {
  is_Mounted = false;
  state = {
    modalOpen: false,
    tickets: [],
    passes: [],
    allTickets: [],
    checkedSeatValuesOnSeatSelect: [],
    checkedSeatValues: [],

    ticketSelected: false,

    indeterminate: false,
    checkAll: true,
  };

  componentDidMount() {
    this.is_Mounted = true;
    const { checkAll } = this.state;
    const { changer } = this.props;
    if (checkAll) {
      const allTickets = this.getAllSelectedTickets();
      if (this.is_Mounted) {
        this.setState(
          {
            checkedSeatValues: allTickets,
            ticketSelected: allTickets,
            allTickets,
          },
          () => changer(allTickets)
        );
      }
    }
  }

  getAllSelectedTickets = () => {
    const { seats, passes } = this.props;
    const allTickets = [];
    seats &&
      seats.forEach((seatItem) => {
        allTickets.push(this.getTicketFormattedText(seatItem));
      });

    passes &&
      passes.forEach((passItem) => {
        allTickets.push(this.getTicketFormattedText(passItem));
      });
    return allTickets;
  };

  componentWillUnmount() {
    this.is_Mounted = false;
  }

  openDeleteModal = () => this.setState({ modalOpen: !this.state.modalOpen });

  getTicketFormattedText = (item) => {
    if (item.ticketClassType !== "PASS") {
      return `${item.ticketClassType}|${item.ticket && item.ticket.name}|${
        item.rowNumber
      }|${item.seatNumber}`;
    } else {
      return `${item.ticketClassType}|${item.passTitle}|${item.passId}|${item.ticketClassId}|${item.uniqueIndex}`;
    }
  };

  onCheckAllChange = (e) => {
    if (e.target.checked) {
      const allTickets = this.getAllSelectedTickets();
      this.setState({
        checkedSeatValues: allTickets,
        checkAll: true,
        indeterminate: false,
      });
    } else {
      this.setState({
        checkedSeatValues: [],
        checkAll: false,
        indeterminate: false,
      });
    }
  };

  onCheckboxGroupChange = (checkedList) => {
    const { allTickets } = this.state;
    this.setState({
      checkedSeatValues: checkedList,
      indeterminate:
        !!checkedList.length && checkedList.length < allTickets.length,
      checkAll: checkedList.length === allTickets.length,
    });
  };

  showAvailableTickets = () => {
    const {
      tickets: availableTickets,
      passes: availablePasses,
      checkAll,
      indeterminate,
      checkedSeatValues,
    } = this.state;

    let uniqueID = -1;
    return (
      <div style={{ paddingLeft: "2%" }}>
        <div className="check-all-checkbox">
          <Checkbox
            indeterminate={indeterminate}
            onChange={this.onCheckAllChange}
            checked={checkAll}
          >
            Select All
          </Checkbox>
        </div>

        <Checkbox.Group
          style={{ width: "100%" }}
          onChange={this.onCheckboxGroupChange}
          value={checkedSeatValues}
        >
          <Row style={{ display: "table", width: "100%" }}>
            <Col span={12}>
              {availableTickets &&
                availableTickets.map((item) => {
                  uniqueID++;
                  return (
                    <Row
                      key={`${uniqueID},${item.ticketClassType}|${item.ticket &&
                        item.ticket.name}|${item.rowNumber}|${item.seatNumber}`}
                    >
                      <Col xs="12" style={{ textAlign: "initial" }}>
                        <Checkbox
                          value={`${item.ticketClassType}|${item.ticket &&
                            item.ticket.name}|${item.rowNumber}|${
                            item.seatNumber
                          }`}
                          className={"checkbox-style"}
                        >
                          {item.ticketClassType} | {item.ticket.name} | Row #:{" "}
                          {item.rowNumber} | Seat # {item.seatNumber}
                        </Checkbox>
                      </Col>
                    </Row>
                  );
                })}
            </Col>

            {availablePasses &&
            availablePasses.length > 0 &&
            availableTickets && availableTickets.length !== 0 ? (
              <Divider />
            ) : null}

            {/* Checkboxes for Passes */}
            <Col span={12}>
              {availablePasses &&
                availablePasses.map((item) => {
                  uniqueID++;
                  return (
                    <Row
                      key={`${uniqueID},${item.ticketClassType}|${item.passTitle}|${item.passId}|${item.ticketClassId}|${item.uniqueIndex}`}
                    >
                      <Col xs="12" style={{ textAlign: "initial" }}>
                        <Checkbox
                          value={`${item.ticketClassType}|${item.passTitle}|${item.passId}|${item.ticketClassId}|${item.uniqueIndex}`}
                          className={"checkbox-style"}
                        >
                          {item.ticketClassType} | {item.passTitle} |{" "}
                          {item.uniqueIndex}
                        </Checkbox>
                      </Col>
                    </Row>
                  );
                })}
            </Col>
          </Row>
        </Checkbox.Group>
      </div>
    );
  };

  getModalContent = (selectText) => {
    return (
      <Modal
        centered={true}
        isOpen={this.state.modalOpen}
        toggle={this.openDeleteModal}
        style={{ margin: "auto", width: "100%" }}
        className={"modal-danger " + this.props.className}
      >
        <ModalHeader toggle={this.openDeleteModal}>{selectText}</ModalHeader>

        <ModalBody className={"scroll"}>
          {this.showAvailableTickets()}
        </ModalBody>

        <ModalFooter>
          <button
            className={
              "center-btn btn btn-danger buttonDefault defaultBackground full-width align-center"
            }
            onClick={() => this.onSaveTicketsClick()}
          >
            Save
          </button>
        </ModalFooter>
      </Modal>
    );
  };

  onSaveTicketsClick = () => {
    const { props: stateProps, checkedSeatValues, modalOpen } = this.state;
    const { changer } = stateProps;

    let checkedSeatValuesArr = checkedSeatValues;
    let finalCheckedSeatValuesArr = checkedSeatValuesArr;

    this.setState(
      {
        checkedSeatValues: finalCheckedSeatValuesArr,
        ticketSelected: finalCheckedSeatValuesArr,
        modalOpen: !modalOpen,
      },
      () => {
        let ticketsToDisplay = this.ticketsToDisplay(this.state);
        let passesToDisplay = this.passesToDisplay(this.state);
        this.props.setAssignedSeatsForDisplay(ticketsToDisplay);
        this.props.setPassesAssignedSeatsForDisplay(passesToDisplay);
        changer(checkedSeatValues);
      }
    );
  };

  ticketsToDisplay = (state) => {
    let availableTickets = state.tickets;
    let checkedSeats = state.checkedSeatValues;
    for (let j = 0; j < checkedSeats.length; j++) {
      availableTickets =
        availableTickets &&
        availableTickets.filter((availableTicket) => {
          let currentAvailableTicket = `${
            availableTicket.ticketClassType
          }|${availableTicket.ticket && availableTicket.ticket.name}|${
            availableTicket.rowNumber
          }|${availableTicket.seatNumber}`;
          return checkedSeats[j] !== currentAvailableTicket;
        });
    }
    return availableTickets;
  };

  passesToDisplay = (state) => {
    let availablePasses = state.passes;
    let checkedSeats = state.checkedSeatValues;
    for (let j = 0; j < checkedSeats.length; j++) {
      availablePasses =
        availablePasses &&
        availablePasses.filter((availablePass) => {
          let currentAvailablePass = `${availablePass.ticketClassType}|${availablePass.passTitle}|${availablePass.passId}|${availablePass.ticketClassId}|${availablePass.uniqueIndex}`;
          return checkedSeats[j] !== currentAvailablePass;
        });
    }
    return availablePasses;
  };

  onSelectMyTickets = (props, selectedTickets) => {
    const allTickets = this.getAllSelectedTickets();
    this.setState({
      modalOpen: !this.state.modalOpen,
      tickets: props.seats,
      passes: props.passes,
      props: props,
      checkedSeatValues: selectedTickets,
      indeterminate:
        !!selectedTickets.length && selectedTickets.length < allTickets.length,
      checkAll: selectedTickets.length === allTickets.length,
    });
  };

  getSelectText = () => {
    let title = "Select Tickets & Passes For Myself";
    const { passes, seats } = this.props;
    if (!passes || (passes && !passes.length)) {
      title = "Select Tickets For Myself";
    } else if (!seats || (seats && !seats.length)) {
      title = "Select Passes For Myself";
    }
    return title;
  };

  getButtonText = (selectedTickets, selectText) => {
    let ticketButtonText = `+ ${selectText}`;
    if (!selectedTickets) return ticketButtonText;

    const hasTicket = selectedTickets.filter(
      (ticket) => ticket.split("|")[0] !== "PASS"
    ).length;

    const hasPass = selectedTickets.filter(
      (ticket) => ticket.split("|")[0] === "PASS"
    ).length;

    if (hasTicket && hasPass) {
      ticketButtonText = "Tickets & Passes have been selected";
    } else if (hasTicket && selectedTickets.length === 1) {
      ticketButtonText = "Ticket has been selected";
    } else if (hasPass && selectedTickets.length === 1) {
      ticketButtonText = "Pass has been selected";
    } else if (hasTicket && selectedTickets.length > 1) {
      ticketButtonText = "Tickets have been selected";
    } else if (hasPass && selectedTickets.length > 1) {
      ticketButtonText = "Passes have been selected";
    }

    return ticketButtonText;
  };

  render() {
    let props = this.props;
    const { ticketSelected: selectedTickets } = this.state;
    const selectText = this.getSelectText();
    return (
      <div className="card ticketCard">
        {this.getModalContent(selectText)}
        <div className="card-header">My Tickets & Passes</div>
        <div className="card-body">
          <div className="row">
            <div className="col-md-12">
              <div className="col-list-search-input-item location autocomplete-container">
                <button
                  className={`selectMyTicketBtn ${
                    selectedTickets.length > 0 ? "selectedTicketsMyself" : ""
                  }`}
                  onClick={() => this.onSelectMyTickets(props, selectedTickets)}
                >
                  {this.getButtonText(selectedTickets, selectText)}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const connectedComponent = connect(null, {
  setAssignedSeatsForDisplay,
  setPassesAssignedSeatsForDisplay,
})(BuyTicketMyselfForm);
export default withRouter(connectedComponent);
