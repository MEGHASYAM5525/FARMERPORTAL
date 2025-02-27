const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
  buyer: { type: mongoose.Schema.Types.ObjectId, ref: "Buyer", required: true },
  firm: { type: mongoose.Schema.Types.ObjectId, ref: "Firm", required: true },
  items: [
    {
      product: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
      quantity: Number,
      price: Number,
    },
  ],
  total: Number,
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Order", OrderSchema);
