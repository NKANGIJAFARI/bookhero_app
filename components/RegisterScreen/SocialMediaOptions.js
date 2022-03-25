import { StyleSheet, Text, View } from 'react-native';
import FacebookSigninButton from '../../components/Authentication/FacebookSiginButton';
import GoogleSigninButton from '../../components/Authentication/GoogleSignInButton';
import OtherRegisterOptions from './OtherRegisterOptions';
import { Fonts, Sizes } from '../../constant/styles';

const SocialMediaOptions = ({ screen }) => {
  return (
    <>
      <OtherRegisterOptions logiOrRegister={screen} />
      <View style={styles.container}>
        <FacebookSigninButton text={'Facebook'} />
        <GoogleSigninButton text={'Google'} />
      </View>
    </>
  );
};

export default SocialMediaOptions;

const styles = StyleSheet.create({
  container: {
    // backgroundColor: 'yellow',
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: Sizes.fixPadding * 1.5,
  },
});
