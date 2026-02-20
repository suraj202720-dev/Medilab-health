const express = require("express");
const router = express.Router();
const contactController = require("../controllers/contactController");

// =======================
// CREATE contact (form submit)
// =======================
router.post("/", contactController.addContactRequest);

// =======================
// GET all contacts (admin panel)
// =======================
router.get("/", contactController.getAllContactRequests);

// =======================
// UPDATE status (New / Called / Done)
// =======================
router.put("/:id/status", contactController.updateContactStatus);

// =======================
// DELETE contact
// =======================
router.delete("/:id", contactController.deleteContact);

/* =====================================================
   ADD-ON: DOCTOR CONSULTATION REQUEST
   (sirf add hua hai, kuch bhi remove/change nahi)
===================================================== */
router.post(
    "/doctor-consultation",
    contactController.addDoctorConsultation
);

module.exports = router;
