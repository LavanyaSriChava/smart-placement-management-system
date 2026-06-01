const express = require("express");
const router = express.Router();

const authController =
require("../controllers/authController");

const authenticate =
require("../middleware/authMiddleware");
const authorize =
require("../middleware/roleMiddleware");

router.get(
    "/student",
    authenticate,
    authorize("student"),
    (req, res) => {
        res.json({
            message: "Student Dashboard"
        });
    }
);

router.get(
    "/admin",
    authenticate,
    authorize("admin"),
    (req, res) => {
        res.json({
            message: "Admin Dashboard"
        });
    }
);
router.get("/test", (req, res) => {
    res.json({
        message: "Auth Service Working"
    });
});

router.post(
    "/register",
    authController.register
);

router.post(
    "/login",
    authController.login
);

router.get(
    "/profile",
    authenticate,
    (req, res) => {
        res.json({
            message: "Protected Route",
            user: req.user
        });
    }
);

module.exports = router;