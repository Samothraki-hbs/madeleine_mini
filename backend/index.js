console.log("🟡 Démarrage du fichier index.js");

const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connexion à PostgreSQL
const pool = require("./db");
console.log("Test pool type:", typeof pool.query); // Doit afficher "function"


(async () => {
  try {
    const res = await pool.query("SELECT NOW()");
    console.log("✅ Connexion à PostgreSQL réussie :", res.rows[0]);
  } catch (err) {
    console.error("❌ Erreur de connexion à PostgreSQL :", err);
  }
})();

// Import et utilisation des routes
const authRoutes = require("./routes/auth");

if (typeof authRoutes === "function") {
  app.use("/api", authRoutes);
} else {
  console.error("❌ Les routes n'ont pas été correctement exportées depuis routes/auth.js");
}

// Lancement du serveur
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});


