const vendorController = require('../controllers/vendorController');
const express = require('express');
const { getVendorOrders } = require("../controllers/vendorController");
const router = express.Router();






router.post('/register', vendorController.vendorRegister);
router.post('/login', vendorController.vendorLogin);

router.get('/all-vendors', vendorController.getAllVendors);
router.get('/single-vendor/:apple', vendorController.getVendorById)

router.get("/orders", getVendorOrders);

module.exports = router;



