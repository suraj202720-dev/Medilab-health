const db = require("../config/db");
console.log("DB loaded:", db);

// =======================
// POST: form submit
// =======================
exports.addContactRequest = (req, res) => {
    try {
        console.log("📩 addContactRequest HIT");
        console.log("BODY:", req.body);

        const { name, phone, email, message } = req.body;

        if (!name || !phone) {
            return res.status(400).json({
                success: false,
                message: "Name and phone required"
            });
        }

        const sql =
            "INSERT INTO contact_requests (name, phone, email, message) VALUES (?, ?, ?, ?)";

        db.query(sql, [name, phone, email, message], (err, result) => {
            if (err) {
                console.error("❌ contact_requests DB error:", err);
                return res.status(500).json({
                    success: false,
                    error: err.message
                });
            }

            res.json({
                success: true,
                message: "Form submitted successfully",
                id: result.insertId
            });
        });

    } catch (error) {
        console.error("❌ Unexpected error (addContactRequest):", error);
        res.status(500).json({ success: false, error: "Unexpected server error" });
    }
};

// =======================
// GET: admin panel
// =======================
exports.getAllContactRequests = (req, res) => {
    try {
        console.log("📋 getAllContactRequests HIT");

        const sql = "SELECT * FROM contact_requests ORDER BY created_at DESC";

        db.query(sql, (err, rows) => {
            if (err) {
                console.error("❌ getAllContactRequests DB error:", err);
                return res.status(500).json({
                    success: false,
                    error: err.message
                });
            }

            res.json({
                success: true,
                data: rows
            });
        });

    } catch (error) {
        console.error("❌ Unexpected error (getAllContactRequests):", error);
        res.status(500).json({ success: false, error: "Unexpected server error" });
    }
};

// =======================
// UPDATE status
// =======================
exports.updateContactStatus = (req, res) => {
    try {
        console.log("✏️ updateContactStatus HIT");
        console.log("PARAMS:", req.params);
        console.log("BODY:", req.body);

        const { id } = req.params;
        const { status } = req.body;

        const sql = "UPDATE contact_requests SET status=? WHERE id=?";

        db.query(sql, [status, id], (err, result) => {
            if (err) {
                console.error("❌ updateContactStatus DB error:", err);
                return res.status(500).json({
                    success: false,
                    error: err.message
                });
            }

            if (result.affectedRows === 0) {
                return res.status(404).json({
                    success: false,
                    message: "Contact not found"
                });
            }

            res.json({
                success: true,
                message: "Status updated successfully"
            });
        });

    } catch (error) {
        console.error("❌ Unexpected error (updateContactStatus):", error);
        res.status(500).json({ success: false, error: "Unexpected server error" });
    }
};

// =======================
// SOFT DELETE
// =======================
exports.deleteContact = (req, res) => {
    try {
        console.log("🗑 deleteContact HIT");
        console.log("PARAMS:", req.params);

        const { id } = req.params;

        const sql = "UPDATE contact_requests SET status='Deleted' WHERE id=?";

        db.query(sql, [id], (err, result) => {
            if (err) {
                console.error("❌ deleteContact DB error:", err);
                return res.status(500).json({
                    success: false,
                    error: err.message
                });
            }

            if (result.affectedRows === 0) {
                return res.status(404).json({
                    success: false,
                    message: "Contact not found"
                });
            }

            res.json({
                success: true,
                message: "Contact soft-deleted"
            });
        });

    } catch (error) {
        console.error("❌ Unexpected error (deleteContact):", error);
        res.status(500).json({ success: false, error: "Unexpected server error" });
    }
};


// =====================================================
// ADD-ON: DOCTOR CONSULTATION REQUEST (SAFE + FINAL)
// =====================================================
exports.addDoctorConsultation = (req, res) => {
    try {
        console.log("🩺 doctor-consultation API HIT");
        console.log("BODY:", req.body);

        const { doctor_name, speciality } = req.body;

        if (!doctor_name || !speciality) {
            return res.status(400).json({
                success: false,
                message: "Doctor name and speciality required"
            });
        }

        const sql =
            "INSERT INTO doctor_consultations (doctor_name, speciality) VALUES (?, ?)";

        db.query(sql, [doctor_name, speciality], (err, result) => {
            if (err) {
                console.error("❌ doctor_consultations DB error:", err);
                return res.status(500).json({
                    success: false,
                    error: err.message
                });
            }

            res.json({
                success: true,
                message: "Doctor consultation request saved",
                id: result.insertId
            });
        });

    } catch (error) {
        console.error("❌ Unexpected error (addDoctorConsultation):", error);
        res.status(500).json({
            success: false,
            error: "Unexpected server error"
        });
    }
};
