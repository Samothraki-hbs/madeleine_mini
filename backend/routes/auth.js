const express = require("express");
const router = express.Router();
const pool = require("../db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

router.post("/signup", async (req, res) => {
  const { email, pseudo, password } = req.body;

  if (!email || !pseudo || !password) {
    return res.status(400).json({ error: "Champs manquants" });
  }

  if (pseudo.length < 5) {
    return res.status(400).json({ error: "Le pseudo doit contenir au moins 5 caractères." });
  }

  try {
    // Vérifier l'unicité email et pseudo
    const existingUser = await pool.query(
      "SELECT * FROM users WHERE email = $1 OR pseudo = $2",
      [email, pseudo]
    );

    if (existingUser.rows.length > 0) {
      return res.status(409).json({ error: "Email ou pseudo déjà utilisé." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await pool.query(
      "INSERT INTO users (email, pseudo, password_hash) VALUES ($1, $2, $3) RETURNING id, pseudo",
      [email, pseudo, hashedPassword]
    );

    const user = result.rows[0];
    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res.status(201).json({ token, pseudo: user.pseudo });
  } catch (err) {
    console.error("Erreur lors de l’inscription :", err);
    res.status(500).json({ error: "Erreur serveur" });
  }
});

router.post("/login", async (req, res) => {
    const { email, password } = req.body;
  
    // Vérification des champs
    if (!email || !password) {
      return res.status(400).json({ error: "Champs manquants" });
    }
  
    try {
      // Recherche de l'utilisateur par email
      const result = await pool.query(
        "SELECT * FROM users WHERE email = $1",
        [email]
      );
  
      if (result.rows.length === 0) {
        return res.status(401).json({ error: "Email ou mot de passe incorrect" });
      }
  
      const user = result.rows[0];
  
      // Vérification du mot de passe
      const isPasswordValid = await bcrypt.compare(password, user.password_hash);
      if (!isPasswordValid) {
        return res.status(401).json({ error: "Email ou mot de passe incorrect" });
      }
  
      // Génération du token
      const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
        expiresIn: "1d",
      });
  
      res.status(200).json({ token, pseudo: user.pseudo });
    } catch (err) {
      console.error("❌ Erreur lors de la connexion :", err);
      res.status(500).json({ error: "Erreur serveur" });
    }
  });
  

module.exports = router;
