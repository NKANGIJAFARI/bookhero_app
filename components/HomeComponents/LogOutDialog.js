import React from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
} from 'react-native';
import { Fonts, Colors, Sizes } from '../../constant/styles';
import Dialog from 'react-native-dialog';
import { addUserToStore } from '../../Redux/Slices/UserSlice';
import { signOut } from '@firebase/auth';
import { auth } from '../../firebase';
import { useDispatch } from 'react-redux';

const { width } = Dimensions.get('screen');

const LogOutDialog = ({ setIsLogout, showDialog }) => {
  const dispatch = useDispatch();

  //This is a signout functiona nd when triggered, we shall dispatch an empty user object
  const logOut = () => {
    signOut(auth)
      .then(() => {
        console.log('logged out');
      })
      .catch((error) => console.log(error))
      .finally(() => {
        dispatch(
          addUserToStore({
            displayName: '',
            email: '',
            photoURL: '',
            userID: '',
            authenticated: false,
          }),
        );
      });
  };

  return (
    <Dialog.Container
      visible={showDialog}
      contentStyle={styles.dialogContainerStyle}>
      <View style={{ backgroundColor: 'white', alignItems: 'center' }}>
        <Text
          style={{
            ...Fonts.black18Bold,
            paddingBottom: Sizes.fixPadding - 5.0,
          }}>
          You sure want to logout?
        </Text>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: Sizes.fixPadding * 2.0,
          }}>
          <TouchableOpacity
            activeOpacity={0.9}
            onPress={() => setIsLogout(false)}
            style={styles.cancelButtonStyle}>
            <Text style={{ ...Fonts.black20Regular }}>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.9}
            onPress={async () => {
              setIsLogout(false);
              logOut();
            }}
            style={styles.logOutButtonStyle}>
            <Text style={{ ...Fonts.white20Regular }}>Log out</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Dialog.Container>
  );
};

export default LogOutDialog;

const styles = StyleSheet.create({
  dialogContainerStyle: {
    borderRadius: Sizes.fixPadding,
    width: width - 90,
    paddingHorizontal: Sizes.fixPadding * 3.0,
    paddingTop: -Sizes.fixPadding,
    paddingBottom: Sizes.fixPadding * 2.0,
  },
  cancelButtonStyle: {
    flex: 0.5,
    backgroundColor: Colors.lightGray,
    borderRadius: Sizes.fixPadding - 5.0,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: Sizes.fixPadding,
    marginRight: Sizes.fixPadding + 5.0,
  },
  logOutButtonStyle: {
    flex: 0.5,
    backgroundColor: Colors.primary,
    borderRadius: Sizes.fixPadding - 5.0,
    paddingVertical: Sizes.fixPadding,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: Sizes.fixPadding + 5.0,
  },
});
