const Order = require("../models/Order");

// Create new order after successful payment
const createOrder = async (req, res) => {
  try {
    const { buyerId, products, totalAmount } = req.body;
    const newOrder = new Order({ buyerId, products, totalAmount, status: "completed" });
    await newOrder.save();
    res.status(201).json({ message: "Order placed successfully", order: newOrder });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

// Fetch order statistics for a buyer
const getOrderStats = async (req, res) => {
  try {
    const buyerId = req.params.buyerId;
    const totalOrders = await Order.countDocuments({ buyerId });
    const totalPayments = await Order.aggregate([
      { $match: { buyerId: mongoose.Types.ObjectId(buyerId) } },
      { $group: { _id: null, total: { $sum: "$totalAmount" } } },
    ]);
    const purchasedProducts = await Order.aggregate([
      { $match: { buyerId: mongoose.Types.ObjectId(buyerId) } },
      { $unwind: "$products" },
      { $group: { _id: "$products" } },
    ]);
    res.json({
      totalOrders,
      totalPayments: totalPayments.length ? totalPayments[0].total : 0,
      purchasedProducts: purchasedProducts.length,
    });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

module.exports = { createOrder, getOrderStats };