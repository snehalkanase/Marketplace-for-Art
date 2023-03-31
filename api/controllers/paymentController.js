require('dotenv').config();
const User = require("../models/User");
require('dotenv').config({ path: './.env' })
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

exports.processPayment = async(req, res, next) => {
    const myPayment = await stripe.paymentIntents.create({
        amount: req.body.amount,
        currency:"inr",
        metadata:{
            company : "Artovox"
            // user:User.findById(req.params.id),
        },
    });
    res.status(200).json({success: true, client_secret: myPayment.client_secret})
}; 

exports.sendStripeApiKey = async(req, res, next) => {
    res.status(200).json({ stripeApiKey: process.env.STRIPE_API_KEY });
};