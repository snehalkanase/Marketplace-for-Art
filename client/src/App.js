import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Profile from "./pages/profile/Profile";
import Register from "./pages/register/Register";
import Wishlist from "./pages/wishlist/Wishlist";
import Shipping from "./pages/shipping/Shipping";
import Cart from "./pages/cart/Cart";
import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";
import ConfirmOrder from "./pages/confirmOrder/ConfirmOrder";
import Payment from "./pages/payment/Payment";
import Success from "./pages/sucsess/Success";
import Myorders from "./pages/myOrders/Myorders";
import Updateprofile from "./pages/updateProf/UpdateProfile"

import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";


function App() {
  // const StripeApiKey = process.env.STRIPE_API_KEY ;
  const { user } = useContext(AuthContext);
  // 
  const stripePromise = loadStripe("pk_test_51MhWDOSG61YvjeJLm9koEPmy9uxwtnkuQbGlkPhnUZQlpSEzslaqXQ5zon41UeYgH3hC9nL3y3ZI3D7ewYReGGdA001pw5EmTS");
  // loadStripe(`${process.env.STRIPE_API_KEY }`);
  // `${process.env.STRIPE_API_KEY }`;
  //  }, [stripeApiKey]);

  return (
    <BrowserRouter>
      <Routes>


        <Route exact path="/" element={user ? <Home /> : <Register />} />
        <Route path="/login" element={user ? <Navigate to="/" /> : <Login />} />
        <Route path="/register" element={user ? <Navigate to="/" /> : <Register />} />
        <Route path="/profile/:username" element={<Profile />} />
        <Route path="/:userId/wishlist" element={<Wishlist />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/:userId/shipping" element={user ? <Shipping /> : <Login />} />
        <Route path="/order/confirm" element={<ConfirmOrder />} />
        <Route path="/process/payment" element={
          <Elements stripe={stripePromise}>
            <Payment />
          </Elements>} />
        <Route path="/success" element={<Success />} />
        <Route path="/orders/myOrders" element={<Myorders />} /> 
        <Route path="/updateprofile" element={<Updateprofile />} />

        {/* <Route path="/process/payment" element={<Payment />}  /> */}


      </Routes>
    </BrowserRouter>

  )
}

export default App;
