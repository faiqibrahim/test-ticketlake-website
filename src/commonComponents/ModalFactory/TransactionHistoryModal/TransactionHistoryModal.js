import React from "react";
import { Modal, Table } from "reactstrap";
import moment from "moment";
import { CloseCircleOutlined } from "@ant-design/icons";

class TransactionHistoryModal extends React.Component {
  renderLeftPanel = (parentState) => {
    return (
      <div className="col-md-3 red-bg">
        <div className="row">
          <div className="col-md-12">
            <h2>GHS {parentState.modalData.transactionAmount}</h2>
          </div>
          <div className="col-md-12">
            <p className="str">
              <strong>Transaction Date</strong>
              <br />
              {moment(parentState.modalData.createdAt).format("MM/DD/YYYY")}
            </p>
          </div>
          <div className="col-md-12">
            <p className="str">
              <strong>Payment Method</strong>
              <br />
              {parentState.modalData.paymentMethod}
            </p>
          </div>
          <div className="col-md-12">
            <p className="str">
              <strong>Event Name</strong>
              <br />
              {parentState.modalDataFromApi.eventDetails !== undefined
                ? parentState.modalDataFromApi.eventDetails.eventTitle
                : "null"}
            </p>
          </div>
          <div className="col-md-12">
            <p className="str">
              <strong>Status</strong>
              <br />
              Completed
            </p>
          </div>
        </div>
      </div>
    );
  };

  renderRightPanel = (parentState) => {
    const { closeModal } = this.props;
    return (
      <div className="col-md-9 white-bg">
        <h3>Transaction# {parentState.modalData.transactionId}</h3>
        <CloseCircleOutlined
          size="large"
          className="close-button close-btn-styling"
          onClick={closeModal}
        />
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

              {parentState.isLoadedKey && (
                <tbody className="border-bottom middle-section">
                  {parentState.modalDataFromApi.tickets && (
                    <>
                      {!parentState.ticketsState.length && "No tickets data"}

                      {parentState.ticketsState.map((classKey) => {
                        const data =
                          parentState.modalDataFromApi.tickets[classKey];

                        return (
                          <tr className={"middle-section-tr"} key={classKey}>
                            <td className={"first-column"}>{classKey}</td>
                            <td className={"second-column"}>
                              GHS {data[0].price}
                            </td>
                            <td className={"third-column"}>x {data.length}</td>
                            <td className={"fourth-column"}>
                              GHS {parseInt(data[0].price) * data.length}
                            </td>
                          </tr>
                        );
                      })}
                    </>
                  )}
                </tbody>
              )}

              {parentState.isLoadedKey ? (
                <tbody className="border-bottom">
                  {parentState.modalDataFromApi.passes && (
                    <>
                      {!parentState.ticketsState.length && "No passes data"}

                      {parentState.passesState.map((classKey) => {
                        const data =
                          parentState.modalDataFromApi.passes[classKey];
                        return (
                          <tr key={classKey}>
                            <td>Passes {classKey}</td>
                            <td>GHS {data[0].price}</td>
                            <td>x {data.length}</td>
                            <td>GHS {parseInt(data[0].price) * data.length}</td>
                          </tr>
                        );
                      })}
                    </>
                  )}
                </tbody>
              ) : null}
              <tbody className="border-bottom">
                {parentState.modalData.type &&
                parentState.modalData.type
                  .toLowerCase()
                  .includes("wallet".toLowerCase()) ? (
                  <tr>
                    <td>Wallet Balance</td>
                    <td className="grey-text">
                      GHS {parentState.modalData.lastBalance}{" "}
                      <span className={"remaining-balance"}>Remaining</span>
                    </td>
                    <td className="grey-text" />
                    <td className="grey-text">
                      {parentState.modalData.eventCurrency}{" "}
                      {parentState.modalData.transactionAmount}
                    </td>
                  </tr>
                ) : null}
                {parentState.modalDataFromApi.couponInfo !== null ? (
                  <tr>
                    <td>
                      Copoun-{" "}
                      {parentState.modalDataFromApi.couponInfo.promoCode}
                    </td>
                    <td className="grey-text" />
                    <td className="grey-text" />
                    <td className="red-text">
                      {parentState.modalDataFromApi.couponInfo.discountValue}
                      {parentState.modalDataFromApi.couponInfo.discountType ===
                      "fixed"
                        ? "GHS"
                        : "%"}{" "}
                      OFF
                    </td>
                  </tr>
                ) : null}
              </tbody>
              <tbody>
                <tr>
                  <td className="p25" />
                  <td className="p25" />
                  <td className="sub-total p25">Sub Total</td>
                  <td className="red-text p25">
                    GHS{" "}
                    {parentState.modalData.transactionAmount !== null
                      ? parentState.modalData.transactionAmount
                      : 0}
                  </td>
                </tr>
              </tbody>
            </Table>
          </div>
        </div>
      </div>
    );
  };

  render() {
    const { parentState } = this.props;
    if (!parentState.isLoaded) return null;
    return (
      <Modal isOpen={parentState.modal2} className="transaction-modal">
        <div className="row transaction-history">
          {this.renderLeftPanel(parentState)}
          {this.renderRightPanel(parentState)}
        </div>
      </Modal>
    );
  }
}

export default TransactionHistoryModal;
