import { getStore } from "../../index";
import { getPaypalClientId } from "../../utils/config";

export const getPaymentInfo = () => {
  const { getState } = getStore();
  const state = getState();
  const info = {
    amount: state.ticket.totalBill,
    currency: state.ticket.ticketCurrency,
    purpose: "TICKET_PURCHASE",
    description:
      "Ticket purchase for " + state.ticket.event.data.data.eventTitle,
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
