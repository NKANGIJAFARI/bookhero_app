import React from 'react';
import { Text, View, Image, StyleSheet } from 'react-native';
import { Fonts, Sizes } from '../../constant/styles';
import { useSelector } from 'react-redux';

const UserInfo = () => {
  const { user } = useSelector((state) => state.UserState);

  console.log('user', user);

  return (
    <View style={styles.profileInfoContainerStyle}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Image
          source={{
            uri: user.photoURL ? user.photoURL : 'no -image',
          }}
          style={{ height: 55.0, width: 55.0, borderRadius: 27.0 }}
          resizeMode='contain'
        />
        <Text style={{ ...Fonts.black22Bold, marginLeft: Sizes.fixPadding }}>
          {user.displayName ? user.displayName : 'No Name'}
        </Text>
      </View>
    </View>
  );
};

export default UserInfo;

const styles = StyleSheet.create({
  profileInfoContainerStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: Sizes.fixPadding * 2.0,
    marginVertical: Sizes.fixPadding,
  },
});
