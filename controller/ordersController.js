const OrdersModel = require("../models/orders");

const createOrder = async (req, res) => {
  const orderData = req.body;
  try {
    // Check for duplicate order_id
    const existingOrder = await OrdersModel.findOne({
      order_id: orderData.order_id,
    });
    if (existingOrder) {
      return res
        .status(400)
        .json({ error: "Duplicate order_id. Order not created." });
    }

    const order = new OrdersModel(orderData);
    await order.save();
    res.status(200).json({ message: "Order created successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const updateOrder = async (req, res) => {
  try {
    const order = await OrdersModel.findOneAndUpdate(
      { order_id: req.body.order_id },
      req.body
    );
    if (!order) {
      return res.status(400).json({ error: "Order not exist" });
    }
    await order.save();
    res.status(200).json({ message: "Order updated successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getOrders = async (req, res) => {
  try {
    const orderDate = req.query.order_date;
    let dateFilter = {};
    if (orderDate) {
      const filterDate = new Date(orderDate);

      if (isNaN(filterDate.getTime())) {
        return res
          .status(400)
          .json({ error: "Invalid date format. Please use yyyy/mm/dd." });
      }
      // Set start time to the beginning of the requested date
      const startTime = new Date(
        filterDate.getFullYear(),
        filterDate.getMonth(),
        filterDate.getDate()
      );

      // Set end time to the end of the requested date
      const endTime = new Date(startTime.getTime() + 24 * 60 * 60 * 1000);

      dateFilter = {
        order_date: {
          $gte: startTime,
          $lt: endTime,
        },
      };
    }

    // Find orders for the given date
    const orders = await OrdersModel.find(dateFilter);
    res.status(200).json(orders);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getSingleOrder = async (req, res) => {
  try {
    const order = await OrdersModel.findOne({ order_id: req.query.order_id });
    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
  }
    res.status(200).json(order);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deleteOrder = async (req, res) => {
  try {
    const deletedOrder = await OrdersModel.findOneAndDelete({ order_id: req.query.order_id });
    if (!deletedOrder) {
      return res.status(404).json({ error: 'Order not found' });
  }
    res.status(200).json({ status: "Order deleted successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  createOrder,
  updateOrder,
  getOrders,
  getSingleOrder,
  deleteOrder,
};
