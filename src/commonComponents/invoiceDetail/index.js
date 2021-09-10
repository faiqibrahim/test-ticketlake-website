import React from "react";
import { CloseCircleOutlined } from "@ant-design/icons";
import { Row, Col } from "reactstrap";
import {
  dateFormat,
  formatCurrency,
  preparePassStructure,
  prepareTicketStructure,
  prepareTransactionStructure,
} from "../../utils/common-utils";
import CustomTable from "./CustomTable";
import InvoiceHeader from "./InvoiceHeader";
import moment from "moment";

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

    const {
      orderId,
      tickets,
      transactions,
      passes,
      amount,
      currency,
      purchaseType,
    } = orderDetails;

    return (
      <Row style={{ width: "100%" }} className="transaction-history">
        <Col md={3} className="red-bg">
          <Row>
            <Col md="12">
              <InvoiceHeader>
                <h2> {formatCurrency(amount, currency)} </h2>
              </InvoiceHeader>

              <InvoiceHeader heading={"Purchase Type"}>
                {purchaseType}
              </InvoiceHeader>

              <InvoiceHeader heading={"Transaction Date"}>
                {moment(transactions[0].transactionTime).format(dateFormat)}
              </InvoiceHeader>

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
            style={{fontSize:"1.4rem"}}
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
