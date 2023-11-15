const mongoose = require("mongoose");
 
const OrdersSchema = new mongoose.Schema({
  order_id: {
    type: String,
    required: true,
  },
  item_name: {
    type: String,
    required: true,
  },
  cost: {
    type:Number,
    required: true,
  },
  order_date: { type: Date, default: Date.now },
  delivery_date: { type: Date, default: Date.now },
});
 
module.exports = mongoose.model("Orders", OrdersSchema);
