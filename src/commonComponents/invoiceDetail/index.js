import moment from "moment";
import React from "react";
import { Row, Col } from "reactstrap";
import { prepareTableStructure } from "../../utils/common-utils";
import CustomTable from "./CustomTable";
import InvoiceHeader from "./InvoiceHeader";

const InvoiceHeaders = (props) => {
  return props.headers.map((header) => (
    <InvoiceHeader key={header.title} heading={header.title}>
      {header.content}
    </InvoiceHeader>
  ));
};

class InvoiceDetail extends React.Component {
  invoiceHeaders = [
    {
      title: "Order Date",
      content: moment(new Date()).format("MM/DD/YYYY"),
    },

    {
      title: "Event Name",
      content: "Event",
    },

    {
      title: "Status",
      content: "Active",
    },
  ];

  render() {
    return (
      <Row style={{ paddingTop: "115px" }}>
        <Col md={3} className="red-bg">
          <Row style={{ padding: "20px" }}>
            <Col md="12">
              <InvoiceHeaders headers={this.invoiceHeaders} />
            </Col>
          </Row>
        </Col>

        <Col md={9}>
          <Row style={{ padding: "20px" }}>
            <h4> Tickets </h4>
            <CustomTable
              tableData={prepareTableStructure([1])}
              noDataText={"No ticket"}
            />

            <h4> Passes </h4>
            <CustomTable
              tableData={prepareTableStructure([])}
              noDataText={"No passes"}
            />

            <h4> Wallet </h4>
            <CustomTable
              tableData={prepareTableStructure([])}
              noDataText={"No wallet"}
            />
          </Row>
        </Col>
      </Row>
    );
  }
}

export default InvoiceDetail;
