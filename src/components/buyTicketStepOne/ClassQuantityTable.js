import React from "react";

class ClassQuanityTable extends React.Component {
  constructor() {
    super();
    this.state = {};
  }
  render() {
    const { heading, eventTime, bodyContent, isPassView, style } = this.props;

    if (!bodyContent.length) return null;

    const headers = ["Class", "Price", "Available", "Qty."];
    if (isPassView) {
      headers.unshift("Title");
      headers.push("");
    }

    return (
      <React.Fragment>
        <h4
          style={{
            textAlign: "left",
            fontSize: "20px",
            float: "left",
            marginBottom:"1rem"
          }}
        >
          {`${heading} (${eventTime})`}
        </h4>
        <div className="table-responsive" style={style}>
          <table className="table table-borderless customTable">
            <thead>
              <tr>
                {headers.map((header) => (
                  <th key={header}>{header}</th>
                ))}
              </tr>
            </thead>
            <tbody>{bodyContent}</tbody>
          </table>
        </div>
      </React.Fragment>
    );
  }
}

export default ClassQuanityTable;
