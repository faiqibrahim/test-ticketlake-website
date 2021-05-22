// Redux
import thunk from 'redux-thunk';
import {createStore, applyMiddleware, combineReducers, compose} from 'redux';
// Stores
import user from './user/user-reducer';
import event from './event/event-reducer';
import category from './category/category-reducer';
import ticket from './ticket/ticket-reducer';
import wishlist from './wishlist/wishlist-reducer';
import multilingual from './multilingual/multilingual-reducer';
import wallet from './wallet/wallet-reducer';
import common from './common/common-reducer';
import movies from './movies/movie-reducer';
import venue from './venues/venue-reducer';

const reducer = combineReducers({
    event,
    user,
    category,
    ticket,
    wishlist,
    multilingual,
    wallet,
    common,
    movies,
    venue
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducer, composeEnhancers(
    applyMiddleware(thunk)
));

export default store;