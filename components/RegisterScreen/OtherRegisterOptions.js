import { StyleSheet, Text, View } from 'react-native';
import { Fonts, Sizes } from '../../constant/styles';

const OtherRegisterOptions = ({ logiOrRegister }) => {
  return (
    <View style={styles.container}>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <View style={{ flex: 1, height: 2, backgroundColor: 'white' }} />
        <View>
          <Text
            style={{
              ...Fonts.white16Regular,
              textAlign: 'center',
              // margin: Sizes.fixPadding * 2.0,
              marginLeft: Sizes.fixPadding * 2.0,
              marginRight: Sizes.fixPadding * 2.0,
              textAlign: 'center',
            }}>
            Or {logiOrRegister} with
          </Text>
        </View>
        <View style={{ flex: 1, height: 2, backgroundColor: 'white' }} />
      </View>
    </View>
  );
};

export default OtherRegisterOptions;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    marginTop: Sizes.fixPadding * 3.0,
  },
});
