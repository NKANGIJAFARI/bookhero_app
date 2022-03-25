import React, { useState, useEffect } from 'react';
import {
  Text,
  View,
  ImageBackground,
  StatusBar,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  BackHandler,
  Alert,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Fonts, Sizes } from '../../constant/styles';
import SocialMediaOptions from '../../components/RegisterScreen/SocialMediaOptions';
import AlreadyHaveAccount from '../../components/RegisterScreen/AlreadyHaveAccount';
import signInWithEmail from '../../AppFunctions/Auth/signInWithEmail';
import { useDispatch, useSelector } from 'react-redux';
import { setLoading, setError } from '../../Redux/Slices/LoadingSlice';
import {
  emailValidator,
  passwordValidator,
} from '../../AppFunctions/Auth/FormValidators';
import LoadingComp from '../../components/General/LoadingComp';
import { Colors } from '../../constant/styles';
import { ScrollView } from 'react-native-gesture-handler';

const WelcomeScreen = ({ navigation }) => {
  const dispatch = useDispatch();

  //Create the states for password and email
  const [password, setPassword] = useState({ value: '', error: '' });
  const [email, setEmail] = useState({ value: '', error: '' });

  //Get current states of loading and error from redux store
  const { loadingState } = useSelector((state) => state.loadingState);
  const { errorState } = useSelector((state) => state.loadingState);

  //An input field for password
  function enterPassword() {
    return (
      <View style={[styles.input, password.error && styles.border]}>
        <TextInput
          placeholder='Password'
          style={{
            ...Fonts.white16Regular,
          }}
          placeholderTextColor='white'
          secureTextEntry={true}
          onChangeText={(text) => setPassword({ value: text, error: '' })}
          value={password.value}
          onFocus={() =>
            dispatch(setError({ isError: false, errorMessage: '' }))
          }
        />
      </View>
    );
  }

  //An input field for email
  function enterEmail() {
    return (
      <View style={[styles.input, email.error && styles.border]}>
        <TextInput
          value={email.value}
          placeholder='Email'
          style={{ ...Fonts.white16Regular }}
          placeholderTextColor='white'
          autoCapitalize='none'
          autoCompleteType='email'
          textContentType='emailAddress'
          keyboardType='email-address'
          onChangeText={(text) => setEmail({ value: text, error: '' })}
          onFocus={() => {
            dispatch(setError({ isError: false, errorMessage: '' }));
          }}
        />
      </View>
    );
  }

  //A function to handle the sign in with email and password
  const handleSignIn = async () => {
    dispatch(setError({ isError: false, errorMessage: '' }));

    //Validate the email amd password
    const emailError = emailValidator(email.value);
    const passwordError = passwordValidator(password.value);

    //Validate the email and password and set the error message to the invalid input
    if (emailError || passwordError) {
      emailError && setEmail({ value: email.value, error: emailError });
      passwordError &&
        setPassword({ value: password.value, error: passwordError });

      //If there is any errors in the input, dispatch those errors so they can be shown on the screen
      //Else continue with the sign in process
      dispatch(
        setError({
          isError: true,
          errorMessage:
            emailError && passwordError
              ? `Email and Password cant be empty`
              : passwordError
              ? passwordError
              : emailError,
        }),
      );
      return;
    }

    //If there is no errors, set the loading state to true
    dispatch(
      setLoading({ isLoading: true, loadingMessage: 'loadding...', type: '' }),
    );

    //Sign in with email and password with the  function in functions/Auth
    try {
      const signIn = await signInWithEmail({
        email: email.value,
        password: password.value,
      });

      if (signIn === 'loggedIn') {
        navigation.navigate('Splash');
      }

      dispatch(
        setLoading({
          isLoading: false,
          loadingMessage: 'loadding...',
          type: '',
        }),
      );
    } catch (error) {
      //The sign in func returns login or an error message,
      dispatch(
        setLoading({
          isLoading: false,
          loadingMessage: 'loadding...',
          type: '',
        }),
      );
      //If there is an error, dispatch the error message
      dispatch(setError({ isError: true, errorMessage: signIn }));
      return;
    }

    //For any rewsults, set the loading state to false
  };

  //A function to return the sign in with email and password button
  function continueButton() {
    return (
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={() => handleSignIn()}
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
            alignItems: 'center',
            width: '80%',
            justifyContent: 'center',
            marginTop: Sizes.fixPadding * 3.0,
            marginBottom: Sizes.fixPadding * 3.0,
          }}>
          <Text style={{ ...Fonts.white16Regular }}>
            Sign In To Your Account
          </Text>
        </LinearGradient>
      </TouchableOpacity>
    );
  }

  //A function to return the forgot passowrd button
  function forgotPassword() {
    return (
      <Text
        onPress={() => navigation.navigate('ForgotPasswordScreen')}
        style={{
          ...Fonts.white16Regular,
          textAlign: 'right',
          marginTop: Sizes.fixPadding * 1.0,
          marginRight: Sizes.fixPadding * 1.0,
        }}>
        Forgot Password?
      </Text>
    );
  }

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

  return (
    <SafeAreaView style={{ flex: 1 }}>
      {loadingState.isLoading && <LoadingComp type='' />}
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
            paddingVertical: Sizes.fixPadding * 3.0,
            justifyContent: 'space-evenly',
            paddingTop: 40,
          }}>
          <ScrollView
            style={{
              paddingBottom: Sizes.fixPadding * 2.0,
              flex: 1,
              // paddingHorizontal: Sizes.fixPadding * 2.4,
              // paddingVertical: Sizes.fixPadding * 3.0,

              paddingTop: Sizes.fixPadding * 6.0,
            }}
            contentContainerStyle={{ justifyContent: 'space-evenly' }}>
            <View style={{ marginBottom: 15 }}>
              <Text style={{ ...Fonts.white30Bold }}>Welcome back</Text>
              <Text
                style={{
                  ...Fonts.white16Regular,
                  marginTop: Sizes.fixPadding,
                }}>
                Login to your account
              </Text>
            </View>

            <View>
              {enterEmail()}

              {enterPassword()}
              {forgotPassword()}

              {continueButton()}
              {errorState.isError && (
                <Text style={{ ...Fonts.white16Regular, color: 'red' }}>
                  {errorState.errorMessage}
                </Text>
              )}

              <AlreadyHaveAccount
                desc={'New here?'}
                text={'Create Account'}
                link={'Register'}
              />
            </View>

            <View>
              <SocialMediaOptions screen={'Login'} />
            </View>
          </ScrollView>
        </LinearGradient>
      </ImageBackground>
    </SafeAreaView>
  );
};

export default WelcomeScreen;

const styles = StyleSheet.create({
  input: {
    backgroundColor: 'rgba(255,255,255,0.25)',
    borderRadius: Sizes.fixPadding + 15.0,
    marginTop: Sizes.fixPadding * 1.4,
    paddingVertical: Sizes.fixPadding + 2.7,
    paddingHorizontal: Sizes.fixPadding + 15.0,
  },

  border: {
    borderWidth: 2,
    borderColor: 'red',
  },
});
