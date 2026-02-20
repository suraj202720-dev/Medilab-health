const mysql = require("mysql2");

/* =========================
   DB CONNECTION POOL
========================= */
const db = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "#Suraj2005",
    database: "medilab",
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

/* =========================
   TEST CONNECTION (ON START)
========================= */
db.getConnection((err, connection) => {
    if (err) {
        console.error("❌ MySQL connection failed:", err.message);
    } else {
        console.log("✅ MySQL connected successfully");
        connection.release();
    }
});

/* =========================
   ADD-ON: GLOBAL QUERY ERROR LOG
   (helps debug 500 errors)
========================= */
db.on("error", (err) => {
    console.error("❌ MySQL runtime error:", err);
});

/* =========================
   ADD-ON: PROMISE SUPPORT
   (future-proof, optional)
========================= */
db.promise = () => mysql.createPool({
    host: "localhost",
    user: "root",
    password: "#Suraj2005",
    database: "medilab",
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
}).promise();

module.exports = db;
