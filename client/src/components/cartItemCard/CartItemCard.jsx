import { DeleteOutline } from '@mui/icons-material'
import React from 'react'
import './cartItemCard.css'

export default function CartItemCard({ post, deleteCartItem }) {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  return (
    <>
    <div className="cartItemCard">
        <img src={PF + post.img} alt="ssa" />
        <div>
        <span >{`Price ₹ ${post.price}`}</span>
        <p onClick={() => deleteCartItem(post._id)}> <DeleteOutline />Remove</p>
        </div>
    </div>
    </>
  )
}
