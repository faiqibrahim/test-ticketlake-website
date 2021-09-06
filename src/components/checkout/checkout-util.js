import { getStore } from "../../index";
import { getHoldToken } from "../../utils/common-utils";

export const prepareHoldData = () => {
  const { ticket } = getStore().getState();
  const { event, assignedSeats, couponValue } = ticket;
  return {
    eventId: event.data.data._id,
    holdToken: getHoldToken(),
    tickets: assignedSeats,
    promoCode: couponValue ? couponValue.promoCode : "",
  };
};
