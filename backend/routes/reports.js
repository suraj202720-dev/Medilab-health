const express = require("express");
const router = express.Router();
const reportController = require("../controllers/reportController");

// GET user reports
router.get("/", reportController.getUserReports);

module.exports = router;
