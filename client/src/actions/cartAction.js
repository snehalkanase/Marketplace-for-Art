   import { ADD_TO_CART, REMOVE_CART_ITEM ,SAVE_SHIPPING_INFO } from "../constantes/cartConstantes";
import axios from 'axios';


//add to cart
export const addItemsToCart = (post)=> async (dispatch, getState) => {
    // const{post} = await axios.get("/post/post");

    dispatch({
        type: ADD_TO_CART,
        payload: post
        // {
        //     post: data.post._id,
        //     price: data.post.price,
        //     img: data.post.img
        // },
    }); 
    localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

//REMOVE_CART_ITEM
export const removeItemFromCart =(_id) => async(dispatch, getState) =>{
    dispatch({
        type: REMOVE_CART_ITEM,
        payload: _id,
    });
    localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

//save shipping info
export const saveShippingInfo =(data) => async(dispatch) =>{
    dispatch({
        type:SAVE_SHIPPING_INFO,
        payload: data,
    });
    localStorage.setItem("shippingInfo", JSON.stringify(data));
};