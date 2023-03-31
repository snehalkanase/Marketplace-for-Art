import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { cartReducer } from './reducer/cartReducer';
import { myOrdersReducer, newOrderReducer } from './reducer/orderReducer';
import { followReducer } from './reducer/followReducer';

const reducer = combineReducers({
    cart: cartReducer,
    newOrder: newOrderReducer,
    myOrders: myOrdersReducer,
    follow: followReducer,
});

let initialState ={
    cart: {
        cartItems: localStorage.getItem("cartItems")
        ? JSON.parse(localStorage.getItem("cartItems"))
        :[],

        shippingInfo: localStorage.getItem("shippingInfo")
        ? JSON.parse(localStorage.getItem("shippingInfo"))
        :{},
    }
};

const middleware =[thunk];

const store = createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
);
export default store;