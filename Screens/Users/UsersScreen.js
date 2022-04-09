import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Colors, Sizes } from '../../constant/styles';
import { useNavigation } from '@react-navigation/native';
import CreateUserButton from '../../components/UsersScreen/CreateUserButton';
import UsersList from '../../components/UsersScreen/UsersList';
import { Ionicons } from '@expo/vector-icons';
import { useSelector } from 'react-redux';

const UsersScreen = () => {
  const navigation = useNavigation();

  const { user } = useSelector((state) => state.UserState);

  function divider() {
    return (
      <View
        style={{
          backgroundColor: Colors.lightGray,
          height: 2.0,
          marginBottom: Sizes.fixPadding * 1.0,
          width: '100%',
        }}></View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.headerStyle}>
        <Ionicons
          name='arrow-back-sharp'
          size={35}
          color='black'
          onPress={() => navigation.goBack()}
        />
        <CreateUserButton />
      </View>
      {divider()}

      <View style={{ flex: 1, paddingHorizontal: 10 }}>
        <UsersList />
      </View>
    </View>
  );
};

export default UsersScreen;

const styles = StyleSheet.create({
  headerStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 10.0,
    marginHorizontal: 20.0,
  },
});
