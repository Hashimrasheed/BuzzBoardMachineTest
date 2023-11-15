const OrdersModel = require("../models/orders")

const createOrder = async (req, res) => {
  const order = new OrdersModel({...req.body, createdBy: req.userId});
  try {
    await order.save();
    res.json(order);
  } catch (error) {
    res.status(400).json(error.message);
  }
}

const updateOrder = async (req, res) => {
  try {
    const order = await OrdersModel.findByIdAndUpdate(
      req.params.orderId,
      req.body
    );
    await order.save();
    res.json(order);
  } catch (error) {
    res.status(400).json(error.message);
  }
}

const getOrders = async (req, res) => {
  try {
    const orders = await OrdersModel.find({});
     res.json(orders);
   } catch (error) {
     res.status(400).json(error.message);
   }
}

const getSingleOrder = async (req, res) => {
  try {
    const order = await OrdersModel.findOne({ _id: req.params.orderId });
    res.json(order);
  } catch (error) {
    res.status(400).json(error.message);
  }
}



const deleteOrder = async (req, res) => {
  try {
    const order = await OrdersModel.findByIdAndDelete(req.params.orderId);
    if (!order) {
      return res.status(404).json("Order not found");
    }
    res.status(204).json({status: "Order deleted successfully"});
  } catch (error) {
    res.status(400).json(error.message);
  }
}


module.exports = { createOrder, updateOrder, getOrders, getSingleOrder, deleteOrder }