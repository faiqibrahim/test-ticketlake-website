// library
import React, { Component } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import PhoneInput from "react-phone-input-2";
import PassInfoModal from "../../commonComponents/ModalFactory/PassInfoModal/PassInfoModal";

class BuyTicketPassesDisplay extends Component {
  state = {
    activeModal: null,
    defaultCountry: "gh",
    phoneNumber: "",
  };

  /********************** Pass Information Modal **************** *******/

  renderPassInfoModal = (passData) => {
    let { activeModal } = this.state;
    let isOpen =
      activeModal &&
      activeModal === passData.passId + "|" + passData.uniqueIndex;
    if (!isOpen) return null;

    let { eventDetail } = this.props;
    let { parentEventInfo } = eventDetail;

    let passConfig = parentEventInfo.passConfigs.filter(
      (item) => item._id === passData.passId
    );

    let modalProps = {
      isOpen: isOpen,
      toggle: () => this.toggle(),
      parentEventInfo,
      passData,
      eventSlotDetail: passConfig[0].eventSlotDetail,
      className: "event-passes",
    };
    return <PassInfoModal {...modalProps} />;
  };

  /******************************** END ********************************/

  /******************************** EVENTS ********************************/

  toggle(string) {
    if (string) {
      this.setState({ activeModal: string });
    } else {
      this.setState({ activeModal: null });
    }
  }

  handlePhoneInputChange = (value, passData) => {
    this.setState({ phoneNumber: value }, () => {
      let props = this.props;
      props.onInputChange(
        "phoneNumber",
        value,
        passData.uniqueIndex,
        passData.passId
      );
    });
  };

  /******************************** END ********************************/

  render() {
    const hrefLink = "#";

    const required = (value) => {
      if (!value.toString().trim().length) {
        return <span className="error">Required</span>;
      }
    };
    const passData = this.props.passes;
    if (passData.seats && passData.seats.length > 0) {
      return (
        <div className="booking-form-wrap">
          {this.renderPassInfoModal(passData)}
          <div
            className="list-single-main-item fl-wrap hidden-section tr-sec"
            style={{ border: "0" }}
          >
            <div className="profile-edit-container">
              <div className="custom-form ticket-form">
                <fieldset className="fl-wrap">
                  <div className="list-single-main-item-title">
                    <h3 style={{ fontSize: "16px" }}>
                      {passData.passTitle} - {passData.uniqueIndex}
                      <a
                        href={hrefLink}
                        onClick={() =>
                          this.toggle(
                            passData.passId + "|" + passData.uniqueIndex
                          )
                        }
                        style={{
                          color: "#000",
                          fontSize: "18px",
                        }}
                      >
                        {" "}
                        <i className={"fa fa-info-circle"} />
                      </a>
                      <div
                        style={{
                          height: "20px",
                          width: "20px",
                          float: "right",
                          background: passData.ticketClassColor,
                          borderRadius: "6px",
                        }}
                      />
                    </h3>
                  </div>

                  <div className="row">
                    <Form className={"guest-tickets-form"}>
                      <div className="row" style={{ padding: "0px 15px" }}>
                        <div className="col-md-4 custom-float-left">
                          <PhoneInput
                            inputProps={{
                              id: `phone-form-control ${this.props.keyIndex}`,
                            }}
                            name={"phoneNumber"}
                            value={this.state.phoneNumber}
                            validations={[this.required]}
                            countryCodeEditable={false}
                            country={this.state.defaultCountry}
                            onChange={(value) =>
                              this.handlePhoneInputChange(value, passData)
                            }
                          />
                        </div>

                        <div className="col-md-4 float-left">
                          <Input
                            type="text"
                            required
                            name={"name"}
                            validations={[required]}
                            placeholder={"Enter Your Name"}
                            onChange={(e) =>
                              this.props.onInputChange(
                                "name",
                                e.target.value,
                                passData.uniqueIndex,
                                passData.passId
                              )
                            }
                          />
                        </div>
                        <div className="col-md-4 float-left">
                          <Input
                            type="email"
                            required
                            name={"email"}
                            validations={[required]}
                            placeholder={"Enter Your Email"}
                            onChange={(e) =>
                              this.props.onInputChange(
                                "email",
                                e.target.value,
                                passData.uniqueIndex,
                                passData.passId
                              )
                            }
                          />
                        </div>
                      </div>
                    </Form>
                  </div>
                </fieldset>
              </div>
            </div>
          </div>
        </div>
      );
    } else {
      return <></>;
    }
  }
}

export default BuyTicketPassesDisplay;
