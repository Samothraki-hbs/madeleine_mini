import * as Font from 'expo-font';

export default function useCustomFonts() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    Font.loadAsync({
      'Poppins-Regular': require('../assets/fonts/Poppins-Regular.ttf'),
      'Poppins-Bold': require('../assets/fonts/Poppins-Bold.ttf'),
    }).then(() => setLoaded(true));
  }, []);

  return loaded;
}
