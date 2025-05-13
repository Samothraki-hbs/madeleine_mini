
import React, { useEffect } from 'react';
import { View, ActivityIndicator, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BACKEND_URL, DEV_MODE, FAKE_USER } from '../config'; // adapte le chemin

export default function LoadingScreen({ navigation }) {
  useEffect(() => {
    const init = async () => {
      if (DEV_MODE) {
        console.log("👨‍💻 Mode développeur activé");
        navigation.replace("Accueil", FAKE_USER);
        return;
      }

      try {
        const token = await AsyncStorage.getItem("token");
        if (!token) {
          navigation.replace("Connexion");
          return;
        }

        const response = await fetch(`${BACKEND_URL}/api/users`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          navigation.replace("Connexion");
          return;
        }

        const user = await response.json();
        navigation.replace("Accueil", {
          email: user.email,
          pseudo: user.pseudo,
        });
      } catch (error) {
        console.error("Erreur lors de la vérification du token :", error);
        Alert.alert("Erreur", "Impossible de vérifier votre session.");
        navigation.replace("Connexion");
      }
    };

    init();
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <ActivityIndicator size="large" />
    </View>
  );
}
