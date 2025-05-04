import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  Platform
} from "react-native";
import { BACKEND_URL } from "../config"; // j'appelle ma fonction Backend url pour me connecter au serveur, depuis ma page config

export default function Connexion({ navigation }) { //navigation doit être passé en argument ici afin de pouvoir naviguer entre les différentes pages 
  const [email, setEmail] = useState("");
  const [motDePasse, setMotDePasse] = useState("");

  const seConnecter = async () => {
    if (!email || !motDePasse) {
      Alert.alert("Erreur", "Merci de remplir tous les champs."); // pourquoi utiliser Alert.alert et non alert tout court ?
      return;
    }

    try {
      const response = await fetch(`${BACKEND_URL}/login`, { // fetch permet d'envoyer une requête HTTP vers un serveur
        method: "POST", // ici, la méthode que j'utilise est POST : je veux envoyer des données 
        headers: { "Content-Type": "application/json" }, // j'indique au serveur que j'envoie mes données en JSON
        body: JSON.stringify({ email, motDePasse }), // je transforme mes données en une chaîne de caractères ! 
      });

      const data = await response.json(); /* pourquoi transformer la requête en JSON  ? Réponse : cela permet d'ouvrir
      le contenu de l'enveloppe que j'ai envoyé. Sans cela, je tombe sur une erreur */

      if (response.ok) { /* response.ok a un lien avec fetch, et réponds true et false */
        navigation.navigate("AccueilUtilisateur", {
          mail: email,
          pseudo: data.pseudo,
          motDePasse,
        });
      } else {
        Alert.alert("Erreur", data.message || "Identifiants incorrects."); /* à quoi correspond data.message ici ? */
      }
    } catch (err) { /* à quoi sert la fonction catch et qu'est ce que j'essaye d'attraper ? */
      console.error(err);
      Alert.alert("Erreur réseau", "Impossible de se connecter au serveur."); // Alert.alert est typique du reactnative 
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    > 
      <View style={styles.container}>
        <Text style={styles.title}>Connexion</Text> 

        <TextInput
          style={styles.input}
          placeholder="Adresse email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />

        <TextInput
          style={styles.input}
          placeholder="Mot de passe"
          value={motDePasse}
          onChangeText={setMotDePasse}
          secureTextEntry
        />

        <TouchableOpacity style={styles.button} onPress={seConnecter}>
          <Text style={styles.buttonText}>Se connecter</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate("Accueil")}> 
          <Text style={styles.switch}>Pas encore de compte ? S’inscrire</Text>
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
  },
  button: {
    backgroundColor: "#2ecc71",
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
  switch: {
    color: "#3498db",
    textAlign: "center",
    marginTop: 20,
  },
});
