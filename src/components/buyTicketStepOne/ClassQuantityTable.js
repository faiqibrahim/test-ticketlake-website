import React from "react";

const ClassQuanityTable = (props) => {
  const { heading, eventTime, bodyContent, isPassView } = props;

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
          textIndent: "15px",
          fontSize: "20px",
          float: "left",
        }}
      >
        {`${heading} (${eventTime})`}
      </h4>
      <div className="table-responsive" style={{ padding: "15px" }}>
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
};

export default ClassQuanityTable;
