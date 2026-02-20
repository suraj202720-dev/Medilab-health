const express = require("express");
const router = express.Router();
const db = require("../config/db");

// =====================
// SEND OTP
// =====================
router.post("/send-otp", (req, res) => {
    const { mobile } = req.body;

    // validation
    if (!/^[6-9]\d{9}$/.test(mobile)) {
        return res.status(400).json({ message: "Invalid mobile number" });
    }

    const otp = Math.floor(100000 + Math.random() * 900000);
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000);

    db.query(
        "INSERT INTO customer_otps (mobile, otp, expires_at) VALUES (?, ?, ?)",
        [mobile, otp, expiresAt],
        (err) => {
            if (err) {
                console.error("OTP INSERT ERROR:", err);
                return res.status(500).json({ message: "DB error" });
            }

            // SMS gateway baad me
            console.log("OTP (demo):", otp);

            res.json({ success: true });
        }
    );
});

// =====================
// VERIFY OTP
// =====================
router.post("/verify-otp", (req, res) => {
    const { mobile, otp } = req.body;

    if (!otp || otp.length !== 6) {
        return res.status(400).json({ message: "Invalid OTP format" });
    }

    db.query(
        `SELECT * FROM customer_otps
         WHERE mobile=? AND otp=? AND is_used=0 AND expires_at > NOW()`,
        [mobile, otp],
        (err, rows) => {
            if (err) {
                console.error("OTP VERIFY ERROR:", err);
                return res.status(500).json({ message: "DB error" });
            }

            if (!rows || rows.length === 0) {
                return res.status(400).json({ message: "Invalid or expired OTP" });
            }

            // mark OTP used
            db.query(
                "UPDATE customer_otps SET is_used=1 WHERE id=?",
                [rows[0].id]
            );

            // 🔐 SESSION SET
            req.session.customer = {
                mobile: mobile,
                loginTime: new Date(),
            };

            res.json({ success: true });
        }
    );
});

module.exports = router;

// =====================
// CHECK LOGIN STATUS
// =====================
router.get("/me", (req, res) => {
    if (req.session.customer) {
        return res.json({
            loggedIn: true,
            customer: req.session.customer
        });
    } else {
        return res.json({ loggedIn: false });
    }
});
