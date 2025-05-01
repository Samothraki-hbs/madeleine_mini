import { View, Text } from 'react-native';
import ProfilMessage from '../components/ProfilMessage';


export default function Profil({route}) {
    const {ville} = route.params;
    const {prenom} = route.params;
    return(
        <View style = {{ padding : 20 }}>
            <Text style={{ fontSize: 24 }}>
                Bienvenue, ton prénom est {prenom} et tu habites à {ville} !</Text>
        </View>
    );
}


// Comment utiliser des props pour garnir un peu le profil ? 