import { View, Text, StyleSheet } from "react-native";

export default function AccueilUtilisateur({ route }) {
  const { mail, pseudo, motDePasse } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.titre}>Bienvenue {pseudo} !</Text>

      <Text style={styles.label}>Adresse email :</Text>
      <Text style={styles.value}>{mail}</Text>

      <Text style={styles.label}>Mot de passe :</Text>
      <Text style={styles.token}>{motDePasse}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#fff",
    flex: 1,
    justifyContent: "center",
  },
  titre: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    color: "#333",
  },
  label: {
    fontWeight: "600",
    marginTop: 15,
    color: "#555",
  },
  value: {
    marginBottom: 10,
    fontSize: 16,
    color: "#111",
  },
  token: {
    fontSize: 12,
    fontStyle: "italic",
    color: "#888",
    marginTop: 5,
  },
});
