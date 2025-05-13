import React from "react";
import { View, Image, Text, StyleSheet } from "react-native";

export default function PhotoScreen({ route }) {
  const { imageUri, pseudo, legend } = route.params;

  return (
    <View style={styles.container}>
      <Image source={{ uri: imageUri }} style={styles.image} />
      <Text style={styles.legend}>{legend}</Text>
      <Text style={styles.pseudo}>par {pseudo}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "black", justifyContent: "center", alignItems: "center" },
  image: { width: "100%", height: "80%", resizeMode: "contain" },
  legend: { color: "white", fontSize: 18, marginTop: 10 },
  pseudo: { color: "#aaa", fontSize: 14 },
});
