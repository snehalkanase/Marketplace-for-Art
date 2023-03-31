const Order = require("../models/Order");
const User = require("../models/User");
const Post = require("../models/Post");

//create new order
exports.newOrder = async(req, res, next) => {
    const{shippingInfo,
        cartItems,
        paymentInfo,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
    } = req.body;

    const order = await Order.create({
        shippingInfo,
        cartItems,
        paymentInfo,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
        paidAt: Date.now(),
        userId:req.params.id,
    });
    res.status(200).json({
        success: true,
        order,
    });
};

// get Logged in user's order

exports.myOrders = async(req, res, next) => {
    const orders = await Order.find({userId:req.params.id});
    res.status(200).json({
        success:true,
        orders,
    });
};

exports.confirmOrder = async (req, res) => {
    try {
        const post = await Post.findById(req.body.postId);
        res.status(200).json(post);
    } catch (err) {
        res.status(500).json(err);
    }
};
exports.postOrder = async (req, res) => {
    try {
        const post = await Post.findById(req.body.postId);
        res.status(200).json(post);
        
    } catch (err) {
        res.status(500).json(err);
    }
};