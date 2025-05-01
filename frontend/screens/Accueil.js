import { useState } from "react";
import { View, Text, Button, TextInput, StyleSheet } from "react-native"; //importation de l'ensemble des modules qui m'intéressent


function validerEmail(email){
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; //permet de vérifier si ce que j'entre est bien un mail
    return regex.test(email)
}

export default function Accueil({navigation}) {
    const [pseudo, setPseudo] = useState("");
    const [mail, setMail] = useState("");
    const [motDePasse, setMotdepasse] = useState("");
    const [confirmation, setConfirmation] = useState("");
    /* Faire passer la fonction ici et non en dessous */
    const validerInscription = () => {

        if (!validerEmail(mail)){
            alert("Adresse email invalide.");
            return;
        }
        if (motDePasse !== confirmation) {
            alert("Les mots de passe ne correspondent pas.");
            return;
        }
    
        navigation.navigate('AccueilUtilisateur', {
            mail,
            pseudo,
            motDePasse,
        });
    };
    return(

        <View style={{ padding : 20 }}>
            <Text style={{ fontSize : 20, marginBottom : 10 }}>Bienvenue sur l'accueil !</Text>
            
            <TextInput 
                value = {mail}
                onChangeText = {(text) => setMail(text)}
                placeholder = "Entrez votre mail"
                />
        
            <TextInput 
                value = {pseudo}
                onChangeText = {(text) => setPseudo(text)}
                placeholder = "Entrez votre pseudo"
            />

            <TextInput
                value = {motDePasse}
                onChangeText = {(text) => setMotdepasse(text)}
                placeholder = "Entrez votre mot de passe"
                secureTextEntry = {true}
                 />

            <TextInput
                value = {confirmation}
                onChangeText = {(text) => setConfirmation(text)}
                placeholder = "Confirmez votre mot de passe"
                secureTextEntry = {true}

                />
    
            <Button title="Voir mon profil" onPress={validerInscription} />
        </View>
    )
}

