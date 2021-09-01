import { getStore } from "../../index";
import { formatCurrency } from "../../utils/common-utils";

export const getTopUpInfo = () => {
  const state = getStore().getState();
  const { walletTopUp } = state.user;

  return {
    amount: walletTopUp.topUpAmount,
    currency: walletTopUp.walletCurrency,
    purpose: "WALLET_TOP_UP",
    description: `${formatCurrency(
      walletTopUp.topUpAmount,
      walletTopUp.walletCurrency
    )} Wallet Topup`,
    paymentMethods: [
      {
        type: "MOBILE_MONEY",
      },
      {
        type: "PAYPAL",
        clientId:
          "AVxMDtg2UkfX0IFBK86r_l_EcCeloAcMmOQf7vbOuPQsr10I5QJBf-u4YVn504puI-GyLQ0ZcKRYBG2T",
      },
    ],
  };
};
