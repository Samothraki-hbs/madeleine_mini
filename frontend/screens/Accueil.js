import React, { useState } from 'react';
import {
  View,
  Text,
  Button,
  Image,
  Alert,
  StyleSheet,
  ScrollView, // ✅ import ScrollView
} from 'react-native';
import { useNavigation } from "@react-navigation/native";
import * as ImagePicker from 'expo-image-picker';

export default function Accueil({ route }) {
  const { email, pseudo } = route.params;
  const [imageUri, setImageUri] = useState(null);
  const navigation = useNavigation();

  const pickImage = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permissionResult.granted) {
      Alert.alert("Permission refusée", "L'application a besoin d'accéder à votre galerie.");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });

    if (!result.canceled) {
      setImageUri(result.assets[0].uri);
    }
  };

  // 🧪 Affiche le lien de l’image sélectionnée dans la console
  console.log("imageUri :", imageUri);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.titre}>Bienvenue {pseudo} !</Text>

      <Text style={styles.label}>Adresse email :</Text>
      <Text style={styles.value}>{email}</Text>

      <View style={styles.separator} />

      <Button title="Choisir une image" onPress={pickImage} />

      {imageUri && (
        <>
          <Text style={styles.label}>Prévisualisation :</Text>
          <Image source={{ uri: imageUri }} style={styles.image} />
          <View style={{ alignItems: "center", marginTop: 30 }}>
            <Text style={styles.label}>Voir en plein écran :</Text>
            <Button
              title="Afficher"
              onPress={() =>
                navigation.navigate("Photo", {
                  imageUri: imageUri,
                  pseudo: pseudo,
                  legend: "Photo sélectionnée",
                })
              }
            />
          </View>
        </>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'flex-start',
    flexGrow: 1,
  },
  titre: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',
  },
  label: {
    fontWeight: '600',
    marginTop: 15,
    color: '#555',
  },
  value: {
    marginBottom: 10,
    fontSize: 16,
    color: '#111',
  },
  image: {
    width: 300,
    height: 300,
    marginVertical: 15,
    borderRadius: 10,
  },
  separator: {
    height: 1,
    backgroundColor: '#ccc',
    marginVertical: 20,
    width: "100%",
  },
});
