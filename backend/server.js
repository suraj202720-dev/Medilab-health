const express = require("express");
const cors = require("cors");
const session = require("express-session");
const path = require("path");

const app = express();

// =====================
// MIDDLEWARE
// =====================
app.use(cors({
    origin: ["http://localhost:5000"],
    credentials: true
}));

app.use(express.json({ limit: "2mb" }));
app.use(express.urlencoded({ extended: true }));

// =====================
// SESSION (CUSTOMER OTP LOGIN)
// =====================
app.use(
    session({
        name: "medilab.sid",
        secret: "medilab_secret_key",
        resave: false,
        saveUninitialized: false,
        cookie: {
            secure: false,          // localhost
            httpOnly: true,
            maxAge: 1000 * 60 * 60  // 1 hour
        }
    })
);

// =====================
// STATIC FRONTEND
// =====================
app.use(express.static(path.join(__dirname, "public")));

// =====================
// ROUTES
// =====================
const patientRoutes = require("./routes/patients");
const contactRoutes = require("./routes/contact");
const adminRoutes = require("./routes/admin");
const customerAuthRoutes = require("./routes/customerAuth");
const bookingRoutes = require("./routes/bookings");   // ✅ BOOKINGS
const reportRoutes = require("./routes/reports");

app.use("/api/patients", patientRoutes);
app.use("/api/contacts", contactRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/customer", customerAuthRoutes);
app.use("/api/bookings", bookingRoutes);               // ✅ ACTIVE
app.use("/api/reports", reportRoutes);

// =====================
// ROOT TEST
// =====================
app.get("/", (req, res) => {
    res.send("Medilab backend running 🚀");
});

// =====================
// DOCTOR CONSULTATION PAGE
// =====================
app.get("/doctor-consultation", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "doctor-consultation.html"));
});

// =====================
// PROTECTED CUSTOMER PAGE
// =====================
app.get("/medilab", (req, res) => {
    if (!req.session.customer) {
        return res.redirect("/login.html");
    }
    res.sendFile(path.join(__dirname, "public", "medilab.html"));
});

// =====================
// CUSTOMER LOGOUT
// =====================
app.get("/logout", (req, res) => {
    req.session.destroy(() => {
        res.redirect("/login.html");
    });
});

// =====================
// HEALTH CHECK
// =====================
app.get("/health", (req, res) => {
    res.json({
        status: "OK",
        server: "Medilab Backend",
        time: new Date()
    });
});

// =====================
// SERVER START
// =====================
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
