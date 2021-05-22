import {
    SET_WALLET_TRANSACTION,
    SET_WALLET_PAGINATION,
    PROCESSING,
    PAGINATION_PROCESSING
} from './wallet-actions';

const initState = {
    transactionHistory : '',
    walletPagination: '',
    processing: '',
    walletPaginationProcessing: ''
};

const reducer = (state = initState, action) => {
    let newState = {...state};

    switch (action.type) {
        case SET_WALLET_TRANSACTION:
        setWalletTransaction(newState, action.payload);
        break;
        case SET_WALLET_PAGINATION:
            setWalletPagination(newState, action.payload);
            break;
        case PROCESSING:
            setWalletProcessing(newState, action.payload);
            break;
        case PAGINATION_PROCESSING:
            setPaginationProcessing(newState, action.payload);
            break;
        default : {
            // do nothing
        }
    }
    return newState;
};


const setWalletTransaction = (state, data) => {
    if(data.page === 1) {
        state.transactionHistory = data.data;
    }else {
        state.transactionHistory = [...state.transactionHistory, ...data.data];
    }

};

const setWalletPagination = (state, data) => {
    state.walletPagination = data;
};

const setWalletProcessing = (state, processing) => {
    state.processing = processing;
};
const setPaginationProcessing = (state, processing) => {
    state.walletPaginationProcessing = processing;
};
export default reducer;
