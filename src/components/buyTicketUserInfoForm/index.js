// Library
import React from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import validator from "validator";
import { isValidPhoneNumber } from "react-phone-number-input";

import { withRouter } from "react-router-dom";
import { getConsumerBasicInfo } from "../../redux/user/user-actions";

class buyTicketUserInfoForm extends React.Component {
  state = {
    defaultCountry: "gh",
    phoneNumber: "",
    name: "",
    email: "",
    consumerInfo: {
      name: "",
      email: "",
    },
  };

  componentDidMount() {
    this.setState({ phoneNumber: "" });
  }

  required = (value) => {
    if (value && !value.toString().trim().length) {
      return <span className="error">Required</span>;
    }
  };

  handlePhoneInputChange = (value) => {
    let phoneNumber = `+${value}`;
    let isValidNumber = this.getPhoneNumberValid(phoneNumber);
    if (isValidNumber) {
      this.getGuestInformation(phoneNumber);
    } else {
      this.setState(
        {
          phoneNumber: value,
          consumerInfo: {
            name: "",
            email: "",
          },
        },
        () => {
          let props = this.props;
          props.onInputChange(
            "phoneNumber",
            value,
            props.rowNumber,
            props.seatNumber,
            props.uniqueId
          );
          props.onInputChange(
            "name",
            "",
            props.rowNumber,
            props.seatNumber,
            props.uniqueId
          );
          props.onInputChange(
            "email",
            "",
            props.rowNumber,
            props.seatNumber,
            props.uniqueId
          );
        }
      );
    }
  };

  handleNameInputChange = (value) => {
    const consumerInfo = this.state.consumerInfo;
    consumerInfo.name = value;
    this.setState({ consumerInfo }, () => {
      let props = this.props;
      props.onInputChange(
        "name",
        value,
        props.rowNumber,
        props.seatNumber,
        props.uniqueId
      );
    });
  };

  handleEmailInputChange = (value) => {
    const consumerInfo = this.state.consumerInfo;
    consumerInfo.email = value;
    this.setState({ consumerInfo }, () => {
      let props = this.props;
      props.onInputChange(
        "email",
        value,
        props.rowNumber,
        props.seatNumber,
        props.uniqueId
      );
    });
  };

  getPhoneNumberValid = (phoneNumber) => {
    return isValidPhoneNumber(phoneNumber);
  };

  getGuestInformation = (phoneNumber) => {
    getConsumerBasicInfo(phoneNumber, (resultCallback) => {
      this.setState({ consumerInfo: resultCallback, phoneNumber }, () => {
        let { name, email } = resultCallback;
        let props = this.props;
        props.onInputChange(
          "name",
          name,
          props.rowNumber,
          props.seatNumber,
          props.uniqueId
        );
        props.onInputChange(
          "email",
          email,
          props.rowNumber,
          props.seatNumber,
          props.uniqueId
        );
        props.onInputChange(
          "phoneNumber",
          phoneNumber,
          props.rowNumber,
          props.seatNumber,
          props.uniqueId
        );
      });
    });
  };

  render() {
    const email = (value) => {
      if (!validator.isEmail(value)) {
        return <span className={"error"}>Invalid Email!</span>;
      }
    };
    let props = this.props;
    return (
      <div className="booking-form-wrap">
        <div
          className="list-single-main-item fl-wrap tr-sec"
          style={{ border: "0" }}
        >
          <div className="profile-edit-container">
            <div className="custom-form ticket-form">
              <fieldset className="fl-wrap">
                <div className="list-single-main-item-title">
                  <h3 style={{ fontSize: "16px" }}>
                    {props.ticketClassName} - Seat {props.seatNumber}, Row{" "}
                    {props.rowNumber}
                    <div
                      style={{
                        height: "20px",
                        width: "20px",
                        float: "right",
                        background: props.ticketClassColor,
                        borderRadius: "6px",
                      }}
                    />
                  </h3>
                </div>
                <div className="row">
                  <Form className={"guest-tickets-form"}>
                    <div className="row" style={{ padding: "0px 15px" }}>
                      <div className="col-md-4 custom-float-left ">
                        <PhoneInput
                          inputProps={{
                            id: `phone-form-control ${props.keyIndex}`,
                          }}
                          name={"phoneNumber"}
                          value={this.state.phoneNumber}
                          validations={[this.required]}
                          countryCodeEditable={false}
                          country={this.state.defaultCountry}
                          onChange={(value) =>
                            this.handlePhoneInputChange(value)
                          }
                        />
                      </div>
                      <div className="col-md-4 float-left">
                        <Input
                          inputProps={{
                            id: `name-form-control ${props.keyIndex}`,
                          }}
                          type="text"
                          name={"name"}
                          validations={[this.required]}
                          placeholder={"Enter Your Name"}
                          value={
                            this.state.consumerInfo
                              ? this.state.consumerInfo.name
                              : " "
                          }
                          onChange={(event) =>
                            this.handleNameInputChange(event.target.value)
                          }
                        />
                      </div>
                      <div className="col-md-4 float-left">
                        <Input
                          inputProps={{
                            id: `email-form-control ${props.keyIndex}`,
                          }}
                          type="email"
                          name={"email"}
                          validations={[this.required, email]}
                          placeholder={"Enter Your Email"}
                          value={
                            this.state.consumerInfo
                              ? this.state.consumerInfo.email
                              : " "
                          }
                          onChange={(event) =>
                            this.handleEmailInputChange(event.target.value)
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
  }
}

export default withRouter(buyTicketUserInfoForm);
