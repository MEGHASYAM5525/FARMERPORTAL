

const express = require('express');
const { registerBuyer, loginBuyer, getBuyerById } = require('../controllers/buyerController');
const { getBuyerDashboardStats } = require("../controllers/buyerController");


const router = express.Router();

router.post('/register', registerBuyer);
router.post('/login', loginBuyer);
router.get('/single-buyer/:buyerId', getBuyerById); // ✅ Added route for fetching buyer details
router.get("/dashboard/:buyerId", getBuyerDashboardStats);
router.get('/stats/:buyerId', async (req, res) => {
    try {
      const buyerId = req.params.buyerId;
      const buyerStats = await Buyer.findById(buyerId);

      if (!buyerStats) {
        return res.status(404).json({ error: "Buyer not found" });
      }

      res.json({
        orders: buyerStats.totalOrders || 0,
        payments: buyerStats.totalPayments || 0,
        products: buyerStats.totalProducts || 0,
      });
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch buyer stats" });
    }
});

  
module.exports = router;


