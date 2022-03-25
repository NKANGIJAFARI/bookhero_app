import { useEffect, useState } from 'react';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { AuthProvider } from './Hooks/useAuth';
import StackNavigator from './StackNavigator';
import * as Font from 'expo-font';
import { Provider } from 'react-redux';
import Store from './Redux/Store';
import { LogBox } from 'react-native';

const App = () => {
  const [fontLoaded, setFontLoaded] = useState(false);
  useEffect(() => {
    const loadFont = async () => {
      await Font.loadAsync({
        NotoSans_Bold: require('./assets/fonts/NotoSans-Bold.ttf'),

        // Any string can be used as the fontFamily name. Here we use an object to provide more control
        NotoSans_Regular: {
          uri: require('./assets/fonts/NotoSans-Regular.ttf'),
          display: Font.FontDisplay.FALLBACK,
        },
      });
    };

    loadFont().then(() => {
      setFontLoaded(true);
    });

    //This will stop the yellow warning from appearing, this is a react native bug
    LogBox.ignoreLogs([
      'Warning: Async Storage has been extracted from react-native core',
    ]);
    LogBox.ignoreLogs(['Setting a timer']);
  }, []);

  return (
    <>
      {fontLoaded && (
        <Provider store={Store}>
          <AuthProvider>
            <NavigationContainer>
              <StackNavigator />
            </NavigationContainer>
          </AuthProvider>
        </Provider>
      )}
    </>
  );
};

export default App;
