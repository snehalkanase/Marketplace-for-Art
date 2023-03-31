import React, { useContext } from 'react'
import "./cart.css";
import CartItemCard from "../../components/cartItemCard/CartItemCard";
import Topbar from '../../components/topbar/Topbar';
import { useSelector, useDispatch} from 'react-redux';
import {removeItemFromCart} from "../../actions/cartAction";
// import toast, { Toaster } from 'react-hot-toast';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { RemoveShoppingCartOutlined } from '@mui/icons-material';
import { Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

export default function Cart() {
    const dispatch = useDispatch();
    const { cartItems } = useSelector((state) => state.cart);
    const history = useNavigate();
    const { user } = useContext(AuthContext);

    const deleteCartItem = (_id) => {
        dispatch(removeItemFromCart(_id));
        // toast.success('Removed ', {
        //     position:toast.POSITION.BOTTOM_CENTER,  
        // });
    };

    const checkoutHandler = () => {
         history(`/${user._id}/shipping`)
    }
 return (
   <>
   {cartItems.lenght === 0 ? (
    <div className="emptyCart">
        <RemoveShoppingCartOutlined />

        <Typography>Your Cart is Empty</Typography>
    </div>
   ) : (
    <>
    <Topbar />
    <div className="cartPage">
        <div className="cartHeader">
            <p>Item</p>
            {/* <p>Quntity</p> */}
            <p>Subtotal</p>
        </div>
        
        {cartItems && cartItems.map((post) => (
            <div className="cartContainer" key={post._id}>
            <CartItemCard  post={post} deleteCartItem={deleteCartItem} />
            {/* <div className="cartInput">
                <button>-</button>
                input
            </div> */}
            <p className="cartSubtotal">{`₹${post.price}`}</p>
        </div>

        ))}
        
        <div className="cartGrossProfit">
            <div></div>
            <div className="cartGrossProfitBox">
                <p>Gross Total:</p>
                <p className='pricetag'>{`₹${cartItems.reduce(
                    (acc, post) => acc + post.price,
                    0
                )}`}</p>
            </div>
            <div></div>
            <div className="checkOut">
                <button onClick={checkoutHandler}>Check Out</button>
            </div>
        </div>
    </div>
    <ToastContainer />
    {/* <Toaster /> */}
    </>
   )}
   </>
  )
}
