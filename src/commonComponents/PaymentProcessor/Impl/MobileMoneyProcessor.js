import React, { Component } from "react";
import { Col, Row } from "reactstrap";
import mobileMoneyImg from "../assets/mobilemoney.svg";
import styles from "../styles.module.css";
import MobileMoneyPhoneInput from "../components/MobileMoney/MobileMoneyPhoneInput";
import MobileMoneyBillPrompt from "../components/MobileMoney/MobileMoneyBillPrompt";

class MobileMoneyProcessor extends Component {
  processPayment = () => {
    const { setActiveComponent } = this.props;

    const component = (
      <MobileMoneyPhoneInput
        {...this.props}
        onSubmit={(phone, network) => {
          setActiveComponent(
            <MobileMoneyBillPrompt
              {...this.props}
              phone={phone}
              network={network}
              parent={component}
            />
          );
        }}
      />
    );

    setActiveComponent(component);
  };

  render() {
    return (
      <div className={"payment-gateway-box"} onClick={this.processPayment}>
        <Row className={styles.method}>
          <Col xs={12}>
            <Row>
              <Col>
                <img
                  src={mobileMoneyImg}
                  style={{ width: "71px", height: "62px" }}
                  alt={"mobilemoney-logo"}
                />
              </Col>
            </Row>
            <br />
            <Row>
              <Col>
                <span className={styles.methodName}>Mobile Money</span> <br />
                <span className={styles.methodText}>Pay via Phone#</span>
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
    );
  }
}

export default MobileMoneyProcessor;
