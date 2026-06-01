const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {

    const { name, email, password } = req.body;

    const hashedPassword = await bcrypt.hash(
        password,
        10
    );

    res.json({
        message: "User Registered",
        user: {
            name,
            email
        },
        hashedPassword
    });
};
exports.login = async (req, res) => {

    const { email } = req.body;

    const token = jwt.sign(
        {
            email,
            role: "student"
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
};