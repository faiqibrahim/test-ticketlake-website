import {getStore} from '../../index';

export const getPaymentInfo = () => {
    const state = getStore().getState();


    const info = {
        amount: state.ticket.totalBill,
        currency: state.ticket.ticketCurrency,
        purpose: 'TICKET_PURCHASE',
        description: "Ticket purchase for " + state.ticket.event.data.data.eventTitle,
        paymentMethods: [
            {
                "type": "WALLET",
                "walletCurrency": state.user.userWallet.currency,
                "balance": state.user.userWallet.availableBalance,
            },
            {
                "type": "MOBILE_MONEY",
            },
            {
                "type": "PAYPAL",
                "clientId": "AVxMDtg2UkfX0IFBK86r_l_EcCeloAcMmOQf7vbOuPQsr10I5QJBf-u4YVn504puI-GyLQ0ZcKRYBG2T"
            }
        ]
    }

    return info;
}
