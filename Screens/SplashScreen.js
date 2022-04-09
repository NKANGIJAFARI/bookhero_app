import React, { useEffect } from 'react';
import { Image, View } from 'react-native';
import { onAuthStateChanged } from '@firebase/auth';
import { auth } from '../firebase';
import { addUserToStore } from '../Redux/Slices/UserSlice';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';

const SplashScreen = () => {
  const { user } = useSelector((state) => state.UserState);
  const navigation = useNavigation();
  const dispatch = useDispatch();

  useEffect(() => {
    //First check if user ever logged in before, if not, go to login screen

    const unSubscribe = onAuthStateChanged(auth, async (authUser) => {
      const isLoggedInBefore = await AsyncStorage.getItem('isLoggedInBefore');

      if (authUser) {
        const idToken = await auth.currentUser.getIdTokenResult();
        const userObject = {
          displayName: authUser.displayName,
          email: authUser.email,
          photoURL: authUser.photoURL,
          uid: authUser.uid,
          authenticated: true,
          isAdmin: idToken.claims.admin ? true : false,
        };

        addUserToStore(userObject);
        dispatch(addUserToStore(userObject));

        navigation.reset({
          index: 0,
          routes: [{ name: 'BottomTabScreen' }],
        });
      } else {
        navigation.reset({
          index: 0,
          routes: [{ name: 'Welcome' }],
        });
      }
    });

    return unSubscribe;
  }, []);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <Image
        source={require('../assets/images/icon.png')}
        style={{ height: 100.0, width: 600.0, borderRadius: 70.0 }}
        resizeMode='contain'></Image>
    </View>
  );
};

export default SplashScreen;
