const express = require("express");
const { createOrder, getOrderStats } = require("../controllers/orderController");
const router = express.Router();

router.post("/create", createOrder);
router.get("/stats/:buyerId", getOrderStats);

module.exports = router;


// Update buyerController.js
const { getOrderStats } = require("./orderController");

const getBuyerDashboardStats = async (req, res) => {
  try {
    const buyerId = req.params.buyerId;
    const stats = await getOrderStats({ params: { buyerId } }, res);
    res.json(stats);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

module.exports = { registerBuyer, loginBuyer, getBuyerById, getBuyerDashboardStats };