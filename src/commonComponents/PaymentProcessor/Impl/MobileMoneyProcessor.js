import React, {Component} from "react";
import {Col, Row} from "reactstrap";
import mobileMoneyImg from "../assets/mobilemoney.svg";

import MobileMoneyPhoneInput from "../components/MobileMoneyPhoneInput";
import MobileMoneyBillPrompt from "../components/MobileMoneyBillPrompt";

class MobileMoneyProcessor extends Component {

    processPayment = () => {
        const {setActiveComponent} = this.props;

        setActiveComponent(<MobileMoneyPhoneInput {...this.props} onSubmit={(phone, network) => {
            setActiveComponent(<MobileMoneyBillPrompt {...this.props} phone={phone} network={network}/>);
        }}/>);
    };

    render() {
        return (
            <Row onClick={this.processPayment}>
                <Col xs={12}>
                    <Row>
                        <Col>
                            <img src={mobileMoneyImg} style={{width: '71px', height: '62px'}} alt={'mobilemoney-logo'}/>
                        </Col>
                    </Row>
                    <br/>
                    <Row>
                        <Col>
                            <b>MTN Mobile Money</b> <br/>
                            Pay via Phone#
                        </Col>
                    </Row>
                </Col>
            </Row>
        )
    }
}

export default MobileMoneyProcessor;
