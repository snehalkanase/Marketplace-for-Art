const { processPayment, sendStripeApiKey } = require("../controllers/paymentController");
const router = require("express").Router();


router.route("/process").post(processPayment);
router.route("/stripeapikey").get(sendStripeApiKey);

module.exports = router;