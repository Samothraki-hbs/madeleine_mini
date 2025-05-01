import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from "react-native";

// Vérification de l’email avec une expression régulière
function validerEmail(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

export default function Accueil({ navigation }) {
  const [email, setEmail] = useState("");
  const [pseudo, setPseudo] = useState("");
  const [password, setPassword] = useState("");
  const [confirmation, setConfirmation] = useState("");

  // ✅ Fonction de validation avant envoi
  const validerInscription = () => {
    console.log("📌 [validerInscription] Début de la validation");
  
    if (!validerEmail(email)) {
      console.log("❌ Email invalide :", email);
      Alert.alert("Erreur", "Adresse email invalide");
      return;
    }
  
    if (pseudo.length < 5) {
      console.log("❌ Pseudo trop court :", pseudo);
      Alert.alert("Erreur", "Le pseudo doit contenir au moins 5 caractères");
      return;
    }
  
    if (password !== confirmation) {
      console.log("❌ Mots de passe différents");
      Alert.alert("Erreur", "Les mots de passe ne correspondent pas");
      return;
    }
  
    console.log("✅ Validation réussie, on appelle handleSignup()");
    handleSignup();
  };
  
  const handleSignup = async () => {
    console.log("📡 [handleSignup] Envoi de la requête au backend...");
    /* ici le problème */
    try {
      const response = await fetch("http://192.168.0.12:4000/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          pseudo,
          password,
        }),
      });
  
      console.log("✅ Requête envoyée, en attente de réponse...");
  
      const data = await response.json();
  
      console.log("📨 Réponse reçue :", data);
  
      if (response.ok) {
        Alert.alert("Succès", "Inscription réussie !");
        console.log("✅ Inscription réussie, navigation...");
        navigation.navigate("AccueilUtilisateur", { pseudo });
      } else {
        console.log("❌ Erreur API :", data.error);
        Alert.alert("Erreur", data.error || "Erreur lors de l’inscription");
      }
    } catch (error) {
      console.log("🔥 Erreur réseau :", error.message);
      Alert.alert("Erreur", "Impossible de contacter le serveur.");
    }
  };
  
  // ✅ Requête HTTP vers ton backend Express

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <View style={styles.container}>
        <Text style={styles.title}>Inscription</Text>

        <TextInput
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          placeholder="Entrez votre adresse email"
          keyboardType="email-address"
        />

        <TextInput
          style={styles.input}
          value={pseudo}
          onChangeText={setPseudo}
          placeholder="Choisissez un pseudo"
        />

        <TextInput
          style={styles.input}
          value={password}
          onChangeText={setPassword}
          placeholder="Mot de passe"
          secureTextEntry={true}
        />

        <TextInput
          style={styles.input}
          value={confirmation}
          onChangeText={setConfirmation}
          placeholder="Confirmez le mot de passe"
          secureTextEntry={true}
        />

        <TouchableOpacity style={styles.button} onPress={validerInscription}>
          <Text style={styles.buttonText}>Créer mon compte</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#f4f4f4",
    flex: 1,
    justifyContent: "center",
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 30,
    textAlign: "center",
    color: "#333",
  },
  input: {
    backgroundColor: "white",
    padding: 12,
    marginBottom: 15,
    borderRadius: 8,
    borderColor: "#ccc",
    borderWidth: 1,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 1,
  },
  button: {
    backgroundColor: "#3498db",
    padding: 14,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
});
