const db = require("../config/db");

// =======================
// GET: Logged-in user's reports
// =======================
exports.getUserReports = (req, res) => {

    // demo ke liye (login system ke baad req.session.user.id use hoga)
    const userId = req.session?.customer?.id || 1;

    const sql = `
        SELECT id, report_name, report_file, status, created_at
        FROM health_reports
        WHERE user_id = ?
        ORDER BY created_at DESC
    `;

    db.query(sql, [userId], (err, rows) => {
        if (err) {
            console.error("❌ health_reports error:", err);
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
};
