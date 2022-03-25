import React, { useState, useEffect } from 'react';
import {
  Text,
  View,
  SafeAreaView,
  ImageBackground,
  StatusBar,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  BackHandler,
  Linking,
  Alert,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Fonts, Sizes, Colors } from '../../constant/styles';
import IntlPhoneInput from 'react-native-intl-phone-input';
import AlreadyHaveAccount from '../../components/RegisterScreen/AlreadyHaveAccount';
import SocialMediaOptions from '../../components/RegisterScreen/SocialMediaOptions';
import {
  emailValidator,
  nameValidator,
  passwordValidator,
} from '../../AppFunctions/Auth/FormValidators';
import createUserByEmail from '../../AppFunctions/Auth/CreateUserByEmail';
import { useSelector } from 'react-redux';
import LoadingComp from '../../components/General/LoadingComp';
import { useNavigation } from '@react-navigation/native';

const RegisterScreen = () => {
  const [email, setEmail] = useState({ value: '', error: '' });
  const [fullName, setFullName] = useState({ value: '', error: '' });
  const [phoneNumber, setPhoneNumber] = useState({ value: '', error: '' });
  const [password, setPassword] = useState({ value: '', error: '' });
  const [confirmPassword, setConfirmPassword] = useState({
    value: '',
    error: '',
  });

  const navigation = useNavigation();
  //Manage the back clicks
  useEffect(() => {
    const backAction = () => {
      Alert.alert('Hold on!', 'Are you sure you want to quit the app?', [
        {
          text: 'Cancel',
          onPress: () => null,
          style: 'cancel',
        },
        {
          text: 'YES',
          onPress: () => BackHandler.exitApp(),
        },
      ]);
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, []);

  //Get current states of loading and error from redux store
  const { loadingState } = useSelector((state) => state.loadingState);

  function enterFullName() {
    return (
      <View style={[styles.input, fullName.error && styles.border]}>
        <TextInput
          placeholder='Full Name'
          style={{ ...Fonts.white16Regular }}
          placeholderTextColor='white'
          onChangeText={(text) => setFullName({ value: text, error: '' })}
          value={fullName.value}
          error={!!fullName.error}
          errorText={fullName.error}
        />
        {fullName.error ? (
          <Text style={styles.errorText}>{fullName.error}</Text>
        ) : null}
      </View>
    );
  }

  function phoneNumberInput() {
    return (
      <IntlPhoneInput
        onChangeText={({ phoneNumber }) =>
          setPhoneNumber({ value: phoneNumber, error: '' })
        }
        defaultCountry='AE'
        containerStyle={{
          backgroundColor: 'rgba(255,255,255,0.25)',
          borderRadius: Sizes.fixPadding + 15.0,
          marginTop: Sizes.fixPadding * 1.3,
          borderWidth: phoneNumber.error ? 2 : 0,
          borderColor: 'red',
        }}
        placeholder='Phone Number'
        dialCodeTextStyle={{ ...Fonts.white16Regular }}
        phoneInputStyle={{
          flex: 1,
          marginLeft: Sizes.fixPadding + 20.0,
          ...Fonts.white16Regular,
        }}
      />
    );
  }

  function enterPassword() {
    return (
      <View style={[styles.input, password.error && styles.border]}>
        <TextInput
          placeholder='Password'
          style={{ ...Fonts.white16Regular }}
          placeholderTextColor='white'
          returnKeyType='done'
          value={password.value}
          onChangeText={(text) => setPassword({ value: text, error: '' })}
          error={!!password.error}
          errorText={password.error}
          secureTextEntry
        />
        {password.error ? (
          <Text style={styles.errorText}>{password.error}</Text>
        ) : null}
      </View>
    );
  }

  function enterEmail() {
    return (
      <View style={[styles.input, email.error && styles.border]}>
        <TextInput
          placeholder='Email'
          style={{ ...Fonts.white16Regular }}
          placeholderTextColor='white'
          returnKeyType='next'
          value={email.value}
          onChangeText={(text) => setEmail({ value: text, error: '' })}
          error={!!email.error}
          errorText={email.error}
          autoCapitalize='none'
          autoCompleteType='email'
          textContentType='emailAddress'
          keyboardType='email-address'
        />

        {email.error ? (
          <Text style={styles.errorText}>{email.error}</Text>
        ) : null}
      </View>
    );
  }

  function enterConfirmPassword() {
    return (
      <View style={[styles.input, confirmPassword.error && styles.border]}>
        <TextInput
          placeholder='Confirm Password'
          style={{ ...Fonts.white16Regular }}
          placeholderTextColor='white'
          returnKeyType='done'
          value={confirmPassword.value}
          onChangeText={(text) =>
            setConfirmPassword({ value: text, error: '' })
          }
          error={!!confirmPassword.error}
          errorText={confirmPassword.error}
          secureTextEntry
        />
        {confirmPassword.error ? (
          <Text style={styles.errorText}>{confirmPassword.error}</Text>
        ) : null}
      </View>
    );
  }

  const onSubmit = async () => {
    const nameError = nameValidator(fullName.value);
    const emailError = emailValidator(email.value);
    const passwordError = passwordValidator(password.value);
    const confirmPasswordError = passwordValidator(confirmPassword.value);
    const phoneNumberError =
      phoneNumber.value.length === 0 ? 'Phone Number cant be empty' : '';

    if (emailError || passwordError || nameError || phoneNumberError) {
      setFullName({ value: fullName.value, error: nameError });
      setEmail({ value: email.value, error: emailError });
      setPassword({ value: password.value, error: passwordError });
      setConfirmPassword({
        value: confirmPassword.value,
        error: confirmPasswordError,
      });
      setPhoneNumber({
        value: phoneNumber.value,
        error: phoneNumberError,
      });
      return;
    }

    if (password.value !== confirmPassword.value) {
      setConfirmPassword({
        value: confirmPassword.value,
        error: 'Password doesnt not match',
      });

      return;
    }

    await createUserByEmail({
      email: email.value,
      password: password.value,
      fullName: fullName.value,
      phoneNumber: phoneNumber,
    });
  };

  const AgreeToTerms = () => {
    return (
      <View style={styles.termsContainer}>
        <Text style={{ margin: 10, marginBottom: 0, ...Fonts.white16Regular }}>
          By clicking on the button above, you agree to our{' '}
          <Text
            style={{
              textDecorationLine: 'underline',
              color: Colors.primary,
            }}
            onPress={() => navigation.navigate('privacyPolicy')}>
            Privacy Policy
          </Text>
        </Text>
      </View>
    );
  };

  const continueButton = () => {
    return (
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={onSubmit}
        style={{
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <LinearGradient
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          colors={[Colors.primary, 'rgba(25,118,210,0.5)']}
          style={{
            paddingVertical: Sizes.fixPadding + 5.0,
            borderRadius: Sizes.fixPadding * 3.0,
            width: '75%',
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: Sizes.fixPadding * 1.8,
          }}>
          <Text style={{ ...Fonts.white16Regular }}>Create Account</Text>
        </LinearGradient>
      </TouchableOpacity>
    );
  };

  function divider() {
    return (
      <View
        style={{
          backgroundColor: Colors.lightGray,
          height: 2.0,
          marginBottom: Sizes.fixPadding * 1.0,
          width: '95%',
        }}></View>
    );
  }

  return (
    <SafeAreaView
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <StatusBar translucent backgroundColor='rgba(0,0,0,0)' />
      {loadingState.isLoading && <LoadingComp type='' />}
      <ImageBackground
        style={{ flex: 1 }}
        source={require('../../assets/images/doctor_bg.png')}>
        <LinearGradient
          start={{ x: 0, y: 1 }}
          end={{ x: 0, y: 0 }}
          colors={['black', 'rgba(0,0.10,0,0.80)', 'rgba(0,0,0,0.20)']}
          style={{ flex: 1, paddingHorizontal: Sizes.fixPadding * 2.0 }}>
          <ScrollView style={{ paddingBottom: Sizes.fixPadding * 2.0 }}>
            <Text
              style={{
                ...Fonts.white30Bold,
                marginTop: Sizes.fixPadding * 6,
              }}>
              Register
            </Text>
            <Text style={{ ...Fonts.white16Regular }}>
              Create a new account
            </Text>

            {divider()}

            {enterFullName()}

            {enterEmail()}
            {phoneNumberInput()}
            {enterPassword()}
            {enterConfirmPassword()}

            {continueButton()}
            {AgreeToTerms()}

            <AlreadyHaveAccount
              desc={'Already have account?'}
              text={'Login Instead'}
              link={'Welcome'}
            />
            <SocialMediaOptions screen={'Register'} />
          </ScrollView>
        </LinearGradient>
      </ImageBackground>
    </SafeAreaView>
  );
};

RegisterScreen.navigationOptions = () => {
  return {
    // headerTitle: 'Trucks Screen',
    headerLeft: () => {
      return null;
    },
    headerBackVisible: false,
  };
};

export default RegisterScreen;

const styles = StyleSheet.create({
  input: {
    backgroundColor: 'rgba(255,255,255,0.35)',
    borderRadius: Sizes.fixPadding + 15.0,
    marginTop: Sizes.fixPadding * 1.4,
    paddingVertical: Sizes.fixPadding + 2.7,
    paddingHorizontal: Sizes.fixPadding + 15.0,
  },

  phoneNumberContainerStyle: {
    backgroundColor: 'rgba(255,255,255,0.25)',
    borderRadius: Sizes.fixPadding + 15.0,
    marginTop: Sizes.fixPadding * 1.3,
  },
  border: {
    borderWidth: 2,
    borderColor: 'red',
  },

  errorText: {
    position: 'absolute',
    bottom: 0,
    right: 12,
    color: 'red',
    fontSize: 16,
  },
});
