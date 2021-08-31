import React, { Component } from "react";
import TopBar from "../topBar";
import ReactPhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import CustomSelectIconDropDown from "../../commonComponents/selectDropdownWithIcon";
import { sendSmsOTP } from "../../redux/ticket/ticket-actions";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { NotificationManager } from "react-notifications";
import {
  MTN_IMG,
  VODA_IMG,
  AIRTEL_IMG,
  GLO_IMG,
  NETWORK_IMG,
} from "../../utils/config";

const options = [
  { value: "MTN", label: "MTN", icon: MTN_IMG },
  { value: "VODAFONE", label: "Vodafone", icon: VODA_IMG },
  { value: "TIGO", label: "AirtelTigo", icon: AIRTEL_IMG },
  { value: "GLO", label: "Glo", icon: GLO_IMG },
];

class CheckoutStepTwo extends Component {

  constructor(props) {
    super(props);

    this.state = {
      defaultCountry: "gh",
      phone: "",
      network: "",
      selectedNetwork: "",
    };
    this.setNetwork = this.setNetwork.bind(this);
  }

  handlePhoneChange = (value) => {
    this.setState({ phone: value });
  };

  setNetwork = (value) => {
    this.setState({ selectedNetwork: value });
    this.setState({ network: value });
  };

  onContinueClick = (props) => {
    if (!this.state.selectedNetwork || !this.state.phone) {
      NotificationManager.error(
        "Please Provide Phone and Network Information!",
        "",
        3000
      );
    } else {
      const { phone, network } = this.state;
      this.props.sendSmsOTP(
        phone.replace(/\s/g, ""),
        network,
        props.setCheckoutStepThree
      );
    }
  };

  render() {
    const props = this.props;

    return (
      <div className="mtn-payment-wrp">
        <div className={"row"}>
          <TopBar />
          <div className={"col-lg-12"}>
            <div className={"static-box"}>
              <div className={"row"}>
                <div className={"col-lg-12"}>
                  <div className={"label-heading"}>Enter Phone Number</div>
                </div>
                <div className={"col-lg-12"}>
                  <p style={{ color: "rgba(0, 0, 0, 0.85)" }}>
                    For Verification, an OTP will be sent to the number you've
                    entered.
                  </p>
                </div>
                <div className={"col-lg-12"} style={{ marginTop: "4%" }}>
                  <CustomSelectIconDropDown
                    id={props.selectStyleId ? "channel" : "network"}
                    name={props.selectStyleId ? "channel" : "network"}
                    placeholder={"Select Network"}
                    options={options}
                    onChange={this.setNetwork}
                    networkImg={NETWORK_IMG}
                  />
                </div>
                <div
                  className={"col-lg-12"}
                  style={{ marginTop: "3%", marginBottom: "3%" }}
                >
                  <ReactPhoneInput
                    inputStyle={{ width: "55%", height: "51px" }}
                    buttonStyle={{ backgroundColor: "#F2F3F8" }}
                    countryCodeEditable={false}
                    country={this.state.defaultCountry}
                    value={this.state.phone}
                    onChange={this.handlePhoneChange}
                  />
                </div>
                <div className={"col-lg-12"}>
                  <button
                    className={"simpleRedBtn"}
                    onClick={() => this.onContinueClick(props)}
                  >
                    Continue
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const connectedComponent = connect(null, { sendSmsOTP })(CheckoutStepTwo);
export default withRouter(connectedComponent);
