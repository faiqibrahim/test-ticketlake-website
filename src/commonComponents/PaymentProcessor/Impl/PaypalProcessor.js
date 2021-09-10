import React, { Component } from "react";
import paypalImage from "../assets/paypal.svg";
import { Col, Row } from "reactstrap";
import styles from "../styles.module.css";
import PaypalButtonPrompt from "../components/Paypal/PaypalButtonPrompt";

class PaypalProcessor extends Component {
  render() {
    const { setActiveComponent } = this.props;
    return (
      <div
        className={"payment-gateway-box"}
        onClick={() =>
          setActiveComponent(<PaypalButtonPrompt {...this.props} />)
        }
      >
        <Row className={styles.method}>
          <Col xs={12}>
            <Row>
              <Col>
                <img
                  src={paypalImage}
                  style={{ width: "71px", height: "62px" }}
                  alt={"paypal-logo"}
                />
              </Col>
            </Row>
            <br />
            <Row>
              <Col>
                <span className={styles.methodName}>Paypal</span> <br />
                <span className={styles.methodText}>Pay via Paypal</span>
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
    );
  }
}

export default PaypalProcessor;
