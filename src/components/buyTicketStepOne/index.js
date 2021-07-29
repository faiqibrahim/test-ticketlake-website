// Library
import React from "react";
import ClassQuanityTable from "./ClassQuantityTable";
import { Radio, Form } from "antd";
import "./style.css";
import { seatFormJSON } from "../../utils/json-utils";

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
      formJSON: [...this.getFormJSON()],
    };
  }

  getFormJSON = () => {
    const { ticketsAndPassesInfo } = this.props;
    const { isTickets, isPasses } = ticketsAndPassesInfo;

    const jsonProps = {
      onTypeChange: this.onPurchaseTypeChange,
      onSelectionChange: this.onSelectionChange,
      isTickets,
      isPasses,
    };

    return seatFormJSON(jsonProps);
  };

  //#region Event Handlers

  onPurchaseTypeChange = (value) => {
    this.setState({
      purchaseType: value,
      seatSelection: "",
      formJSON: [...this.getFormJSON()],
    });
  };

  onSelectionChange = (seatSelection) => {
    const { purchaseType } = this.state;
    const { name, value: selectionValue } = seatSelection;
    const formJSON = [...this.getFormJSON()];

    const seatTypeObject = {
      label: "Seats Type",
      name: "seatsType",
      renderOnKey: "seatSelection",
      type: "radio",
      radioOptions: [
        { value: "seat", name: "Seat" },
        { value: "Table", name: "Table" },
      ],
      onChange: this.onSeatTypeChange,
    };

    const isAutoTicket = purchaseType === "ticket" && selectionValue === "auto";

    if (purchaseType === "pass" || isAutoTicket) {
      formJSON.push(seatTypeObject);
    }

    this.setState({ [name]: selectionValue, seatsType: "", formJSON });
  };

  onSeatTypeChange = ({ target }) => {
    const formJSON = [...this.state.formJSON];

    formJSON.length < 4 &&
      formJSON.push({
        name: "classTable",
        label: "",
        renderOnKey: "seatSelection",
        customComponent: this.displayClassesTable(),
      });

    this.setState({ seatsType: target.value, formJSON });
  };

  //#endregion

  displayClassesTable = () => {
    const { isStandard, ticketClasses, passClasses } = this.props;
    return (
      <div style={{ paddingRight: "15px" }}>
        <ClassQuanityTable
          heading={"Tickets"}
          bodyContent={ticketClasses}
          {...this.props}
        />
        {!isStandard && (
          <ClassQuanityTable
            heading={"Passes"}
            bodyContent={passClasses}
            isPassView={!isStandard && passClasses && passClasses.length}
            {...this.props}
          />
        )}
      </div>
    );
  };

  renderSeatsView = () => {
    const { formJSON } = this.state;

    const animatedStyle = (key) => {
      const value = this.state[key];
      return {
        height: value ? "auto" : "0",
        marginBottom: value ? "24px" : "0",
        opacity: value ? "1" : "0",
        transition: "opacity 1s linear ",
      };
    };

    return (
      <div className="col-md-12 text-left mb-5 seatsView">
        {formJSON.map((jsonItem, index) => {
          const {
            renderOnKey,
            name,
            label,
            type,
            customComponent,
            radioOptions,
            onChange,
          } = jsonItem;

          return (
            <React.Fragment key={index}>
              {type === "radio" ? (
                <Form.Item
                  label={label}
                  style={renderOnKey && animatedStyle(renderOnKey)}
                >
                  <SeatsRadio
                    name={name}
                    value={this.state[name]}
                    radioOptions={radioOptions}
                    onChange={onChange}
                  />
                </Form.Item>
              ) : (
                customComponent
              )}
            </React.Fragment>
          );
        })}
      </div>
    );
  };

  renderCustomView = () => {
    return (
      <div style={{ paddingLeft: "15px" }}>{this.displayClassesTable()}</div>
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
