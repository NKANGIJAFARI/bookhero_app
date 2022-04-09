import React from 'react';
import {
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { Fonts, Colors, Sizes } from '../../constant/styles';
import Dialog from 'react-native-dialog';
import { doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { db } from '../../firebase';
import { functions } from '../../firebase';
import { httpsCallable } from 'firebase/functions';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { setLoading } from '../../Redux/Slices/LoadingSlice';
import makeUserAdmin from '../../AppFunctions/Auth/makeUserAdmin';

const { width } = Dimensions.get('screen');

const ShowDialog = ({
  showModal,
  setShowModal,
  userID,
  action,
  description,
  displayName,
}) => {
  const route = useRoute();
  const bookingID = route.params?.bookingID;

  const navigation = useNavigation();
  const dispatch = useDispatch();

  //A function to assign the user to the booking=========================================
  const assignUserToABooking = async () => {
    try {
      dispatch(
        setLoading({
          isLoading: true,
          loadingMessage: 'loadding...',
          type: '',
        }),
      );
      const bookingRef = doc(db, 'Bookings', bookingID);

      // Set the "slotStatus" field of the booking to cancelled
      await updateDoc(bookingRef, {
        assignedTo: userID,
        assignedToName: displayName,
      });

      dispatch(
        setLoading({
          isLoading: false,
          loadingMessage: 'loadding...',
          type: '',
        }),
      );
      navigation.goBack();
    } catch (error) {
      dispatch(
        setLoading({
          isLoading: false,
          loadingMessage: 'loadding...',
          type: '',
        }),
      );
      console.log(error);
    }
  };

  //==================================================================================================

  //A function to deletre a user/staff================================================================
  const deleteUser = async () => {
    try {
      dispatch(
        setLoading({
          isLoading: true,
          loadingMessage: 'loadding...',
          type: '',
        }),
      );

      //First lets delete the user from the auth
      const deleteUser = httpsCallable(functions, 'deleteUser');
      await deleteUser({ userID });

      //After deleteing the user from Auth, delete them from the firestore

      const userRef = doc(db, 'staffs', userID);

      // Set the "slotStatus" field of the booking to cancelled
      await deleteDoc(userRef);
      dispatch(
        setLoading({
          isLoading: false,
          loadingMessage: 'loadding...',
          type: '',
        }),
      );
      navigation.goBack();
    } catch (error) {
      dispatch(
        setLoading({
          isLoading: false,
          loadingMessage: 'loadding...',
          type: '',
        }),
      );

      navigation.goBack();
    }
  };

  //==================================================================================================

  const handleYesPress = () => {
    route.name === 'Assign User'
      ? assignUserToABooking()
      : action === 'deleteUser'
      ? deleteUser()
      : makeUserAdmin(userID);

    setShowModal(false);
  };

  return (
    <Dialog.Container
      visible={showModal}
      contentStyle={styles.dialogContainerStyle}>
      <View style={styles.dialogStyle}>
        <Text style={{ textAlign: 'center', ...Fonts.black16Regular }}>
          {description}
        </Text>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            marginTop: Sizes.fixPadding * 2.0,
          }}>
          <TouchableOpacity
            activeOpacity={0.9}
            onPress={() => {
              setShowModal(false);
            }}
            style={styles.dialogNoButtonStyle}>
            <Text style={{ ...Fonts.primaryColor17Bold }}>No</Text>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.9}
            onPress={() => handleYesPress()}
            style={styles.dialogYesButtonStyle}>
            <Text style={{ ...Fonts.white17Bold }}>Yes</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Dialog.Container>
  );
};

export default ShowDialog;

const styles = StyleSheet.create({
  dialogStyle: {
    height: 110.0,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  dialogNoButtonStyle: {
    flex: 0.5,
    backgroundColor: '#E0E0E0',
    alignItems: 'center',
    justifyContent: 'center',
    height: 50.0,
    borderRadius: 8.0,
    marginRight: 15.0,
  },
  dialogYesButtonStyle: {
    flex: 0.5,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    height: 50.0,
    borderRadius: 8.0,
    marginLeft: 15.0,
  },
  dialogContainerStyle: {
    borderRadius: Sizes.fixPadding,
    width: width - 90,
    paddingHorizontal: Sizes.fixPadding * 3.0,
    paddingTop: -Sizes.fixPadding,
    paddingBottom: Sizes.fixPadding * 2.0,
  },
});
