import React, { useState } from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  SafeAreaView,
  StyleSheet,
  Linking,
} from 'react-native';
import { Fonts, Colors, Sizes } from '../../constant/styles';
import { Ionicons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import LogOutDialog from '../../components/HomeComponents/LogOutDialog';
import UserInfo from '../../components/ProfileScreen/UserInfo';
import { useNavigation } from '@react-navigation/native';

LogOutDialog;

const ProfileScreen = () => {
  const navigation = useNavigation();

  const [isLogout, setIsLogout] = useState(false);

  function divider() {
    return (
      <View style={{ height: 1.0, backgroundColor: Colors.lightGray }}></View>
    );
  }

  function title({ title }) {
    return (
      <Text
        style={{
          ...Fonts.black20Bold,
          marginVertical: Sizes.fixPadding + 5.0,
          marginHorizontal: Sizes.fixPadding * 2.0,
        }}>
        {title}
      </Text>
    );
  }

  function infoAll({ icon, backColor, frontColor, title }) {
    return (
      <View style={styles.infoContainerStyle}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <View
            style={{
              ...styles.infoContainerCircleStyle,
              backgroundColor: backColor,
              borderColor: frontColor,
            }}>
            {icon}
          </View>
          <Text style={{ ...Fonts.black16Bold, marginLeft: Sizes.fixPadding }}>
            {title}
          </Text>
        </View>
        <Feather name='chevron-right' size={24} color='black' />
      </View>
    );
  }

  function shortDivider() {
    return (
      <View
        style={{
          height: 0.5,
          backgroundColor: Colors.lightGray,
          marginHorizontal: Sizes.fixPadding * 2.0,
          marginVertical: Sizes.fixPadding,
        }}></View>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      <StatusBar translucent={false} backgroundColor={Colors.primary} />
      <ScrollView>
        <UserInfo />
        {divider()}
        {title({ title: 'Account Info' })}

        <TouchableOpacity
          activeOpacity={0.9}
          onPress={() => navigation.navigate('Schedule')}>
          {infoAll({
            icon: (
              <FontAwesome5 name='clipboard-list' size={20} color='#F44336' />
            ),
            backColor: '#FDE3E1',
            frontColor: '#F44336',
            title: 'My History',
          })}
        </TouchableOpacity>

        {shortDivider()}
        {title({ title: 'About App' })}

        <TouchableOpacity
          activeOpacity={0.9}
          onPress={() => navigation.navigate('AboutUs')}>
          {infoAll({
            icon: (
              <MaterialCommunityIcons
                name='hand-pointing-up'
                size={29}
                color={Colors.primary}
              />
            ),
            backColor: '#E9EBFE',
            frontColor: Colors.primary,
            title: 'About Us',
          })}
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={() => navigation.navigate('Chat')}>
          {infoAll({
            icon: (
              <Ionicons
                name='md-help-circle-outline'
                size={29}
                color='#F44336'
              />
            ),
            backColor: '#FDE3E1',
            frontColor: '#F44336',
            title: 'Help',
          })}
        </TouchableOpacity>

        {infoAll({
          icon: <Ionicons name='star-outline' size={20} color='#60B864' />,
          backColor: '#E4F3E5',
          frontColor: '#60B864',
          title: 'Rate Us',
        })}

        {infoAll({
          icon: <FontAwesome name='tag' size={24} color='#FF9800' />,
          backColor: '#FFF0D9',
          frontColor: '#FF9800',
          title: 'Coupen Codes',
        })}

        <TouchableOpacity
          onPress={() =>
            Linking.openURL('https://healthexpressgroup.com/privacy-policy/')
          }>
          {infoAll({
            icon: <FontAwesome name='tag' size={24} color='#FF9800' />,
            backColor: '#FFF0D9',
            frontColor: '#FF9800',
            title: 'Privacy Policy',
          })}
        </TouchableOpacity>

        {shortDivider()}
        <TouchableOpacity
          style={{ marginTop: Sizes.fixPadding }}
          activeOpacity={0.9}
          onPress={() => setIsLogout(true)}>
          {infoAll({
            icon: <Ionicons name='log-in-outline' size={29} color='#42B1A6' />,
            backColor: '#D9EFED',
            frontColor: '#42B1A6',
            title: 'Logout',
          })}
        </TouchableOpacity>
      </ScrollView>
      <LogOutDialog setIsLogout={setIsLogout} showDialog={isLogout} />
    </SafeAreaView>
  );
};

ProfileScreen.navigationOptions = () => {
  return {
    header: () => null,
  };
};

const styles = StyleSheet.create({
  profileInfoContainerStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: Sizes.fixPadding * 2.0,
    marginVertical: Sizes.fixPadding,
  },
  infoContainerStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: Sizes.fixPadding * 2.0,
    marginBottom: Sizes.fixPadding + 3.0,
  },
  infoContainerCircleStyle: {
    height: 52.0,
    width: 52.0,
    borderRadius: 26.0,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1.0,
  },
});

export default ProfileScreen;
