const express = require("express");
const router = express.Router();
const authenticate = require("../middleware/authMiddleware");
const upload =
require("../middleware/uploadMiddleware");

const resumeController =
require("../controllers/resumeController");

router.post(
    "/resume",
    authenticate,
    upload.single("resume"),
    resumeController.uploadResume
);
module.exports = router;