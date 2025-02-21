// const express = require("express");
// const dotEnv = require('dotenv');
// const mongoose = require('mongoose');
// const vendorRoutes = require('./routes/vendorRoutes');
// const bodyParser = require('body-parser');

// const firmRoutes = require('./routes/firmRoutes');
// const productRoutes = require('./routes/productRoutes');
// const buyerRoutes = require('./routes/buyerRoutes');


// const cors = require('cors');
// const path = require('path')

// const app = express()

// const PORT = process.env.PORT || 4000;

// dotEnv.config();
// app.use(cors())

// mongoose.connect(process.env.MONGO_URI)
//     .then(() => console.log("MongoDB connected successfully!"))
//     .catch((error) => console.log(error))

// app.use(bodyParser.json());
// app.use('/vendor', vendorRoutes);
// app.use('/firm', firmRoutes)
// app.use('/product', productRoutes);
// app.use('/uploads', express.static('uploads'));
// app.use('/buyer', buyerRoutes);

// app.listen(PORT, () => {
//     console.log(`server started and running at ${PORT}`);
// });

// app.use('/', (req, res) => {
//     res.send("<h1> Welcome to SUBY");
// })

const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const fs = require("fs");
const path = require("path");
const compression = require("compression");

const vendorRoutes = require("./routes/vendorRoutes");
const firmRoutes = require("./routes/firmRoutes");
const productRoutes = require("./routes/productRoutes");
const buyerRoutes = require("./routes/buyerRoutes");

// dotenv.config(); // Load environment variables
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 4000;

// Middleware
app.use(cors());
app.use(express.json()); // Built-in JSON body parsing
app.use(helmet()); // Security middleware
app.use(morgan("dev")); // Logging middleware
app.use(compression()); // Compress responses for better performance

// Ensure `uploads` directory exists before serving static files
const uploadsDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
}
app.use("/uploads", express.static(uploadsDir)); // Serve static files

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log("✅ MongoDB connected successfully!"))
    .catch((error) => {
        console.error("❌ MongoDB connection error:", error);
        process.exit(1); // Stop server if DB connection fails
    });

// API Routes
app.use("/vendor", vendorRoutes);
app.use("/firm", firmRoutes);
app.use("/product", productRoutes);
app.use("/buyer", buyerRoutes);

// Root Route
app.get("/", (req, res) => {
    res.json({ message: "Welcome to SUBY API" });
});

// Global Error Handler Middleware
app.use((err, req, res, next) => {
    console.error("❌ Server Error:", err);
    res.status(500).json({ error: "Internal Server Error" });
});

// Start Server
app.listen(PORT, () => {
    console.log(`🚀 Server started and running on port ${PORT}`);
});

