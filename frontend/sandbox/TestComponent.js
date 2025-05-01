import { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";

export default function CarteBienvenue() {
  const [prenom, setPrenom] = useState("");
  const [afficher, setAfficher] = useState(false);

  const valider = () => {
    setAfficher(true);
  };


  return (
    <View style={styles.container}>
      {!afficher ? (
        <>
          <TextInput
            value={prenom}
            placeholder="Entrer votre prénom"
            onChangeText={(text) => setPrenom(text)}
            style={styles.input}
          />
          <Button title="Valider" onPress={valider} />
        </>
      ) : (

        <View style={styles.message}>
        <Text style={styles.bienvenue}>
          Bienvenue {prenom} !
        </Text>

        <Button title="Modifier" onPress={() => setAfficher(false)} />
        </View>
      )}

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  input: {
    borderWidth: 1,
    padding: 8,
    marginBottom: 10,
    borderRadius: 5,
  },
  bienvenue: {
    fontSize: 18,
    marginTop: 20,
    fontWeight: "bold",
    color: "#333",
  },
});

//comment faire un input form dans React ?

// noter directement les changements en lien avec useState

