import { TouchableOpacity, Text } from 'react-native';
import { Fonts, Sizes } from '../../constant/styles';
import { useNavigation } from '@react-navigation/native';

const AlreadyHaveAccount = ({ desc, text, link }) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      style={{ textAliign: 'center', marginTop: Sizes.fixPadding * 1.3 }}
      activeOpacity={0.9}
      onPress={() => navigation.replace(link)}>
      <Text
        style={{
          ...Fonts.white16Regular,
          textAlign: 'center',
          marginTop: Sizes.fixPadding * 1.0,
          marginRight: Sizes.fixPadding * 1.0,
        }}>
        {desc} <Text style={{ ...Fonts.white17Bold }}> {text}</Text>
      </Text>
    </TouchableOpacity>
  );
};

export default AlreadyHaveAccount;
