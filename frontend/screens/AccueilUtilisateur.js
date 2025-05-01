import { useState } from "react";
import { View, Text, Button, TextInput, StyleSheet } from "react-native";


export default function AccueilUtilisateur({route}){
    const { mail, pseudo, motDePasse } = route.params;
    return(
    <View style={styles.container}>
        <Text style={styles.titre}>Bienvenue {pseudo} !</Text>
        <Text style={styles.label}>Adresse email : </Text>
        <Text style={styles.value}>{mail}</Text>

        <Text style={styles.label}>Mot de passe :</Text>
        <Text style={styles.value}>{motDePasse}</Text>
    </View>
    );
}





/* mettre mon const avant mon return ! */
/* faire passer mon style ! */
/* mettre le const styles après */
/* mettre le style dans mon texte */

const styles = StyleSheet.create({
    container : {
        padding: 20,
    },
    titre : {
        fontSize : 24,
        fontWeight : "bold",
        marginBottom : 20,
    },

    label : {
        fontWeight: "600",
        marginTop: 10,

    },

    value : {
        marginBottom : 10,
    },
});