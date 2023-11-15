var express = require("express");
var router = express.Router();
const ordersController = require("../controller/ordersController");

/* orders routes */
router.post("/create", ordersController.createOrder);
router.patch("/update", ordersController.updateOrder);
router.get("/list", ordersController.getOrders);
router.get("/search", ordersController.getSingleOrder);
router.delete("/delete", ordersController.deleteOrder);

module.exports = router;
