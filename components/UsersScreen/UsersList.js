import React, { useEffect, useState } from 'react';
import { StyleSheet, View, FlatList, Text } from 'react-native';
import { collection, getDocs, where, query } from 'firebase/firestore';
import { db } from '../../firebase';
import RenderUserItem from './RenderUserItem';
import { Colors, Fonts } from '../../constant/styles';
import { setUsers } from '../../Redux/Slices/UsersSlice';
import { useSelector, useDispatch } from 'react-redux';
import LoadingComp from '../General/LoadingComp';
import { setLoading } from '../../Redux/Slices/LoadingSlice';
// import moment from 'moment';

const UsersList = () => {
  const dispatch = useDispatch();

  const { users } = useSelector((state) => state.UsersState);
  const { user } = useSelector((state) => state.UserState);
  console.log('user', user);

  const { loadingState } = useSelector((state) => state.loadingState);

  useEffect(() => {
    const getUsers = async () => {
      const allUsers = [];

      //Set the loader to true
      dispatch(
        setLoading({
          isLoading: true,
          loadingMessage: 'loadding...',
          type: '',
        }),
      );

      const q = query(
        collection(db, 'staffs'),
        where('email', '!=', user.email),
      );
      const querySnapshot = await getDocs(q);

      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots

        const userObject = {
          displayName: doc.data().displayName,
          email: doc.data().email,
          phoneNumber: doc.data().phoneNumber,
          photoURL: doc.data().photoURL,
          userID: doc.id,
        };

        allUsers.push(userObject);
      });

      dispatch(setUsers(allUsers));
      dispatch(
        setLoading({
          isLoading: false,
          loadingMessage: 'loadding...',
          type: '',
        }),
      );
    };

    getUsers();

    return () => {
      console.log('Unmounted');
    };
  }, []);

  return loadingState.isLoading ? (
    <View style={{ flex: 1 }}>
      <LoadingComp type={'placeholder'} />
      <LoadingComp type={'placeholder'} />
      <LoadingComp type={'placeholder'} />
      <LoadingComp type={'placeholder'} />
      <LoadingComp type={'placeholder'} />
      <LoadingComp type={'placeholder'} />
    </View>
  ) : users.length === 0 ? (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        ...Fonts.white17Bold,
      }}>
      <Text style={{ ...Fonts.white17Bold }}>No users</Text>
    </View>
  ) : (
    <FlatList
      data={users}
      keyExtractor={(item) => `${item.userID}`}
      renderItem={({ item }) => (
        <RenderUserItem item={item} color={Colors.primary} />
      )}
    />
  );
};

export default UsersList;

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
});
