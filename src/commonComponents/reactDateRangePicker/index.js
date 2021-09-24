// Import
import React, { Component } from "react";
import DateRangePicker from "react-bootstrap-daterangepicker";

class ReactDateRangePicker extends Component {

  render() {
    const { startDate, endDate, onChange, dateRanges } = this.props;

    return (
      <DateRangePicker
        className={"filterDateRange"}
        onCallback={onChange}
        initialSettings={{
          startDate,
          endDate,
          ranges: {
            Today: [dateRanges.Today, dateRanges.Today],

            Tomorrow: [dateRanges.Tomorrow, dateRanges.Tomorrow],

            "This Week": [dateRanges["Week Start"], dateRanges["Week End"]],

            "This Weekend": [dateRanges["Week End"], dateRanges["Week End"]],

            "Next Week": [
              dateRanges["Next Week Start"],
              dateRanges["Next Week End"],
            ],

            "Next Weekend": [
              dateRanges["Next Week End"],
              dateRanges["Next Week End"],
            ],

            "This Month": [dateRanges["Month Start"], dateRanges["Month End"]],
          },
        }}
      >
        <input type="text" className="form-control" readOnly />
      </DateRangePicker>
    );
  }
}

export default ReactDateRangePicker;
