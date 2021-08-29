import React, {Component} from 'react';

import {AIRTEL_IMG, GLO_IMG, MTN_IMG, NETWORK_IMG, VODA_IMG} from "../../../utils/config";
import {NotificationManager} from "react-notifications";
import TopBar from "../../topBar";
import CustomSelectIconDropDown from "../../selectDropdownWithIcon";
import ReactPhoneInput from "react-phone-input-2";

const options = [
    {value: "MTN", label: "MTN", icon: MTN_IMG},
    {value: "VODAFONE", label: "Vodafone", icon: VODA_IMG},
    {value: "TIGO", label: "AirtelTigo", icon: AIRTEL_IMG},
    {value: "GLO", label: "Glo", icon: GLO_IMG},
];

class MobileMoneyPhoneInput extends Component {

    constructor(props) {
        super(props);

        this.state = {
            defaultCountry: "gh",
            phone: "",
            network: "",
        };

        this.setNetwork = this.setNetwork.bind(this);
    }

    handlePhoneChange = (phone) => {
        this.setState({phone});
    };

    setNetwork = (network) => {
        this.setState({network});
    };

    onContinueClick = () => {
        const {phone, network} = this.state;

        if (!network || !phone) {
            NotificationManager.error(
                "Please Provide Phone and Network Information!",
                "",
                3000
            );
        } else {
            this.props.onSubmit(phone, network);
        }
    };

    render() {
        return (
            <div className="mtn-payment-wrp">
                <div className={"row"}>
                    <TopBar onBack={() => this.props.setActiveComponent(null)}/>

                    <div className={"col-lg-12"}>
                        <div className={"static-box"}>
                            <div className={"row"}>

                                <div className={"col-lg-12"}>
                                    <div className={"label-heading"}>Enter Phone Number</div>
                                </div>

                                <div className={"col-lg-12"}>
                                    <p style={{color: "rgba(0, 0, 0, 0.85)"}}>
                                        For Verification, an OTP will be sent to the number you've
                                        entered.
                                    </p>
                                </div>

                                <div className={"col-lg-12"} style={{marginTop: "4%"}}>
                                    <CustomSelectIconDropDown
                                        id={"network"}
                                        name={"network"}
                                        placeholder={"Select Network"}
                                        options={options}
                                        onChange={this.setNetwork}
                                        networkImg={NETWORK_IMG}
                                    />
                                </div>

                                <div className={"col-lg-12"} style={{marginTop: "3%", marginBottom: "3%"}}>
                                    <ReactPhoneInput
                                        inputStyle={{width: "55%", height: "51px"}}
                                        buttonStyle={{backgroundColor: "#F2F3F8"}}
                                        countryCodeEditable={false}
                                        country={this.state.defaultCountry}
                                        value={this.state.phone}
                                        onChange={this.handlePhoneChange}
                                    />
                                </div>

                                <div className={"col-lg-12"}>
                                    <button className={"simpleRedBtn"} onClick={this.onContinueClick}>
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


export default MobileMoneyPhoneInput;
