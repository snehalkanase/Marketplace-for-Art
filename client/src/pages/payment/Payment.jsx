import React, { useContext, useEffect, useRef } from 'react'
import CheckoutSteps from '../../checkoutStep/CheckoutSteps'
import { CreditCardOutlined, EventAvailableOutlined, VpnKey } from '@mui/icons-material';
import {
    CardNumberElement,
    CardExpiryElement,
    CardCvcElement,
    useStripe,
    useElements,
} from "@stripe/react-stripe-js";
import "./payment.css"
import { useDispatch, useSelector } from 'react-redux';
import { AuthContext } from '../../context/AuthContext';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import { clearErrors, createOrder } from '../../actions/orderAction';

export default function Payment() {

    const orderInfo = JSON.parse(sessionStorage.getItem("orderInfo"));
    const dispatch = useDispatch();
    const stripe = useStripe();
    const elements = useElements();
    const payBtn = useRef(null);
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const history = useNavigate();

    const { shippingInfo, cartItems} =useSelector((state) => state.cart);
    const{ user }= useContext(AuthContext);
    const{ error} = useSelector((state) => state.newOrder);

    const paymentData = {
        amount: Math.round(orderInfo.totalPrice * 100),
    };

    const order = {
        shippingInfo,
        cartItems,
        itemsPrice: orderInfo.subtotal,
        taxPrice: orderInfo.tax,
        shippingPrice:  orderInfo.shippingCharges,
        totalPrice:  orderInfo.totalPrice,
    };
    // order.orderItems = [{
    //     post: cartItems._id, 
    //     img: cartItems.img,
    //     price: cartItems.price,
    // }]

    const submitHandler = async(e) => {
        e.preventDefault();
        payBtn.current.disabled = true;
        try{
            const config = {
                headers:{
                    "Content-Type":"application/json",
                },
            };
            const { data }= await axios.post("/payment/process", paymentData, config);

            const client_secret = data.client_secret;

            if(!stripe || !elements) return;

            const result = await stripe.confirmCardPayment(client_secret,{
                payment_method: {
                    card:elements.getElement(CardNumberElement),
                    billing_details:{
                        name: user.name,
                        email:user.email,
                        address:{
                            line1:shippingInfo.address,
                            city:shippingInfo.city,
                            state:shippingInfo.state,
                            postal_code:shippingInfo.pincode,
                            country: shippingInfo.country,
                        },
                    },
                },
            });
            if(result.error){
                payBtn.current.disabled = false;
                toast.error( result.error.message , {
                    position: toast.POSITION.TOP_CENTER,
                });
            } else{
                if(result.paymentIntent.status === "succeeded"){
                    order.paymentInfo = {
                        id: result.paymentIntent.id,
                        status: result.paymentIntent.status,
                    };
            
                    await axios.post("/order/"+user._id+"/newOrder", order, config);
                    dispatch(createOrder(order));
                    history("/success");
                }else{
                    toast.error( "There is some issue while proccessing payment", {
                        position: toast.POSITION.TOP_CENTER,
                    }); 
                }
            }
        }catch(error){
            payBtn.current.disabled = false;
            toast.error( error.response.data.message , {
                position: toast.POSITION.TOP_CENTER,
            });
        }
    }

    useEffect(() => {
        if(error){
            console.log(error);
            dispatch(clearErrors());
        }
    },[dispatch,error])
  return (
    <>
    <div className="payment">
    <CheckoutSteps activeStep={2} />
    <div className="paymentContainer">
        <form  className="paymentForm" onSubmit={(e) => submitHandler(e)} >
            <label>Pay With Card</label>
        {/*  */}
        <p className='tag'>Artovox</p>
        <h6>card information</h6>

            <div>
               <CreditCardOutlined />
               <CardNumberElement className='cardInput' />
            </div>
            {/* <div className="pay"> */}
            <div>
                <EventAvailableOutlined />
                <CardExpiryElement className='payInput' /><img className='img' src={`${PF}card.png`} alt="" />
            </div>
            <div>
                <VpnKey/>
                <CardCvcElement className='payInput' />
            </div>
            {/* </div> */}

            <input type="submit"
            value={`Pay - ₹${orderInfo && orderInfo.totalPrice}`}
            ref={payBtn}
            className="paybtn" />
        </form>
    </div>
    </div>
    <ToastContainer />
    </>
  )
}
