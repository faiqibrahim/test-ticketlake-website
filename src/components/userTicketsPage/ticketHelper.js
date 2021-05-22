
export const getStateObjForUrl =  (state) => {

    let obj = {
        self: '',
        status: ''
    };

    if (state.ticket === "My Tickets" && state.status === '') {
        obj = {self: true, status: ''}
    }
    if (state.ticket === "My Tickets" && state.status === "Upcoming") {
        obj = {self: true, status: true}
    }
    if (state.ticket === "My Tickets" && state.status === "Expired") {
        obj = {self: true, status: false}
    }

    if (state.ticket === "Guest Tickets" && state.status === '') {
        obj = {self: false, status: ''}
    }

    if (state.ticket === "Guest Tickets" && state.status === "Upcoming") {
        obj = {self: false, status: true}
    }

    if (state.ticket === "Guest Tickets" && state.status === "Expired") {
        obj = {self: false, status: false}
    }

    if (state.ticket === "All"){
        obj = {self: '', status: ''}
    }

    if (state.status === "Upcoming" && state.ticket === '') {
        obj = {self: '', status: true}
    }
    if (state.status === "Upcoming" && state.ticket === "My Tickets") {
        obj = {self: true, status: true}
    }

    if (state.status === "Upcoming" && state.ticket === "Guest Tickets") {
        obj = {self: false, status: true}
    }

    if (state.status === "Expired" && state.ticket === "Guest Tickets") {
        obj = {self: false, status: false}
    }

    if (state.status === "Expired") {
        obj = {self: '', status: false}
    }

    if (state.status === '' && state.ticket === '') {
        obj = {self: '', status: ''}
    }
    return obj;
};
