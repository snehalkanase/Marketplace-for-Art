const { newOrder, myOrders, confirmOrder, postOrder } = require("../controllers/orderController");
const router = require("express").Router();


router.route("/:id/newOrder").post(newOrder);
router.route("/:userId/myorders").get(myOrders);
router.route("/confirmOrder").get(confirmOrder);
router.route("/postOrder").put(postOrder);

module.exports = router;