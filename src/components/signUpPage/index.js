// library
import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import moment from "moment";
import DatePicker from "react-datepicker";
import ReactPhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import validator from "validator";
import { isPossiblePhoneNumber } from "react-phone-number-input";

// Redux
import {
  resetRedux,
  saveFormData,
  verifyUser,
} from "../../redux/user/user-actions";
import connect from "react-redux/es/connect/connect";
import Loader from "../../commonComponents/loader";
import { Checkbox } from "antd";
import { Modal, ModalBody } from "reactstrap";

// Helpers
import {
  
  getDateFromISO,
} from "../../utils/common-utils";
import CollapseAbleComponent from "./collapsableComponent";


const errorMessages = {
  name: "Please enter name",
  email: "Please enter email",
  password: "Please enter password",
  phoneNumber: "Please enter valid phone number",
  DOB: "Please enter Date of birth",
};

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      password: "",
      phoneNumber: "",
      dateOfBirth: "",
      defaultCountry: "gh",
      phone: "",
      phoneData: { dialCode: 233, countryCode: "gh" },
      fbData: [],
      agreeTermsAndCondition: false,
      modalOpen: false,
      error: {},
    };
  }

  componentDidMount() {
    let fbData = JSON.parse(localStorage.getItem("fbLoacalData"));
    let googledata = JSON.parse(localStorage.getItem("googleLoacalData"));
    if (fbData !== null) {
      this.setState({
        fbData: fbData,
        name: fbData.name,
      });
    } else if (googledata !== null) {
      this.setState({
        googledata: googledata.profileObj,
        name:
          googledata.profileObj !== undefined ? googledata.profileObj.name : "",
        email:
          googledata.profileObj !== undefined
            ? googledata.profileObj.email
            : "",
      });
    } else {
      this.setState({
        name: "",
      });
    }

    this.props.resetRedux();
  }

  onInputChange = (e) => {
    const { value, name } = e.target;
    let state = { ...this.state };
    const { error } = state;
    error[name] = "";
    if (!value.trim()) {
      error[name] = errorMessages[name];
    }
    state[name] = value;
    state.error = { ...error };
    this.setState(state);
  };

  getPhoneNumberValid = (phoneNumber) => {
    return isPossiblePhoneNumber(phoneNumber);
  };

  getEmailValid = (email) => {
    return validator.isEmail(email);
  };

  

  isAllKeyEmpty = (object) => {
    for (let key in object) {
      if (object[key] !== "") {
        return false;
      }
    }
    return true;
  };

  onSaveChanges = (e) => {
    e.preventDefault();
    const { name, phone, email, error, password, dateOfBirth } = this.state;

    let isEmailValid = this.getEmailValid(email);
    let isValidNumber = this.getPhoneNumberValid(phone);

    if (name === "") {
      error.name = errorMessages.name;
    }
    if (!isEmailValid) {
      error.email = errorMessages.email;
    }
    if (password === "") {
      error.password = errorMessages.password;
    }
    if (!isValidNumber) {
      error.phone = errorMessages.phoneNumber;
    }
    if (dateOfBirth === "") {
      error.DOB = errorMessages.DOB;
    }

    if (!this.isAllKeyEmpty(error)) {
      this.setState({ error });
    } else {
      this.props.resetRedux();
      this.setState({ error: "" }, () => {
        let requestData = {
          name,
          email,
          password,
          phoneNumber: phone,
          dateOfBirth: getDateFromISO(dateOfBirth),
        };

        this.props.saveFormData(requestData);

        this.props.verifyUser(
          (userState) => {
            this.props.history.push("/sign-up/verification", { ...userState });
          },
          () => {
            this.props.history.push("/");
          },
          (errorCB) => {
            console.error(errorCB);
          }
        );
      });
    }
  };

  handleChange = (date) => {
    let state = { ...this.state };
    const { error } = state;
    error["DOB"] = "";
    state["DOB"] = date;
    state.error = { ...error };
    this.setState({
      dateOfBirth: date,
    });
  };

  _style = {
    paddingLeft: "20px",
    float: "left",
    border: " 1px solid #eee",
    backgroundColor: "#F2F3F8",
    width: "100%",
    padding: " 14px 170px 14px 20px",
    borderRadius: "6px",
    color: "#666",
    fontSize: "13px",
    WebkitAppearance: "none",
  };

  handlePhoneChange = (value) => {
    let state = { ...this.state };
    const { error } = state;
    error["phone"] = "";
    if (!value.trim()) {
      error["phone"] = errorMessages["phone"];
    }
    state["phone"] = value;
    state.error = { ...error };
    this.setState({ phone: `+${value}` });
  };

  agreeTermsAndCondition = (e) => {
    this.setState({
      agreeTermsAndCondition: e.target.checked,
    });
  };
  openTermsAndCondition = () => {
    this.openModal();
  };
  openModal = () => {
    this.setState({
      modalOpen: !this.state.modalOpen,
    });
  };
  verifyTermsAndCondition = () => {
    this.setState({
      modalOpen: !this.state.modalOpen,
      agreeTermsAndCondition: true,
    });
  };

  getForm = () => {
    const { error } = this.state;
    return (
      <div id="tab-2" className="tab-content" style={{ display: "block" }}>
        <h3>
          Sign up <span>TicketLake</span>
        </h3>
        {this.props.processing ? (
          <Loader />
        ) : (
          <Form onSubmit={this.onSaveChanges}>
            <div className="custom-form">
              <div className="main-register-form" id="main-register-form2">
                <div className={"field-wrp"}>
                  <label style={{ marginBottom: "10px" }}>
                    Email <span>*</span>{" "}
                  </label>
                  <Input
                    name="email"
                    id="email"
                    type="email"
                    placeholder="Email"
                    value={this.state.email}
                    onChange={this.onInputChange}
                  />
                  {error.email && (
                    <span
                      className={"signup-error-message"}
                      style={{ color: "red" }}
                    >
                      {" "}
                      {error.email}{" "}
                    </span>
                  )}
                </div>

                <div className={"field-wrp"}>
                  <label style={{ marginBottom: "10px" }}>
                    Password <span>*</span>
                  </label>
                  <Input
                    name="password"
                    type="password"
                    placeholder="Password"
                    value={this.state.password}
                    onChange={this.onInputChange}
                  />
                  {error.password && (
                    <span
                      className={"signup-error-message"}
                      style={{ color: "red" }}
                    >
                      {" "}
                      {error.password}{" "}
                    </span>
                  )}
                </div>

                <div className={"field-wrp"}>
                  <label style={{ marginBottom: "10px" }}>
                    Name <span>*</span>{" "}
                  </label>
                  <Input
                    name="name"
                    id="name"
                    type="text"
                    placeholder="Name"
                    value={this.state.name}
                    onChange={this.onInputChange}
                  />
                  {error.name && (
                    <span
                      className={"signup-error-message"}
                      style={{ color: "red" }}
                    >
                      {" "}
                      {error.name}{" "}
                    </span>
                  )}
                </div>

                <div className={"field-wrp"}>
                  <label style={{ marginBottom: "10px" }}>
                    Phone Number <span>*</span>{" "}
                  </label>
                  <div>
                    <ReactPhoneInput
                      countryCodeEditable={false}
                      country={this.state.defaultCountry}
                      value={this.state.phone}
                      onChange={this.handlePhoneChange}
                    />
                  </div>
                  {error.phone && (
                    <span
                      className={"signup-error-message"}
                      style={{ color: "red" }}
                    >
                      {" "}
                      {error.phone}{" "}
                    </span>
                  )}
                </div>

                <div className={"field-wrp"}>
                  <label style={{ marginBottom: "10px" }}>
                    Date of Birth<span>*</span>
                  </label>
                  <div className={"row dateOfBirth"}>
                    <div className={"col-md-12"}>
                      <DatePicker
                        placeholderText={"Date of Birth"}
                        selected={this.state.dateOfBirth}
                        onChange={this.handleChange}
                        customInput={<Input style={this._style} />}
                        maxDate={
                          new Date(
                            moment(new Date())
                              .subtract(0, "years")
                              .format()
                          )
                        }
                        n={
                          new Date(
                            moment(new Date())
                              .subtract(100, "years")
                              .format()
                          )
                        }
                        peekNextMonth
                        showMonthDropdown
                        scrollableYearDropdown
                        yearDropdownItemNumber={15}
                        showYearDropdown
                        dropdownMode="select"
                      />
                    </div>
                  </div>
                  {error.DOB && (
                    <span
                      className={"signup-error-message"}
                      style={{ color: "red" }}
                    >
                      {" "}
                      {error.DOB}{" "}
                    </span>
                  )}
                </div>

                <div className="terms-and-condition-wrap">
                  <Checkbox
                    onChange={this.agreeTermsAndCondition}
                    checked={this.state.agreeTermsAndCondition}
                    className="terms-and-condition-main"
                  >
                    Agree to
                  </Checkbox>
                  <div
                    className="terms-and-condition-underline"
                    onClick={this.openTermsAndCondition}
                  >
                    Terms & Conditions
                  </div>
                  <Modal
                    isOpen={this.state.modalOpen}
                    toggle={this.openModal}
                    className="modal-terms-conditions modal-danger"
                  >
                    <h3>Terms & Conditions</h3>

                    <ModalBody
                      style={{ padding: "0px 0px 40px 0px" }}
                      className="left"
                    >
                      <CollapseAbleComponent />
                    </ModalBody>
                    <button
                      className={
                        "center-btn btn btn-danger buttonDefault defaultBackground fw-bold "
                      }
                      onClick={this.verifyTermsAndCondition}
                    >
                      Agree Terms & Conditions
                    </button>
                  </Modal>
                </div>

                <button
                  type="submit"
                  className="log-submit-btn"
                  style={
                    this.state.agreeTermsAndCondition
                      ? { cursor: "pointer" }
                      : { cursor: "not-allowed" }
                  }
                  disabled={this.state.agreeTermsAndCondition ? false : true}
                >
                  <span>Register</span>
                </button>
              </div>
            </div>
          </Form>
        )}
      </div>
    );
  };

  render() {
    return <div>{this.getForm()}</div>;
  }
}

const mapStateToProps = (state) => {
  return {
    error: state.user.error,
    processing: state.user.processing,
  };
};

const connected = connect(mapStateToProps, {
  resetRedux,
  saveFormData,
  verifyUser,
})(SignUp);
export default withRouter(connected);
