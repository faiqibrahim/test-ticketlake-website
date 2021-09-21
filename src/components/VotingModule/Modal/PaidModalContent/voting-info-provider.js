import { getStore } from "../../../../index";
import { getPaypalClientId } from "../../../../utils/config";

export const getVotingPaymentInfo = ({ currency, amount }) => {
  const { getState } = getStore();
  const state = getState();
  const info = {
    amount,
    currency,
    purpose: "VOTE_PURCHASE",
    description: "Vote purchase for ",
    // description: "Vote purchase for " + state.ticket.event.data.data.eventTitle,
    paymentMethods: [
      {
        type: "WALLET",
        walletCurrency: state.user.userWallet.currency,
        balance: state.user.userWallet.availableBalance,
      },
      {
        type: "MOBILE_MONEY",
      },
      {
        type: "PAYPAL",
        clientId: getPaypalClientId(),
      },
    ],
  };

  return info;
};
