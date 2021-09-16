import axios from "../../utils/axios"


export const fetchSeatsCapacity = (data) => {
    return axios.post(`/tickets/reserve/capacity`, data, 'v2')
    .then(({data}) => {
        return data.data;
    })
}