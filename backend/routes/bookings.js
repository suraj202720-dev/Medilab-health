// routes/bookings.js
const express = require("express");
const router = express.Router();
const db = require("../config/db");

// ==================================================
// CREATE BOOKING (FROM medilab.html)
// ==================================================
router.post("/", (req, res) => {
    console.log("📥 Booking Request Body:", req.body);

    const { patient_name, mobile, tests, total } = req.body;

    // ✅ VALIDATION
    if (!patient_name || !mobile || !tests || !total) {
        return res.status(400).json({
            success: false,
            message: "Missing booking fields"
        });
    }

    const sql = `
        INSERT INTO bookings (patient_name, mobile, tests, total, status)
        VALUES (?, ?, ?, ?, 'New')
    `;

    db.query(
        sql,
        [
            patient_name,
            mobile,
            Array.isArray(tests) ? tests.join(", ") : tests,
            total
        ],
        (err, result) => {
            if (err) {
                console.error("❌ Booking Insert Error:", err);
                return res.status(500).json({
                    success: false,
                    message: "Database error"
                });
            }

            res.json({
                success: true,
                booking_id: result.insertId
            });
        }
    );
});

// ==================================================
// GET ALL BOOKINGS (ADMIN PANEL)
// ==================================================
router.get("/", (req, res) => {
    const sql = `
        SELECT *
        FROM bookings
        ORDER BY id DESC
    `;

    db.query(sql, (err, rows) => {
        if (err) {
            console.error("❌ Booking Fetch Error:", err);
            return res.status(500).json({
                success: false,
                message: "Database error"
            });
        }

        res.json(rows);
    });
});

// ==================================================
// UPDATE BOOKING STATUS (New → Called → Done)
// ==================================================
router.put("/:id/status", (req, res) => {
    const { status } = req.body;
    const { id } = req.params;

    const sql = `
        UPDATE bookings
        SET status = ?
        WHERE id = ?
    `;

    db.query(sql, [status, id], (err) => {
        if (err) {
            console.error("❌ Status Update Error:", err);
            return res.status(500).json({ success: false });
        }
        res.json({ success: true });
    });
});

// ==================================================
// DELETE BOOKING (SOFT DELETE)
// ==================================================
router.delete("/:id", (req, res) => {
    const { id } = req.params;

    const sql = `
        UPDATE bookings
        SET status = 'Deleted'
        WHERE id = ?
    `;

    db.query(sql, [id], (err) => {
        if (err) {
            console.error("❌ Booking Delete Error:", err);
            return res.status(500).json({ success: false });
        }
        res.json({ success: true });
    });
});

module.exports = router;
