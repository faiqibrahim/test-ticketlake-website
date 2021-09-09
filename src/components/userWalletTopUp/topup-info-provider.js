import { getStore } from "../../index";
import { getPaypalClientId } from "../../utils/config";

export const getTopUpInfo = () => {
  const state = getStore().getState();
  const { walletTopUp } = state.user;

  return {
    amount: walletTopUp.topUpAmount,
    currency: walletTopUp.walletCurrency,
    purpose: "WALLET_TOP_UP",
    description: `${walletTopUp.topUpAmount} ${walletTopUp.walletCurrency} Wallet Topup`,
    paymentMethods: [
      {
        type: "MOBILE_MONEY",
      },
      {
        type: "PAYPAL",
        clientId: getPaypalClientId(),
      },
    ],
  };
};
