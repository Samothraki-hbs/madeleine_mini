import { registerRootComponent } from 'expo';

import App from './App';

// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in Expo Go or in a native build,
// the environment is set up appropriately
registerRootComponent(App);


app.listen(4000, "0.0.0.0", ()=> {
    console.log("Serveur en écoute sur le port 4000")
})