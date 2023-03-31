import React, { useState } from 'react'
import './shipping.css';
import { useSelector, useDispatch} from 'react-redux';
import { saveShippingInfo } from '../../actions/cartAction';
// import { useAlert } from "react-alert";
import { Country, State } from 'country-state-city';
import { Home, LocalPhone, LocationCity, PinDrop, Public, TransferWithinAStation } from '@mui/icons-material';
import  CheckoutSteps from "../../checkoutStep/CheckoutSteps";
import { useNavigate } from 'react-router-dom';

export default function Shipping() {
    const dispatch = useDispatch();
    const { shippingInfo } = useSelector((state) => state.cart);
    const history = useNavigate();

    const [address, setAddress] = useState(shippingInfo.address);
    const [city, setCity] = useState(shippingInfo.city);
    const [state, setState] = useState(shippingInfo.state);
    const [country, setCountry] = useState(shippingInfo.country);
    const [pincode, setPincode] = useState(shippingInfo.pincode);
    const [phoneNo, setPhoneNo] = useState(shippingInfo.phoneNo);

    const shippingSubmit = (e) => {
        e.preventDefault();

        if(phoneNo.lenght < 10 || phoneNo.lenght > 10){
            alert.error("Phone Number should be 10 Digits long");
            return;
        }
        dispatch(
            saveShippingInfo({address, city, state, country, pincode, phoneNo})
        );
        history("/order/confirm");
    };

    return (

    <>
    <CheckoutSteps activeStep={0} />
        <div className="shippingContainer">
            <div className="shippingBox">
                <h2 className="shippingHeader">Shipping Details</h2>
                <form action="" encType='multipart/form-data' className="shippingForm" onSubmit={shippingSubmit}>
                    <div>
                        <Home />
                        <input
                            type="text"
                            placeholder='Address'
                            required
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                        />
                    </div>

                    <div>
                        <LocationCity />
                        <input
                            type="text"
                            placeholder='city'
                            required
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                        />
                    </div>

                    <div>
                        <PinDrop />
                        <input
                            type="number"
                            placeholder='Pin Code'
                            required
                            value={pincode}
                            onChange={(e) => setPincode(e.target.value)}
                        />
                    </div>

                    <div>
                        <LocalPhone />
                        <input
                            type="tel"
                            placeholder='Phone Number'
                            required
                            value={phoneNo}
                            onChange={(e) => setPhoneNo(e.target.value)}
                            minLength="10"
                            maxLength="10"

                        />
                    </div>

                    <div>
                        <Public />
                        <select required value={country} onChange={(e) => setCountry(e.target.value)}>
                            <option value="">Country</option>
                            {Country &&
                            Country.getAllCountries().map((item) => (
                                <option key={item.isoCode} value={item.isoCode}>
                                    {item.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    {country && (
                         <div>
                            <TransferWithinAStation />
                            <select required value={state} onChange={(e) => setState(e.target.value)}>
                            <option value="">State</option>
                            {State &&
                            State.getStatesOfCountry(country).map((item) => (
                                <option key={item.isoCode} value={item.isoCode}>
                                    {item.name}
                                </option>
                            ))}
                        </select>
                         </div>
                    )}

                    <input type="submit"
                    value="Continue"
                    className="shippingBtn"
                    disabled={ state ? false : true}
                    />
                </form>
            </div>
        </div>
    </>

    )
}
