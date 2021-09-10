import React, { Component } from "react";
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
        changeProp: (key, value, cb) => this.changeAttribute(method.type, key, value, cb)
      };
    });

    this.setState({ paymentMethods: methods, processing: false });
  }

  changeAttribute = (type, key, value, cb) => {
    const paymentMethods = this.state.paymentMethods.map(method => {
      const result =  {
        ...method
      }

      if(method.type === type){
        result[key] = value
      }

      return result;
    })

    this.setState({paymentMethods}, cb);
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
          amount: _.round(+method.amount - +maxAmount, 2),
        });
        const transIds = [...this.state.transIds];
        transIds.push(transId);

        this.setState({
          paymentMethods,
          autoPayment,
          transIds,
          childComponent: null,
        });
      }
    });
  };

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
             <>
               <span className={"wallet-message"}>Wallet balance used</span>
               <div className={"payment-gateway-wrp pt-0"}>
                 {PaymentProcessorFactory.getProcessor(autoPayment.type, {
                   ...autoPayment,
                 })}
               </div>
             </>

          )}
        {!_.isNil(autoPayment) && (
            <span className={"wallet-message"}>
                Choose method for remaining:
                <span className={"color-red"}>
                  {` ${formatCurrency(
                      paymentMethods[0].amount,
                      paymentMethods[0].currency
                  )}`}
                </span>
              </span>
        )}
        <div className={"payment-gateway-wrp"}>
          {paymentMethods.map((method) => (
            <React.Fragment key={method.type}>
              {PaymentProcessorFactory.getProcessor(method.type, { ...method })}
            </React.Fragment>
          ))}
        </div>
      </div>
    );
  }
}

export default PaymentProcessor;
