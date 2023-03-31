import axios from "axios";
import { createContext, useContext, useReducer } from "react";
import reducer from './WishlistReducer';

const WishlistContext =createContext();
const initialState = {
    wishlist:[],
};

const WishlistProvider = ({children}) => {

    const [state, dispatch] = useReducer(reducer, initialState);

    // const wishHandler = (id, post) => {
    //     try{
    //         axios.put("/post/"+ userId +"/wishlist");
    //          dispatch({ type: "WISHLIST", payload: {id, post}});

    //     }catch(err){
    //         console.log(err)
    //     }
    // };
    
    return (
        <WishlistContext.Provider
            value={{ ...state}}>
            {children}
        </WishlistContext.Provider>

    )
}
const useWishlistContext =() =>{
    return useContext(WishlistContext);
}
    export {WishlistProvider, useWishlistContext};