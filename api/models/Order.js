const mongoose = require("mongoose");


const OrderSchema = new mongoose.Schema({
    shippingInfo:{
        address:{
            type:String,
            required:true,
        },
        city:{ type:String, required:true },
        state:{ type:String, required:true },
        country:{ type:String, required:true },
        pincode:{ 
            type:Number, 
            required:true 
        },
        phoneNo:{ 
            type:Number, 
            required:true,
         },
    },
    cartItems:[{
        price:{
            type:Number,
            required:true
        }, 
        img:{
            type:String,
            required:true
        },
        _id:{
            type:String,
            required:true
        },   
    },],
    userId:{
        type:String,
        required:true
    },
    paymentInfo:{
        id:{
            type:String,
            required:true
        },
        status:{
            type:String,
            required:true
        },
    },
    paidAt:{
        type:Date,
        required:true
    },
    itemsPrice:{
        type:Number,
        required:true,
        default:0
    },
    taxPrice:{
        type:Number,
        required:true,
        default:0
    },
    shippingPrice:{
        type:Number,
        required:true,
        default:0
    },
    totalPrice:{
        type:Number,
        required:true,
        default:0
    },
},
{ timestamps: true}
); 

module.exports = mongoose.model("Order", OrderSchema);