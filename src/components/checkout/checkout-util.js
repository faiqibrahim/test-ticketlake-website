import {getStore} from '../../index';
import {getHoldToken} from "../../utils/common-utils";

export const prepareHoldData = () => {
    const {ticket} = getStore().getState();

    return {
        eventId: ticket.event.data.data._id,
        holdToken: getHoldToken(),
        tickets: ticket.assignedSeats,
    }
}
