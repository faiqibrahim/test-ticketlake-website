import React from "react";
import PaypalProcessor from "./Impl/PaypalProcessor";
import MobileMoneyProcessor from "./Impl/MobileMoneyProcessor";
import WalletProcessor from "./Impl/WalletProcessor";

export default class PaymentProcessorFactory {

    static getProcessor(type = 'unknown', props) {

        switch (type) {
            case 'PAYPAL':
                return <PaypalProcessor key={type} {...props} />;
            case 'MOBILE_MONEY':
                return <MobileMoneyProcessor key={type} {...props} />;
            case 'WALLET':
                return <WalletProcessor key={type} {...props} />;
            default:
                return null;
        }
    }
}
