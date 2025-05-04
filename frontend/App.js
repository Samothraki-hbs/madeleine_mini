import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Accueil from './screens/Accueil';
import Connexion from './screens/connexion'
import AccueilUtilisateur from './screens/AccueilUtilisateur'; 

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Accueil" component={Accueil} />
        <Stack.Screen name="AccueilUtilisateur" component={AccueilUtilisateur} />
        <Stack.Screen name="Connexion" component={Connexion} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
