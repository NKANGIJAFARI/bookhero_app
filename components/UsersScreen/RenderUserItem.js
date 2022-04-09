import React, { useState, useEffect } from 'react';
import { Text, TouchableOpacity, StyleSheet, View } from 'react-native';
import { Fonts, Colors, Sizes } from '../../constant/styles';
import { MaterialIcons } from '@expo/vector-icons';
import ShowDialog from '../AssignUsersScreen/ShowDialog';
import { useRoute } from '@react-navigation/native';

const RenderUserItem = ({ item, color }) => {
  const [showModal, setShowModal] = useState(false);
  const [modalDesc, setModalDesc] = useState('');
  const [modalAction, setModalAction] = useState('');
  const [userID, setUserID] = useState('');

  const route = useRoute();

  const handleAssignUserToBooking = () => {
    if (route.name === 'Assign User') {
      setModalDesc(
        `Are you sure you want to assign  ${item.displayName} to this booking?`,
      );
      setShowModal(true);
      setUserID(item.userID);
      setModalAction('assignUserToABooking');
    }
  };

  //This function will be called when a user is long pressed so that user id is sent to the firebase functions
  //To make that user an admin .... custom claims
  const handleLongPressToMakeUserAdmin = () => {
    if (route.name !== 'Assign User') {
      setModalDesc(
        `Are you sure you want to make ${item.displayName} an admin?`,
      );
      setModalAction('makeUserAdmin');
      setShowModal(true);
      setUserID(item.userID);
    }
  };

  const handleDeleteUser = () => {
    setModalDesc(`Are you sure you want to delete this ${item.displayName}`);
    setModalAction('deleteUser');
    setShowModal(true);
    setUserID(item.userID);
  };

  return (
    <View style={styles.card}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginVertical: Sizes.fixPadding * 2.0,
        }}>
        <TouchableOpacity
          style={{ flexDirection: 'row' }}
          onPress={() => {
            handleAssignUserToBooking();
          }}
          onLongPress={() => {
            handleLongPressToMakeUserAdmin();
          }}>
          <>
            <View style={styles.circle}>
              <Text style={{ textAlign: 'center', color: color, fontSize: 18 }}>
                No Image
              </Text>
            </View>
            <View
              style={{
                marginLeft: Sizes.fixPadding * 1.6,
                marginTop: Sizes.fixPadding * 0.8,
              }}>
              <Text style={{ ...Fonts.black18Bold }}>{item.displayName}</Text>
              <Text style={{ ...Fonts.primaryColorRegular }}>{item.email}</Text>
              <Text style={{ marginVertical: 0, ...Fonts.black16Regular }}>
                {item.phoneNumber}
              </Text>
            </View>
          </>
        </TouchableOpacity>

        {route.name !== 'Assign User' ? (
          <TouchableOpacity
            style={{
              alignItems: 'space-between',
              marginVertical: Sizes.fixPadding * 2.0,
              marginTop: Sizes.fixPadding * 0.8,
              position: 'absolute',
              right: Sizes.fixPadding * 1.0,
              top: Sizes.fixPadding * 3.0,
            }}>
            <MaterialIcons
              name='delete-outline'
              size={28}
              color='black'
              onPress={() => handleDeleteUser()}
            />
            {/* <Ionicons name='ios-eye-outline' size={28} color='black' /> */}
          </TouchableOpacity>
        ) : null}
      </View>
      <View style={{ backgroundColor: Colors.lightGray, height: 0.5 }}></View>
      <ShowDialog
        showModal={showModal}
        setShowModal={setShowModal}
        userID={userID}
        description={modalDesc}
        action={modalAction}
        displayName={item.displayName}
      />
    </View>
  );
};

export default RenderUserItem;

const styles = StyleSheet.create({
  card: {
    height: 110.0,
    justifyContent: 'center',
    backgroundColor: 'white',
    borderColor: Colors.lightGray,
    borderWidth: 0.2,
    borderBottomWidth: 0.5,
    borderTopWidth: 0.5,
    marginHorizontal: 1.0,
    marginVertical: Sizes.fixPadding,
    borderRadius: Sizes.fixPadding * 2.5,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.2,
    shadowRadius: Sizes.fixPadding * 0.4,
    elevation: 10.0,
    paddingLeft: Sizes.fixPadding * 1.0,
  },

  circle: {
    height: 90.0,
    width: 90.0,
    borderRadius: 45.0,
    backgroundColor: '#E9EBFE',
    borderColor: Colors.primary,
    borderWidth: 1.5,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 10.0,
  },
});
