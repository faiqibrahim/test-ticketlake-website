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

    const { orderId, tickets, transactions, passes } = orderDetails;

    return (
      <Row style={{ paddingTop: "115px" }} className="transaction-history">
        <Col md={3} className="red-bg">
          <Row style={{ padding: "20px" }}>
            <Col md="12">
              {tickets.length > 0 && (
                <InvoiceHeader heading={"Event Name"}>
                  {tickets[0].event.eventTitle}
                </InvoiceHeader>
              )}
            </Col>
          </Row>
        </Col>

        <Col md={9} className="white-bg">
          <h3>Order# : {orderId}</h3>
          <CloseCircleOutlined
            size="large"
            className="close-button close-btn-styling"
            onClick={closeModalCB}
          />
          <Row style={{ padding: "20px" }}>
            <CustomTable
              tableData={prepareTicketStructure(tickets)}
              noDataText={"No ticket"}
              heading={"Tickets"}
            />

            <CustomTable
              tableData={preparePassStructure(passes)}
              heading={"Passes"}
              noDataText={"No passes"}
            />

            <CustomTable
              tableData={prepareTransactionStructure(transactions)}
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
