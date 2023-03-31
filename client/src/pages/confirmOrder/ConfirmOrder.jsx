import React, { useContext, useEffect, useState } from 'react'
import  CheckoutSteps from "../../checkoutStep/CheckoutSteps";
import { useSelector} from 'react-redux';
import "./confirmOrder.css";
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext';
import { Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function ConfirmOrder() {
  const { user } = useContext(AuthContext);
  const { shippingInfo ,cartItems } = useSelector((state) => state.cart);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const history = useNavigate();

  const subtotal = cartItems.reduce(
    (acc, post) => acc + post.price,
    0
  );
  const shippingCharges =subtotal > 1000 ? 0 : 99;

  const tax = subtotal * 0.18;

  const totalPrice = subtotal + tax + shippingCharges;

  const address = `${shippingInfo.address} , ${shippingInfo.city}, ${shippingInfo.state}, ${shippingInfo.pincode},
                   ${shippingInfo.country} `;
 
  const proceedToPayment = () =>{
    const data ={
      subtotal,
      shippingCharges,
      tax,
      totalPrice,
    };
    sessionStorage.setItem("orderInfo", JSON.stringify(data));
    history("/process/payment")
  }

  return (
    <>
    <CheckoutSteps activeStep={1} />
    <div className="confirmOrderPage">
      <div>
        <div className="confirmshippingArea">
          <Typography>Shipping Information</Typography>
          <div className="confirmshippingAreaBox">
            <div>
              <p>Name:</p>
              <span>{user.username}</span>
            </div>
            <div>
              <p>Phone:</p>
              <span>{shippingInfo.phoneNo}</span>
            </div>
            <div>
              <p>Address:</p>
              <span>{address}</span>
            </div>
          </div>
        </div>
        <div className="confirmCartItems">
          <Typography>Your cart Items</Typography>
          <div className="confirmCartItemContainer">
            {cartItems &&
            cartItems.map((post) => (
              <div key={post._id}>
                <img src={PF + post.img} alt="jiji" className='poster'/>
                <span>₹{post.price }</span>
              </div>
            ))
            }
          </div>
        </div>
      </div>
    
    {/* uyui */}
      <div>
        <div className="orderSummary">
          <Typography>Order Summary</Typography>
          <div>
            <div>
              <p>Subtotal:</p>
              <span>₹{subtotal}</span>
            </div>
            <div>
              <p>Shipping Charges:</p>
              <span>₹{shippingCharges}</span>
            </div>
            <div>
              <p>GST:</p>
              <span>₹{tax}</span>
            </div>
          </div>

          <div className="orderSummaryTotal">
            <p><b>Total:</b></p>
            <span>₹{totalPrice}</span>
          </div>

          <button onClick={proceedToPayment}>Proceed to Payment</button>
        </div>
      </div>
    </div>
    </>
  )
}
