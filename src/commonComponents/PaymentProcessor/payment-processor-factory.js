import React from "react";
import PaypalProcessor from "./Impl/PaypalProcessor";
import MobileMoneyProcessor from "./Impl/MobileMoneyProcessor";
import WalletProcessor from "./Impl/WalletProcessor";

const paypalSupportedCurrencies = ['AUD', 'USD', 'EUR', 'CAD', 'MXN', 'GBP'];

export default class PaymentProcessorFactory {

    static getProcessor(type = 'unknown', props) {

        switch (type) {
            case 'PAYPAL':
                if (paypalSupportedCurrencies.includes(props.currency))
                    return <PaypalProcessor key={type} {...props}/>;
                else
                    return null;
            case 'MOBILE_MONEY':
                return <MobileMoneyProcessor key={type} {...props} />;
            case 'WALLET':
                return <WalletProcessor key={type} {...props} />;
            default:
                return null;
        }
    }
}
