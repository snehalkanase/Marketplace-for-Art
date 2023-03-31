import React, { useContext, useEffect, useState } from 'react'
import{ DataGrid} from "@mui/x-data-grid";
import { Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { AuthContext } from '../../context/AuthContext';
import { clearErrors, myOrders } from '../../actions/orderAction';
import Topbar from '../../components/topbar/Topbar';
import Sidebar from '../../components/sidebar/Sidebar';
import "./myOrders.css"
import axios from 'axios';


export default function Myorders() {
    const dispatch = useDispatch();
    const {error, order}= useSelector((state) => state.myOrders);
    const { user } = useContext(AuthContext);
    

    const columns= [
        {field:"id", headerName:"Order Id", minWidth:300, flex:0.7},
        {field:"date", headerName:"Order Date", minWidth:150, flex:0.4},
        {field:"itemsQty", headerName:"Items Qty",type:"number", minWidth:150, flex:0.2},
        {field:"amount", headerName:"Amount",type:"number", minWidth:270, flex:0.4 },
    ];

    const rows = [];

    order &&
    order.forEach((item,index) => { 
        rows.push({
            itemsQty: item.cartItems.length,
            id: item._id,
            date: item.paidAt.slice(0,10),
            amount: item.totalPrice,
        })
    })

    useEffect(() => {
        if(error){
            console.log(error);
            dispatch(clearErrors());
        }
        // else{
        //     const fetchOrders = async () => {
        //         console.log("success");
        //         const order =  await axios.get("/order/"+user._id+"/myorders");
        //         // console.log(orders.data);
        //         // setOrders(orders.data);
        //       };
        //       fetchOrders();
        // }
        dispatch(myOrders());
    },[dispatch,error]);

  return (
    <> 
    <Topbar />
    <div className="myOrders">
    <Sidebar />
    {/* {loading ? (
        "loading..."
    ) : ( */}
        <div className="myOrdersPage">
            <DataGrid 
            rows={rows}
            columns={columns}
            pageSize={10}
            disableRowSelectionOnClick
            className='myOrdersTable'
            autoHeight/>

            <Typography id="myOrderHeading"> {user.username}'s Orders </Typography>
        </div>
    {/* )} */}

    </div>
    
    </>
  )
}
