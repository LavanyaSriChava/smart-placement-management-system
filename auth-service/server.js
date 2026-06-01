const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const pool = require("./config/db");
dotenv.config();

const app = express();
pool.connect()
    .then(() => {
        console.log("Database Connected");
    })
    .catch((err) => {
        console.log("Database Error:", err.message);
    });
app.use(cors());
app.use(express.json());

const authRoutes = require("./routes/authRoutes");

app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
    res.send("Auth Service Running");
});

app.listen(process.env.PORT || 5000, () => {
    console.log(`Server running on port ${process.env.PORT || 5000}`);
});
