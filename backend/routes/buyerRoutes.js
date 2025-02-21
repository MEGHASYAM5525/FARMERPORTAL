const express = require('express');
const { registerBuyer, loginBuyer } = require('../controllers/buyerController');

const router = express.Router();

router.post('/register', registerBuyer);
router.post('/login', loginBuyer);

module.exports = router;
