const express = require("express");
const dotEnv = require('dotenv');
const mongoose = require('mongoose');
const vendorRoutes = require('./routes/vendorRoutes');
const bodyParser = require('body-parser');

const firmRoutes = require('./routes/firmRoutes');
const productRoutes = require('./routes/productRoutes');
const buyerRoutes = require('./routes/buyerRoutes');


const cors = require('cors');
const path = require('path')

const app = express()

const PORT = process.env.PORT || 4000;

dotEnv.config();
app.use(cors())

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDB connected successfully!"))
    .catch((error) => console.log(error))

app.use(bodyParser.json());
app.use('/vendor', vendorRoutes);
app.use('/firm', firmRoutes)
app.use('/product', productRoutes);
app.use('/uploads', express.static('uploads'));
app.use('/buyer', buyerRoutes);

app.listen(PORT, () => {
    console.log(`server started and running at ${PORT}`);
});

app.use('/', (req, res) => {
    res.send("<h1> Welcome to SUBY");
})

// const express = require("express");
// const dotenv = require("dotenv");
// const mongoose = require("mongoose");
// const cors = require("cors");
// const helmet = require("helmet");
// const morgan = require("morgan");
// const fs = require("fs");
// const path = require("path");
// const compression = require("compression");

// const vendorRoutes = require("./routes/vendorRoutes");
// const firmRoutes = require("./routes/firmRoutes");
// const productRoutes = require("./routes/productRoutes");
// const buyerRoutes = require("./routes/buyerRoutes");

// const orderRoutes = require("./routes/orderRoutes"); // ✅ Add this if missing




// // dotenv.config(); // Load environment variables
// require('dotenv').config();

// const app = express();
// const PORT = process.env.PORT || 4000;

// // Middleware
// app.use(cors());
// app.use(express.json()); // Built-in JSON body parsing
// app.use(helmet()); // Security middleware
// app.use(morgan("dev")); // Logging middleware
// app.use(compression()); // Compress responses for better performance

// // Ensure `uploads` directory exists before serving static files
// const uploadsDir = path.join(__dirname, "uploads");
// if (!fs.existsSync(uploadsDir)) {
//     fs.mkdirSync(uploadsDir, { recursive: true });
// }
// app.use("/uploads", express.static(uploadsDir)); // Serve static files

// // MongoDB Connection
// mongoose.connect(process.env.MONGO_URI, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
// })
//     .then(() => console.log("✅ MongoDB connected successfully!"))
//     .catch((error) => {
//         console.error("❌ MongoDB connection error:", error);
//         process.exit(1); // Stop server if DB connection fails
//     });

// // API Routes
// app.use("/vendor", vendorRoutes);
// app.use("/firm", firmRoutes);
// app.use("/product", productRoutes);
// app.use("/buyer", buyerRoutes);

// app.use("/orders", orderRoutes);

// // Root Route
// app.get("/", (req, res) => {
//     res.json({ message: "Welcome to SUBY API" });
// });

// // Global Error Handler Middleware
// app.use((err, req, res, next) => {
//     console.error("❌ Server Error:", err);
//     res.status(500).json({ error: "Internal Server Error" });
// });

// // Start Server
// app.listen(PORT, () => {
//     console.log(`🚀 Server started and running on port ${PORT}`);
// });

// const express = require("express");
// const dotenv = require("dotenv");
// const mongoose = require("mongoose");
// const cors = require("cors");
// const helmet = require("helmet");
// const morgan = require("morgan");
// const fs = require("fs");
// const path = require("path");
// const compression = require("compression");
// const http = require("http");
// const WebSocket = require("ws");
// const jwt = require("jsonwebtoken");

// const vendorRoutes = require("./routes/vendorRoutes");
// const firmRoutes = require("./routes/firmRoutes");
// const productRoutes = require("./routes/productRoutes");
// const buyerRoutes = require("./routes/buyerRoutes");
// const orderRoutes = require("./routes/orderRoutes");

// const app = express();
// const server = http.createServer(app);
// const wss = new WebSocket.Server({ server });
// const SECRET_KEY = process.env.SECRET_KEY || "your_secret_key";

// dotenv.config();
// const PORT = process.env.PORT || 4000;

// // Middleware
// app.use(cors());
// app.use(express.json());
// app.use(helmet());
// app.use(morgan("dev"));
// app.use(compression());

// // Ensure `uploads` directory exists before serving static files
// const uploadsDir = path.join(__dirname, "uploads");
// if (!fs.existsSync(uploadsDir)) {
//     fs.mkdirSync(uploadsDir, { recursive: true });
// }
// app.use("/uploads", express.static(uploadsDir));

// // MongoDB Connection
// mongoose.connect(process.env.MONGO_URI, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
// })
//     .then(() => console.log("✅ MongoDB connected successfully!"))
//     .catch((error) => {
//         console.error("❌ MongoDB connection error:", error);
//         process.exit(1);
//     });

// // API Routes
// app.use("/vendor", vendorRoutes);
// app.use("/firm", firmRoutes);
// app.use("/product", productRoutes);
// app.use("/buyer", buyerRoutes);
// app.use("/orders", orderRoutes);

// // Store active connections
// const users = {};

// // WebSocket connection handling for buyer-farmer chat with authentication
// wss.on("connection", (ws, req) => {
//     const params = new URLSearchParams(req.url.split("?")[1]);
//     const token = params.get("token");
    
//     if (!token) {
//         ws.send(JSON.stringify({ error: "Authentication required" }));
//         ws.close();
//         return;
//     }
    
//     try {
//         const user = jwt.verify(token, SECRET_KEY);
//         const userId = user.id;
//         users[userId] = ws;
//         console.log(`User ${userId} connected`);

//         ws.on("message", (message) => {
//             try {
//                 const { to, text } = JSON.parse(message);
//                 if (users[to]) {
//                     users[to].send(JSON.stringify({ from: userId, text }));
//                 } else {
//                     ws.send(JSON.stringify({ error: "Recipient not available" }));
//                 }
//             } catch (err) {
//                 ws.send(JSON.stringify({ error: "Invalid message format" }));
//             }
//         });

//         ws.on("close", () => {
//             delete users[userId];
//             console.log(`User ${userId} disconnected`);
//         });
//     } catch (err) {
//         ws.send(JSON.stringify({ error: "Invalid token" }));
//         ws.close();
//     }
// });

// // Root Route
// app.get("/", (req, res) => {
//     res.json({ message: "Welcome to SUBY API" });
// });

// // Global Error Handler Middleware
// app.use((err, req, res, next) => {
//     console.error("❌ Server Error:", err);
//     res.status(500).json({ error: "Internal Server Error" });
// });

// // Start Server
// server.listen(PORT, () => {
//     console.log(`🚀 Server started and running on port ${PORT}`);
// });