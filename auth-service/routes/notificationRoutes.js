const express = require("express");
const router = express.Router();
console.log("Notification routes loaded");
const notificationController =
require("../controllers/notificationController");

router.post(
    "/",
    notificationController.createNotification
);

router.get(
    "/user/:userId",
    notificationController.getNotifications
);

router.put(
    "/read/:id",
    notificationController.markAsRead
);

router.delete(
    "/:id",
    notificationController.deleteNotification
);
router.get("/test", (req, res) => {
    res.json({
        message: "Notification Route Working"
    });
});

module.exports = router;