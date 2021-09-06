import React, {Component} from "react";
import PaymentProcessorFactory from "./payment-processor-factory";
import _ from "lodash";
import { formatCurrency } from "../../utils/common-utils";
import FreePaymentDialog from "./components/FreePayment/FreePaymentDialog";

class PaymentProcessor extends Component {
  state = {
    processing: true,
    paymentMethods: [],
    autoPayment: null,
    transIds: [],
    childComponent: null,
  };

  componentDidMount() {
    const {
      amount,
      currency,
      purpose,
      paymentMethods,
      description,
    } = this.props;

    const methods = paymentMethods.map((method) => {
      return {
        ...method,
        amount: _.round(amount, 2),
        currency: currency,
        splitPayment: this.splitPayment,
        onPaymentFailure: this.onPaymentFailure,
        onPaymentSuccessful: this.onPaymentSuccessful,
        purpose,
        setActiveComponent: this.setChildComponent,
        description,
      };
    });

    this.setState({ paymentMethods: methods, processing: false });
  }

  splitPayment = (type, maxAmount, transId) => {
    const paymentMethods = [];
    let autoPayment = null;

    this.state.paymentMethods.forEach((method) => {
      if (method.type === type) {
        autoPayment = {
          ...method,
          amount: +maxAmount,
          fixedPayment: true,
        };
      } else {
        paymentMethods.push({
          ...method,
          amount: _.round(+method.amount - +maxAmount),
        });

        const transIds = [...this.state.transIds];
        transIds.push(transId);

        this.setState({paymentMethods, autoPayment, transIds, childComponent: null});
      }
    });
  }

  onPaymentSuccessful = (type, transId) => {
    const { transIds } = this.state;
    transIds.push(transId);
    this.props.onSuccess && this.props.onSuccess(transIds);
  };

  onPaymentFailure = (type, error) => {
    this.props.onFailure && this.props.onFailure(error);
  };

  setChildComponent = (childComponent) => {
    this.setState({ childComponent });
  };

  render() {
    const {
      paymentMethods,
      processing,
      autoPayment,
      childComponent,
    } = this.state;

    const { amount, onSuccess } = this.props;

    if (processing) return <div>Loading...</div>;
    if (childComponent) return childComponent;

    if (parseFloat(amount) === 0)
      return <FreePaymentDialog onClick={() => onSuccess([])} />;

    return (
      <div className={"payment-wrp"}>
        {!_.isNil(autoPayment) && (
          <div className={"wallet-stats-wrp"}>
            <div className={"payment-type-wrp col-md-4"}>
              <p>Wallet balance used</p>
              {PaymentProcessorFactory.getProcessor(autoPayment.type, {
                ...autoPayment,
              })}
            </div>

            <div className={"payment-type-wrp col-md-4"}>
              <p>
                Choose method for remaining:
                {` ${formatCurrency(
                  paymentMethods[0].amount,
                  paymentMethods[0].currency
                )}`}
              </p>
            </div>
          </div>
        )}

                <div className={"payment-gateway-wrp"}>
                        {
                            paymentMethods.map(method => (
                                <div className={"payment-gateway-box"}  key={method.type}>
                                    {PaymentProcessorFactory.getProcessor(method.type, {...method})}
                                </div>
                            ))
                        }
                </div>

            </div>
        );
    }
}

export default PaymentProcessor;