const express = require("express");
const router = express.Router();
const pool = require("../db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

router.post("/signup", async (req, res) => {
  const { email, firstname, password } = req.body;

  try {
    // Vérifie si l'email existe déjà
    const existing = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
    if (existing.rows.length > 0) {
      return res.status(409).json({ error: "Email déjà utilisé." });
    }

    // Hash du mot de passe
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insertion en base de données
    const result = await pool.query(
      "INSERT INTO users (email, firstname, password_hash) VALUES ($1, $2, $3) RETURNING id, firstname",
      [email, firstname, hashedPassword]
    );

    const user = result.rows[0];

    // Création d’un token JWT
    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    // Réponse au frontend
    res.status(201).json({ token, firstname: user.firstname });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erreur serveur lors de l’inscription." });
  }
});

module.exports = router;
