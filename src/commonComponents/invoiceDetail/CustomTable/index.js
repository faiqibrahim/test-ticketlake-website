import React from "react";
import { Table } from "reactstrap";
import classes from "./style.module.css";

const TableHeaders = (props) => {
  return props.columns.map((column, colIndex) => (
    <th key={colIndex}>{column}</th>
  ));
};

class CustomTable extends React.Component {
  render() {
    const { tableData, heading } = this.props;
    const { columns, data } = tableData;

    if (!data.length) return null;

    return (
      <div className={classes.customTable}>
        <h4>{heading}</h4>
        <Table responsive borderless className={`border`}>
          <thead className={`border-bottom ${classes.customHeader}`}>
            <tr>
              <TableHeaders columns={columns} />
            </tr>
          </thead>

          
            <tbody className="border-bottom middle-section">
            <>
              {data.map((row, index) => {
                return (
                  <tr key={index}>
                    {columns.map((col, colIndex) => (
                      <td key={colIndex}>{row[col]}</td>
                    ))}
                  </tr>
                );
              })}
            </>
          </tbody>
        </Table>
      </div>
    );
  }
}

export default CustomTable;
