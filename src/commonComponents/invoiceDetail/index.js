import React from "react";
import { CloseCircleOutlined } from "@ant-design/icons";
import { Row, Col } from "reactstrap";
import {
  preparePassStructure,
  prepareTicketStructure,
  prepareTransactionStructure,
} from "../../utils/common-utils";
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
      title: "Event Name",
      content: "Event",
    },

    {
      title: "Status",
      content: "Active",
    },
  ];

  render() {
    const { orderDetails, closeModalCB } = this.props;

    if (!orderDetails) return null;

    const { _id: orderNumber } = orderDetails;

    return (
      <Row style={{ paddingTop: "115px" }} className="transaction-history">
        <Col md={3} className="red-bg">
          <Row style={{ padding: "20px" }}>
            <Col md="12">
              <InvoiceHeaders headers={this.invoiceHeaders} />
            </Col>
          </Row>
        </Col>

        <Col md={9} className="white-bg">
          <h3>Order# {orderNumber}</h3>
          <CloseCircleOutlined
            size="large"
            className="close-button close-btn-styling"
            onClick={closeModalCB}
          />
          <Row style={{ padding: "20px" }}>
            <CustomTable
              tableData={prepareTicketStructure(orderDetails.tickets)}
              noDataText={"No ticket"}
              heading={"Tickets"}
            />

            <CustomTable
              tableData={preparePassStructure(orderDetails.passes)}
              heading={"Passes"}
              noDataText={"No passes"}
            />

            <CustomTable
              tableData={prepareTransactionStructure(orderDetails.transactions)}
              heading={"Transactions"}
              noDataText={"No transaction found"}
            />
          </Row>
        </Col>
      </Row>
    );
  }
}

export default InvoiceDetail;
