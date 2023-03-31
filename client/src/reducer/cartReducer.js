import { ADD_TO_CART, REMOVE_CART_ITEM ,SAVE_SHIPPING_INFO } from '../constantes/cartConstantes';

export const cartReducer = (state ={cartItems:[], shippingInfo:{}}, action) => {
    switch (action.type){
        case ADD_TO_CART:
            const item = action.payload;
            // const isItemExist = state.cartItems.find(
            //     (i) => i.item
            // );
            // if(isItemExist) {
            //     return{
            //         ...state,
            //         cartItems: state.cartItems.map((i) => 
            //         i._id === isItemExist._id ? item : i
            //          ),
            //     };
            // }else {
                return{
                    ...state,
                    cartItems: [...state.cartItems, item],
                };
            // }

        case REMOVE_CART_ITEM:
            return{
                ...state,
                cartItems:state.cartItems.filter((i) => i._id !== action.payload ),
            };


        case SAVE_SHIPPING_INFO:
            return{
                ...state,
                shippingInfo: action.payload,
            };

            
            default:
                 return state;
    }
}