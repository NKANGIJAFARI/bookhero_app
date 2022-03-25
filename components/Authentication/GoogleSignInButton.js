// import React, { useState } from 'react';
import { Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Fonts, Sizes } from '../../constant/styles';
import * as Google from 'expo-google-app-auth';
import { GoogleAuthProvider, signInWithCredential } from '@firebase/auth';
import { auth } from '../../firebase';
import createUserInDB from '../../AppFunctions/createUserInDB.js';
import { useDispatch } from 'react-redux';
import { setLoading } from '../../Redux/Slices/LoadingSlice';
import {
  GOOGLE_IOS_CLIENT_ID,
  GOOGLE_ANDROID_CLIENT_ID,
  GOOGLE_EXPO_CLIENT_ID,
} from '@env';

const GoogleSignInButton = ({ text }) => {
  const dispatch = useDispatch();

  const config = {
    iosClientId: GOOGLE_IOS_CLIENT_ID,
    androidClientId: GOOGLE_ANDROID_CLIENT_ID,
    scope: ['profile', 'email'],
    Permissions: ['public_profile', 'email', 'gender', 'location'],
  };

  //SiginWithGoogle will create a user basing on their google account
  const signInWithGoogle = async () => {
    //If there is no errors, set the loading state to true
    dispatch(
      setLoading({
        isLoading: true,
        loadingMessage: 'loadding...',
        type: '',
      }),
    );
    // setLoading(true);
    await Google.logInAsync(config)
      .then(async (logInResult) => {
        if (logInResult.type === 'success') {
          const { idToken, accessToken } = logInResult;
          const credentials = GoogleAuthProvider.credential(
            idToken,
            accessToken,
          );
          await signInWithCredential(auth, credentials);
          await createUserInDB(logInResult.user);
        }

        return Promise.reject();
      })
      .catch((error) => console.log(error))
      .finally(() => {
        dispatch(
          setLoading({
            isLoading: false,
            loadingMessage: 'loadding...',
            type: '',
          }),
        );
        // navigation.navigate('BottomTabScreen');
      });
  };

  return (
    <>
      <TouchableOpacity
        style={styles.googleButtonContainerStyle}
        onPress={() => {
          signInWithGoogle();
        }}>
        <Image
          source={require('../../assets/images/google.png')}
          style={{ height: 30.0, width: 30.0 }}
          resizeMode='contain'
        />
        <Text style={{ ...Fonts.black16Regular, marginLeft: Sizes.fixPadding }}>
          {/* Log in with Google */}
          {text}
        </Text>
      </TouchableOpacity>
    </>
  );
};

export default GoogleSignInButton;

const styles = StyleSheet.create({
  googleButtonContainerStyle: {
    borderRadius: Sizes.fixPadding * 1.0,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: 'white',
    width: '35%',
    height: 40,
  },
});
