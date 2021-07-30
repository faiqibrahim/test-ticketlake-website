// Library
import React from "react";
import ClassQuanityTable from "./ClassQuantityTable";
import { Radio, Form } from "antd";
import { SeatsioSeatingChart } from "@seatsio/seatsio-react";
import "./style.css";
import { seatsIOPublicKey } from "../../utils/constant";

const SeatsRadio = (props) => {
  const { value, onChange, radioOptions, name } = props;
  return (
    <Radio.Group
      name={name}
      className="radioGroup"
      value={value}
      onChange={onChange}
    >
      {radioOptions.map(({ name, value }) => (
        <Radio key={value} value={value}>
          {name}
        </Radio>
      ))}
    </Radio.Group>
  );
};

class BuyTicketStepOne extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      purchaseType: "",
      seatSelection: "",
      seatsType: "",
    };
  }

  displayClassesTable = () => {
    const { isStandard, ticketClasses, passClasses } = this.props;
    return (
      <div style={{ paddingRight: "15px", height: "inherit" }}>
        <ClassQuanityTable
          heading={"Tickets"}
          bodyContent={ticketClasses}
          style={{ height: "inherit" }}
          {...this.props}
        />
        {!isStandard && (
          <ClassQuanityTable
            heading={"Passes"}
            bodyContent={passClasses}
            isPassView={!isStandard && passClasses && passClasses.length}
            style={{ height: "inherit" }}
            {...this.props}
          />
        )}
      </div>
    );
  };

  animatedStyle = (key) => {
    const value = this.state[key];
    return {
      height: value ? "auto" : "0",
      marginBottom: value ? "24px" : "0",
      opacity: value ? "1" : "0",
      transition: "opacity 1s linear ",
    };
  };

  displayPurchaseType = () => {
    const { ticketsAndPassesInfo } = this.props;
    const { isTickets, isPasses } = ticketsAndPassesInfo;
    const typeOptions = [];
    isTickets && typeOptions.push({ value: "ticket", name: "Ticket" });
    isPasses && typeOptions.push({ value: "pass", name: "Pass" });

    return (
      <Form.Item label={"Select Purchase Type"}>
        <SeatsRadio
          name={"purchaseType"}
          value={this.state["purchaseType"]}
          radioOptions={typeOptions}
          onChange={({ target }) =>
            this.setState({
              purchaseType: target.value,
              seatSelection: "",
            })
          }
        />
      </Form.Item>
    );
  };

  displaySeatSelection = () => {
    return (
      <Form.Item
        label="Seats Selection"
        style={this.animatedStyle("purchaseType")}
      >
        <SeatsRadio
          name={"seatSelection"}
          value={this.state["seatSelection"]}
          radioOptions={[
            { value: "preferred", name: "Preferred" },
            { value: "auto", name: "Auto" },
          ]}
          onChange={({ target }) =>
            this.setState({ seatSelection: target.value, seatsType: "" })
          }
        />
      </Form.Item>
    );
  };

  displaySeatType = () => {
    const { purchaseType, seatSelection } = this.state;

    if (purchaseType === "ticket" && seatSelection === "preferred") return null;

    return (
      <Form.Item label="Seats Type" style={this.animatedStyle("seatSelection")}>
        <SeatsRadio
          name={"seatsType"}
          value={this.state["seatsType"]}
          radioOptions={[
            { value: "seat", name: "Seat" },
            { value: "Table", name: "Table" },
          ]}
          onChange={({ target }) => this.setState({ seatsType: target.value })}
        />
      </Form.Item>
    );
  };

  displayClasses = () => {
    return (
      <div style={this.animatedStyle("seatsType")}>
        {this.displayClassesTable()}
      </div>
    );
  };

  displayVenue = () => {
    const { eventDetail } = this.props;
    const { purchaseType, seatSelection } = this.state;

    if (seatSelection === "auto") return null;

    const renderOn = purchaseType === "ticket" ? "seatSelection" : "seatsType";
    return (
      <div style={this.animatedStyle(renderOn)}>
        <SeatsioSeatingChart
          workspaceKey={seatsIOPublicKey}
          event={eventDetail.eventSlotId}
          region="eu"
        />
      </div>
    );
  };
  renderSeatsView = () => {
    return (
      <div className="col-md-12 text-left mb-5 seatsView">
        <React.Fragment>
          {this.displayPurchaseType()}
          {this.displaySeatSelection()}
          {this.displaySeatType()}
          {this.displayClasses()}
          {this.displayVenue()}
        </React.Fragment>
      </div>
    );
  };

  renderCustomView = () => {
    return (
      <div style={{ paddingLeft: "15px", height: "inherit" }}>
        {this.displayClassesTable()}
      </div>
    );
  };

  render() {
    const { customSeatingPlan } = this.props;
    return (
      <React.Fragment>
        {customSeatingPlan ? this.renderCustomView() : this.renderSeatsView()}
      </React.Fragment>
    );
  }
}

export default BuyTicketStepOne;
