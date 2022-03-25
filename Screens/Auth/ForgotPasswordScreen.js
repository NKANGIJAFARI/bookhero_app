import React, { useState } from 'react';
import {
  Text,
  View,
  ImageBackground,
  StatusBar,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Alert,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Fonts, Sizes, Colors } from '../../constant/styles';
import SocialMediaOptions from '../../components/RegisterScreen/SocialMediaOptions';
import { auth } from '../../firebase';
import { sendPasswordResetEmail } from 'firebase/auth';

const ForgotPasswordScreen = () => {
  const [email, setEmail] = useState('');
  const [emailSent, setEmailSent] = useState(false);

  const sendPasswordReset = async () => {
    sendPasswordResetEmail(auth, email)
      .then((sendEmail) => {
        setEmailSent(true);
      })
      .catch((error) => {
        Alert.alert(`User not Found!,
Please check email or try again later`);
      });
  };

  function enterEmail() {
    return (
      <View style={styles.input}>
        <TextInput
          placeholder='Email'
          style={{ ...Fonts.white16Regular }}
          placeholderTextColor='white'
          onChangeText={(text) => setEmail(text)}
          value={email}
        />
      </View>
    );
  }

  function continueButton() {
    return (
      <TouchableOpacity
        activeOpacity={0.9}
        style={{
          paddingHorizontal: 60,
        }}
        onPress={async () => sendPasswordReset(auth, email)}>
        <LinearGradient
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          colors={[Colors.primary, 'rgba(25,118,210,0.5)']}
          style={{
            paddingVertical: Sizes.fixPadding + 5.0,
            borderRadius: Sizes.fixPadding * 3.0,
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: Sizes.fixPadding * 2.0,
          }}>
          <Text style={{ ...Fonts.white17Bold }}>Reset Password</Text>
        </LinearGradient>
      </TouchableOpacity>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar translucent backgroundColor='rgba(0,0,0,0)' />
      <ImageBackground
        style={{
          flex: 1,
          width: '100%',
          height: '100%',
          alignItems: 'center',
          justifyContent: 'center',
        }}
        source={require('../../assets/images/doctor_bg.png')}>
        <LinearGradient
          start={{ x: 0, y: 1 }}
          end={{ x: 0, y: 0 }}
          colors={['black', 'rgba(0,0.10,0,0.80)', 'rgba(0,0,0,0.20)']}
          style={{
            flex: 1,
            paddingHorizontal: Sizes.fixPadding * 2.4,
            paddingVertical: Sizes.fixPadding * 7.0,
            justifyContent: 'space-around',
            // alignItems: 'center',
            width: '100%',
          }}>
          <View>
            <Text style={{ ...Fonts.white30Bold }}>Reset Password</Text>
            <Text
              style={{
                ...Fonts.white16Regular,
                marginTop: Sizes.fixPadding * 0.5,
              }}>
              Enter your email to reset password.
            </Text>
          </View>

          <View>
            {enterEmail()}
            {emailSent ? (
              <Text style={{ ...Fonts.white17Bold }}>
                Sent! Check Your email
              </Text>
            ) : null}
            {continueButton()}
          </View>
          <View>
            <SocialMediaOptions screen={'Login'} />
          </View>
        </LinearGradient>
      </ImageBackground>
    </SafeAreaView>
  );
};

ForgotPasswordScreen.navigationOption = () => {
  return {
    header: () => null,
  };
};

export default ForgotPasswordScreen;

const styles = StyleSheet.create({
  input: {
    backgroundColor: 'rgba(255,255,255,0.25)',
    borderRadius: Sizes.fixPadding + 15.0,
    marginTop: Sizes.fixPadding * 1.4,
    marginBottom: Sizes.fixPadding * 1.4,
    paddingVertical: Sizes.fixPadding + 2.7,
    paddingHorizontal: Sizes.fixPadding + 15.0,
  },
});
