const db = require("../config/db");

// ADD patient
exports.addPatient = (req, res) => {
    const { name, age, phone } = req.body;

    const sql = "INSERT INTO patients (name, age, phone) VALUES (?, ?, ?)";
    db.query(sql, [name, age, phone], (err, result) => {
        if (err) return res.status(500).json(err);
        res.json({ message: "Patient added", id: result.insertId });
    });
};

// GET all patients
exports.getPatients = (req, res) => {
    db.query("SELECT * FROM patients", (err, rows) => {
        if (err) return res.status(500).json(err);
        res.json(rows);
    });
};

// GET patient by ID
exports.getPatientById = (req, res) => {
    const { id } = req.params;

    const sql = "SELECT * FROM patients WHERE id = ?";
    db.query(sql, [id], (err, rows) => {
        if (err) return res.status(500).json(err);

        if (rows.length === 0) {
            return res.status(404).json({ message: "Patient not found" });
        }

        res.json(rows[0]);
    });
};

// UPDATE patient
exports.updatePatient = (req, res) => {
    const { id } = req.params;
    const { name, age, phone } = req.body;

    const sql = "UPDATE patients SET name = ?, age = ?, phone = ? WHERE id = ?";
    db.query(sql, [name, age, phone, id], (err, result) => {
        if (err) return res.status(500).json(err);

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Patient not found" });
        }

        res.json({ message: "Patient updated successfully" });
    });
};

// DELETE patient
exports.deletePatient = (req, res) => {
    const { id } = req.params;

    const sql = "DELETE FROM patients WHERE id = ?";
    db.query(sql, [id], (err, result) => {
        if (err) return res.status(500).json(err);

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Patient not found" });
        }

        res.json({ message: "Patient deleted successfully" });
    });
};
