import React from "react";
import { Modal, ModalHeader, ModalBody } from "reactstrap";
import "react-phone-input-2/lib/style.css";
import moment from "moment";

class PassInfoModal extends React.Component {
  render() {
    let { isOpen, toggle, parentEventInfo, eventSlotDetail } = this.props;
    let eventText = eventSlotDetail.length > 1 ? "events" : "event";
    return (
      <Modal
        isOpen={isOpen}
        toggle={toggle}
        className={this.props.className}
        centered
      >
        <ModalHeader toggle={toggle}>
          {parentEventInfo.title}
          <p className={"red-title"}>
            {eventSlotDetail.length} {eventText}
          </p>
        </ModalHeader>

        <ModalBody>
          {eventSlotDetail.map((item, i) => {
            let seatNumber = this.props.passData
              ? this.props.passData.seats[i].seat.seatNumber
              : null;
            let { venue, eventDateTimeSlot } = item;
            return (
              <div className={"mb-4 pass-body"} key={i}>
                <h6>{item.eventTitle}</h6>
                <p>{venue.address}</p>
                <p>{moment(eventDateTimeSlot.eventStartTime).format("llll")}</p>
                {seatNumber ? (
                  <p className={"red-title"}>Seat # {seatNumber}</p>
                ) : null}
              </div>
            );
          })}
        </ModalBody>
      </Modal>
    );
  }
}

export default PassInfoModal;
