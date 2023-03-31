import { CheckCircle } from '@mui/icons-material'
import { Typography } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom';
import "./success.css"

export default function Success() {
  return (
    <div className="orderSuccess">
        <CheckCircle />
        <Typography>Your Order has Been Placed Successfully</Typography>
        <Link to="/orders/myOrders">View Order</Link>
    </div>
  )
}
