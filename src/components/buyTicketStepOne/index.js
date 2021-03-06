// Library
import React from "react";
import ClassQuanityTable from "./ClassQuantityTable";
import { Radio, Form } from "antd";
import { SeatsioSeatingChart } from "@seatsio/seatsio-react";
import "./style.css";
import { formatCurrency, getVenuePrices } from "../../utils/common-utils";
import EventMessage from "../../commonComponents/eventMessage";
import { getSeatsIOPublicKey } from "../../utils/config";

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

  animatedStyle = (value) => {
    return {
      height: value ? "auto" : "0",
      marginBottom: value ? "2.5rem" : "0",
      opacity: value ? "1" : "0",
      transition: "opacity 1s linear ",
    };
  };

  displayPurchaseType = () => {
    const {
      ticketClasses,
      passClasses,
      seatProps,
      setSeatState,
      resetBill,
    } = this.props;

    const typeOptions = [];
    ticketClasses.length > 0 &&
      typeOptions.push({ value: "ticket", name: "Tickets" });
    passClasses.length > 0 && typeOptions.push({ value: "pass", name: "Packages" });

    return (
      <Form.Item label={"Select Purchase Type"}>
        <SeatsRadio
          name={"purchaseType"}
          value={seatProps.purchaseType}
          radioOptions={typeOptions}
          onChange={({ target }) =>
            setSeatState(
              {
                purchaseType: target.value,
                seatSelection: "",
                seatsType: "",
              },
              resetBill()
            )
          }
        />
      </Form.Item>
    );
  };

  displaySeatSelection = () => {
    const { seatProps, setSeatState, resetBill } = this.props;
    const { purchaseType, seatSelection } = seatProps;
    return (
      <Form.Item
        label="Seats Selection"
        style={this.animatedStyle(purchaseType)}
      >
        <SeatsRadio
          name={"seatSelection"}
          value={seatSelection}
          radioOptions={[
            { value: "preferred", name: "Reserved Seating" },
            { value: "auto", name: "Auto Select" },
          ]}
          onChange={({ target }) =>
            setSeatState(
              { seatSelection: target.value, seatsType: "" },
              resetBill()
            )
          }
        />
      </Form.Item>
    );
  };

  displaySeatType = () => {
    const { seatProps, setSeatState, hasSeat, hasTable } = this.props;
    const { purchaseType, seatSelection, seatsType } = seatProps;

    if (purchaseType === "ticket" && seatSelection === "preferred") return null;

    const typeOptions = [];
    hasSeat && typeOptions.push({ value: "seat", name: "Purchase Tickets" });
    hasTable && typeOptions.push({ value: "Table", name: "Reserve Tables" });

    return (
      <Form.Item label="Seats Type" style={this.animatedStyle(seatSelection)}>
        <SeatsRadio
          name={"seatsType"}
          value={seatsType}
          radioOptions={typeOptions}
          onChange={({ target }) => setSeatState({ seatsType: target.value })}
        />
      </Form.Item>
    );
  };

  displayClasses = () => {
    const { seatProps } = this.props;
    return (
      <div style={this.animatedStyle(seatProps.seatSelection === "auto")}>
        {this.displayClassesTable()}
      </div>
    );
  };

  displayVenue = () => {
    const {
      eventDetail,
      seatProps,
      ticketClassData,
      currency,
      onSeatChange,
    } = this.props;
    const { purchaseType, seatSelection, seatsType } = seatProps;

    if (!purchaseType || !seatSelection || seatSelection !== "preferred")
      return null;

    let renderOnValue = purchaseType === "ticket" ? seatSelection : seatsType;
    renderOnValue = seatSelection === "auto" ? "" : renderOnValue;
    return (
      <div style={this.animatedStyle(renderOnValue)}>
        <SeatsioSeatingChart
          region="eu"
          showLegend
          session="continue"
          workspaceKey={getSeatsIOPublicKey()}
          event={eventDetail.eventSlotId}
          objectWithoutPricingSelectable={false}
          legend={{ hideNonSelectableCategories: true }}
          objectIcon={() => "fa fa-user-circle-o"}
          colorScheme="light"
          pricing={getVenuePrices(purchaseType, ticketClassData)}
          priceFormatter={(price) => {
            return `${formatCurrency(price, currency)} `;
          }}
          onObjectSelected={(seat) => onSeatChange(seat)}
          onObjectDeselected={(seat) => onSeatChange(seat, false)}
          className={"seats-io-wrp"}
        />
      </div>
    );
  };

  renderSeatsView = () => {
    return (
      <div className="col-md-12 text-left seatsView">
        <React.Fragment>
          {/* {this.displayPurchaseType()} */}
          {this.displaySeatSelection()}
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
    const { customSeatingPlan, ticketClasses, passClasses } = this.props;

    if (!ticketClasses.length && !passClasses.length)
      return (
        <EventMessage
          heading="Sorry!"
          subHeading="There are no tickets or passes available to purchase this event."
        />
      );

    return (
      <React.Fragment>
        {customSeatingPlan ? this.renderCustomView() : this.renderSeatsView()}
      </React.Fragment>
    );
  }
}

export default BuyTicketStepOne;
