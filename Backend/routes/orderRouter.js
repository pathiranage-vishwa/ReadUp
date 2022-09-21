const router = require("express").Router();
const orderCtrl = require("../controllers/orderCtrl");
const auth = require("../middleware/auth");
const authAdmin = require("../middleware/authAdmin");

router.route("/order").get(orderCtrl.getOrders).post(orderCtrl.createOrder);

router.route("/order/:seller_id").get(orderCtrl.getOrderBySellerID);

router.route("/order/:id").put(orderCtrl.updateOrderStatus);

module.exports = router;
