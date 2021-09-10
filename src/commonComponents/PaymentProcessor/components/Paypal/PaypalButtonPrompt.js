import React from "react";
import axios from "../../../../utils/axios";
import paypalImage from "../../assets/paypal.svg";
import { PayPalButton } from "react-paypal-button-v2";
import classes from "./styles.module.css";
import TopBar from "../../../topBar";

class PaypalButtonPrompt extends React.Component {
  render() {
    const {
      type,
      amount,
      currency,
      clientId,
      onPaymentSuccessful,
      onPaymentFailure,
      purpose,
      description,
    } = this.props;

    return (
      <div className={"row"}>
        <TopBar
          imageSrc={paypalImage}
          text="Paypal"
          onBack={() => this.props.setActiveComponent(null)}
        />

        <div className={"col-lg-12"}>
          <div className={`static-box ${classes.paypalBox}`}>
            <div className={"row"}>
              <div className={"col-lg-12"} style={{ marginTop: "4%" }}>
                <div style={{ width: "400px", margin: "0px auto" }}>
                  <PayPalButton
                    description={description}
                    amount={amount}
                    currency={currency}
                    onSuccess={(details, data) => {
                      axios
                        .post(
                          "/transaction/paypal",
                          { orderId: data.orderID, transactionType: purpose },
                          "v2"
                        )
                        .then(({ data }) => {
                          onPaymentSuccessful(type, data.data._id);
                        })
                        .catch((error) => {
                          onPaymentFailure(type, error);
                        });
                    }}
                    onError={(error) => onPaymentFailure(type, error)}
                    options={{ clientId, currency }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default PaypalButtonPrompt;
