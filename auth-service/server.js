const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
const cors = require("cors");

const pool = require("./config/db");

const authRoutes = require("./routes/authRoutes");
const notificationRoutes = require("./routes/notificationRoutes");
const resumeRoutes = require("./routes/resumeRoutes");
const app = express();

// Database Connection
pool.connect()
    .then(() => {
        console.log("Database Connected");
    })
    .catch((err) => {
        console.log("Database Error:", err.message);
    });

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use(
    "/api/upload",
    resumeRoutes
);
app.use("/api/auth", authRoutes);
app.use("/api/notifications", notificationRoutes);

// Test Route
app.get("/", (req, res) => {
    res.send("Auth Service Running");
});

// Start Server
app.listen(process.env.PORT || 5000, () => {
    console.log(
        `Server running on port ${process.env.PORT || 5000}`
    );
});
