import React, { Component } from "react";
import { Table } from "reactstrap";
import moment from "moment/moment";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { showContentOutsideMainWrapper } from "../../redux/common/common-actions";

class TransactionModal extends Component {

  getLeftSideData = (heading, val) => {
    return (
      <div className="col-md-12">
        <p className="str">
          <strong>{heading}</strong>
          <br />
          {val}
        </p>
      </div>
    );
  };

  render() {
    const {
      transactionAmount,
      transactionDate,
      paymentMethod,
      eventName,
      transactionStatus,
      transactionId,
      paymentType,
      onCrossClick,
      ticketsArr,
      ticketsArrWithKey,
      passesArr,
      passesArrWithKey,
      lastBalance,
      amountDeducted,
      couponApplied,
      currency,
    } = this.props;

    return (
      <div className="row">
        <div className="col-md-3 red-bg">
          <span
            color="secondary pointer"
            className="close-button"
            onClick={onCrossClick}
          >
            X
          </span>
          <div className="row" style={{ padding: "20px" }}>
            <div className="col-md-12">
              <h2>
                {currency} {transactionAmount}
              </h2>
            </div>
            {this.getLeftSideData(
              "Transaction Date",
              moment(transactionDate).format("MM/DD/YYYY")
            )}
            {this.getLeftSideData("Payment Method", paymentMethod)}
            {this.getLeftSideData("Event Name", eventName)}
            {this.getLeftSideData("Status", transactionStatus)}
          </div>
        </div>

        <div className="col-md-9 white-bg">
          <h3>Transaction# {transactionId}</h3>
          <div className="row">
            <div className="col-md-12">
              <Table responsive borderless className="border">
                <thead className="border-bottom">
                  <tr>
                    <th>Item Details</th>
                    <th>Price</th>
                    <th>Quantity</th>
                    <th>Total</th>
                  </tr>
                </thead>
                <tbody className="border-bottom">
                  {ticketsArr !== null ? (
                    <>
                      {ticketsArrWithKey !== undefined &&
                      ticketsArrWithKey !== null ? (
                        <>
                          {ticketsArrWithKey.map((keyIs) => {
                            return ticketsArr[keyIs].map((data) => {
                              return (
                                <tr>
                                  <td>{keyIs}</td>
                                  <td>
                                    {currency} {data.price}
                                  </td>
                                  <td>{ticketsArr[keyIs].length}</td>
                                  <td>
                                    {currency} {data.price}
                                  </td>
                                </tr>
                              );
                            });
                          })}
                        </>
                      ) : (
                        "No Data"
                      )}
                    </>
                  ) : null}
                </tbody>

                <tbody className="border-bottom">
                  {passesArr !== null ? (
                    <>
                      {passesArrWithKey !== undefined &&
                      passesArrWithKey !== null ? (
                        <>
                          {passesArrWithKey.map((keyIs, i) => {
                            return passesArr[keyIs].map((data, i) => {
                              return (
                                <tr key={i}>
                                  <td>
                                    Passes{" "}
                                    {data.ticketClassInfo.ticketClassName}
                                  </td>
                                  <td>
                                    {currency} {data.price}
                                  </td>
                                  <td>{passesArr[keyIs].length}</td>
                                  <td>
                                    {currency} {data.price}
                                  </td>
                                </tr>
                              );
                            });
                          })}
                        </>
                      ) : (
                        "No Data"
                      )}
                    </>
                  ) : null}
                </tbody>

                <tbody className="border-bottom">
                  {paymentType
                    .toLowerCase()
                    .includes("wallet".toLowerCase()) ? (
                    <tr>
                      <td>Wallet Balance</td>
                      <td className="grey-text">
                        {currency} {lastBalance}
                      </td>
                      <td className="grey-text" />
                      <td className="grey-text">{amountDeducted}</td>
                    </tr>
                  ) : null}
                  {couponApplied ? (
                    <tr>
                      <td>Copoun - </td>
                      <td className="grey-text" />
                      <td className="grey-text" />
                      <td className="red-text">{couponApplied} off</td>
                    </tr>
                  ) : null}
                </tbody>
                <tbody>
                  <tr>
                    <td className="p25" />
                    <td className="p25" />
                    <td className="sub-total p25">Sub Total</td>
                    <td className="red-text p25">
                      {currency} {transactionAmount}
                    </td>
                  </tr>
                </tbody>
              </Table>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const connectedComponent = connect(null, { showContentOutsideMainWrapper })(
  TransactionModal
);
export default withRouter(connectedComponent);
