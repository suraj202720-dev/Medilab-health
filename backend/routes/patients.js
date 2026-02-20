const express = require("express");
const router = express.Router();
const patientController = require("../controllers/patientcontroller");

// ADD patient
router.post("/", patientController.addPatient);

// GET all patients
router.get("/", patientController.getPatients);

// ✅ GET patient by ID (YE LINE ADD KARO)
router.get("/:id", patientController.getPatientById);

module.exports = router;

// UPDATE patient
router.put("/:id", patientController.updatePatient);

// DELETE patient
router.delete("/:id", patientController.deletePatient);

