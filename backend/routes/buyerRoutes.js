

const express = require('express');
const { registerBuyer, loginBuyer, getBuyerById } = require('../controllers/buyerController');
const { getBuyerDashboardStats } = require("../controllers/buyerController");


const router = express.Router();

router.post('/register', registerBuyer);
router.post('/login', loginBuyer);
router.get('/single-buyer/:buyerId', getBuyerById); // ✅ Added route for fetching buyer details
router.get("/dashboard/:buyerId", getBuyerDashboardStats);

module.exports = router;


