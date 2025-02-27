const Vendor = require('../models/Vendor');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const dotEnv = require('dotenv');
const Order = require("../models/Order");
dotEnv.config();

const secretKey = process.env.WhatIsYourName



const vendorRegister = async(req, res) => {
    const { username, email, password } = req.body;
    try {
        const vendorEmail = await Vendor.findOne({ email });
        if (vendorEmail) {
            return res.status(400).json("Email already taken");
        }
        const hashedPassword = await bcrypt.hash(password, 10);

        const newVendor = new Vendor({
            username,
            email,
            password: hashedPassword
        });
        await newVendor.save();

        res.status(201).json({ message: "Vendor registered successfully" });
        console.log('registered')

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" })
    }

}

const vendorLogin = async(req, res) => {
    const { email, password } = req.body;
    try {
        const vendor = await Vendor.findOne({ email });
        if (!vendor || !(await bcrypt.compare(password, vendor.password))) {
            return res.status(401).json({ error: "Invalid username or password" })
        }
        const token = jwt.sign({ vendorId: vendor._id }, secretKey, { expiresIn: "1h" })

        const vendorId = vendor._id;

        res.status(200).json({ success: "Login successful", token, vendorId })
        console.log(email, "this is token", token);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal server error" });
    }

}

const getAllVendors = async(req, res) => {
    try {
        const vendors = await Vendor.find().populate('firm');
        res.json({ vendors })
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal server error" });
    }
}


const getVendorById = async (req, res) => {
    const vendorId = req.params.apple; // Ensure this matches the route

    try {
        const vendor = await Vendor.findById(vendorId).populate('firm');
        if (!vendor) return res.status(404).json({ error: "Vendor not found" });

        if (!vendor.firm || vendor.firm.length === 0) {
            return res.status(404).json({ error: "Vendor firm not found" });
        }

        const vendorFirmId = Array.isArray(vendor.firm) ? vendor.firm[0]._id : vendor.firm._id;

        res.status(200).json({ vendorId, vendorFirmId, vendor });
        console.log(vendorFirmId);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
};

const getVendorOrders = async (req, res) => {
    try {
        console.log(req.user); // Debugging line to check if req.user exists

        const vendorId = req.user.vendorId; // Ensure req.user is set in middleware
        if (!vendorId) return res.status(403).json({ error: "Unauthorized" });

        const vendor = await Vendor.findById(vendorId).populate("firm");
        if (!vendor) return res.status(404).json({ error: "Vendor not found" });

        if (!vendor.firm || vendor.firm.length === 0) {
            return res.status(404).json({ error: "No firm associated with vendor" });
        }

        const firmId = Array.isArray(vendor.firm) ? vendor.firm[0]._id : vendor.firm._id;
        const orders = await Order.find({ firm: firmId }).populate("items.product");

        res.status(200).json(orders);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
};



module.exports = { vendorRegister, vendorLogin, getAllVendors, getVendorById,getVendorOrders }