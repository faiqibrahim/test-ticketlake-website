import axios from "../../utils/axios"


export const fetchSeatsCapacity = (data) => {
    return axios.post(`/tickets/reserve/capacity`, data, 'v2')
    .then(({data}) => {
        const { reservations, holdToken } = data.data;
        sessionStorage.setItem('seatsio', JSON.stringify({holdToken}));
        return reservations;
    })
}