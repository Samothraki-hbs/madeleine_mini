import { Text } from 'react-native';

export default function ProfilMessage(props) {
    return(
    <Text style={{ fontSize : 18}}>
        Bienvenue {props.prenom} ! Tu es bien sur ton profil, ta ville est {props.ville}

    </Text>
    );
}