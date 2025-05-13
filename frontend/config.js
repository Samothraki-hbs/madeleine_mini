// config.js

// Adresse du backend d'Arthur
export const ARTHUR_URL = "http://192.168.0.12:4000";

// Mon backend

const MY_LOCAL_IP = "http://192.168.0.12:4000";

const USE_MY_BACKEND = true;

export const BACKEND_URL = USE_MY_BACKEND ? MY_LOCAL_IP : ARTHUR_IP;

// 🧪 Activer le mode développeur local
export const DEV_MODE = __DEV__; // ou true si tu veux forcer

// 🧑‍💻 Utilisateur de test (uniquement utilisé en DEV)
export const FAKE_USER = {
  email: "dev@local.test",
  pseudo: "TesteurLocal",
};
