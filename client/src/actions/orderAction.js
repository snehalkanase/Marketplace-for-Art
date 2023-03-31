import axios from "axios";
import { CREATE_ORDER_REQUEST, CREATE_ORDER_SUCCESS, CREATE_ORDER_FAIL, CLEAR_ERRORS,
    MY_ORDERS_REQUEST, MY_ORDERS_SUCCESS, MY_ORDERS_FAIL  } from "../constantes/orderConstantes";



//create order
export const createOrder = (order) => async(dispatch,getstate) => {
    try{
        dispatch( {type: CREATE_ORDER_REQUEST});
        const config = {
            headers:{
                "Content-Type":"application/json",
            },
        };
        // const { data }= await axios.post("/order/"+id+"/newOrder", order, config);

        dispatch({
            type:CREATE_ORDER_SUCCESS,
            payload: order,
        });

    }catch(error){
        dispatch({
            type:CREATE_ORDER_FAIL,
            payload: error.response.data.message,
        });
    }
}

// clearinhg errors
export const clearErrors =() =>async(dispatch) => {
    dispatch({ type: CLEAR_ERRORS});
};

//My orders
export const myOrders = (userId) => async(dispatch,getState) => {
    try{
        dispatch( {type: MY_ORDERS_REQUEST});
        
         const { data }=  await axios.get(`/order/${userId}/myorders`);

        dispatch({
            type:MY_ORDERS_SUCCESS,
            payload: data.orders,
        });

    }catch(error){
        dispatch({
            type:MY_ORDERS_FAIL,
            payload: error.response.data.message,
        });
    }
    localStorage.setItem("myOrders", JSON.stringify(getState().myOrders));
}