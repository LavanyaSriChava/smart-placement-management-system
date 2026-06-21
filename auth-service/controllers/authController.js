const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const axios = require("axios");
const pool = require("../config/db");
exports.register = async (req, res) => {

    try {

        const {
            name,
            email,
            password,
            role,
            cgpa,
            branch,
            backlogs,
            skills
        } = req.body;

        const existingUser = await pool.query(
            "SELECT * FROM users WHERE email = $1",
            [email]
        );

        if (existingUser.rows.length > 0) {
            return res.status(400).json({
                message: "User already exists"
            });
        }

        const hashedPassword =
            await bcrypt.hash(password, 10);

        const result = await pool.query(
    `INSERT INTO users
    (name,email,password,role,cgpa,branch,backlogs,skills)
    VALUES($1,$2,$3,$4,$5,$6,$7,$8)
    RETURNING *`,
    [
        name,
        email,
        hashedPassword,
        role,
        cgpa,
        branch,
        backlogs,
        skills
    ]
);
const savedUser = result.rows[0];
console.log("Placement URL:", process.env.PLACEMENT_SERVICE_URL);
console.log("Saved User:", savedUser);
try {
    const placementResponse = await axios.post(
        process.env.PLACEMENT_SERVICE_URL,
        {
            authUserId: savedUser.id,
            name: savedUser.name,
            email: savedUser.email,
            password: password,
            role: savedUser.role.toUpperCase(),
            cgpa: savedUser.cgpa || 0,
            branch: savedUser.branch || "",
            backlogs: savedUser.backlogs || 0,
            skills: savedUser.skills || ""
        }
    );

    console.log("Placement User Created:", placementResponse.data);

} catch (err) {
    console.log("Placement API Error:");
    console.log(err.response?.data || err.message);
}
        res.status(201).json({
            message: "User Registered Successfully"
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            message: "Server Error"
        });
    }
};
exports.login = async (req, res) => {

    try {

        const { email, password } = req.body;

        const result = await pool.query(
            "SELECT * FROM users WHERE email = $1",
            [email]
        );

        if (result.rows.length === 0) {
            return res.status(400).json({
                message: "User not found"
            });
        }

        const user = result.rows[0];

        const isMatch = await bcrypt.compare(
            password,
            user.password
        );

        if (!isMatch) {
            return res.status(400).json({
                message: "Invalid Password"
            });
        }

        const token = jwt.sign(
            {
                id: user.id,
                email: user.email,
                role: user.role
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "1h"
            }
        );

        res.json({
            message: "Login Successful",
            token
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            message: "Server Error"
        });
    }
};