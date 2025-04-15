const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express(); // ← Initialisation du serveur

// Middlewares
app.use(cors());
app.use(express.json());

// Import des routes
const authRoutes = require("./routes/auth");

// Routes
app.use("/api", authRoutes);

// Lancement du serveur
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});

// Test de connexion à PostgreSQL
const pool = require("./db");

(async () => {
  try {
    const res = await pool.query("SELECT NOW()");
    console.log("✅ Connexion à PostgreSQL réussie :", res.rows[0]);
  } catch (err) {
    console.error("❌ Erreur de connexion à PostgreSQL :", err);
  }
})();

