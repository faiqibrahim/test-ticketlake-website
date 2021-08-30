import React from "react";
import { Table } from "reactstrap";
import classes from "./style.module.css";

const TableHeaders = (props) => {
  return props.columns.map((column) => <th>{column}</th>);
};

class CustomTable extends React.Component {
  render() {
    const { noDataText, tableData } = this.props;
    const { columns, data } = tableData;

    return (
      <Table responsive borderless className="border custom-table">
        <thead className={`border-bottom ${classes.customHeader}`}>
          <tr>
            <TableHeaders columns={columns} />
          </tr>
        </thead>

        <tbody className="border-bottom middle-section">
          <>
            {!data.length && noDataText}

            {data.map((row, index) => {
              return (
                <tr key={index}>
                  {columns.map((col) => (
                    <td>{row[col]}</td>
                  ))}
                </tr>
              );
            })}
          </>
        </tbody>
      </Table>
    );
  }
}

export default CustomTable;
