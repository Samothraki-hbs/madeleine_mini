import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, Alert } from "react-native";

// Remplacer cette IP par celle d'Arthur
const API_URL = "http://10.17.1.239:4000/api/signup";

export default function SignupScreen() {
  const [email, setEmail] = useState("");
  const [firstname, setFirstname] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = async () => {
    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, firstname, password }),
      });

      const data = await res.json();

      if (res.status === 201) {
        Alert.alert("Inscription réussie", `Bienvenue ${data.firstname} !`);
      } else {
        Alert.alert("Erreur", data.error || "Une erreur est survenue");
      }
    } catch (err) {
      Alert.alert("Erreur", "Impossible de contacter le serveur");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Inscription</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        onChangeText={setEmail}
        value={email}
      />
      <TextInput
        style={styles.input}
        placeholder="Prénom"
        onChangeText={setFirstname}
        value={firstname}
      />
      <TextInput
        style={styles.input}
        placeholder="Mot de passe"
        secureTextEntry
        onChangeText={setPassword}
        value={password}
      />
      <Button title="S'inscrire" onPress={handleSignup} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: "center",
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 6,
    padding: 12,
    marginBottom: 12,
  },
});
