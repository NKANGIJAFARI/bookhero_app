import React, { useEffect, useState } from 'react';
import {
  Text,
  View,
  Image,
  StatusBar,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import { Fonts, Colors, Sizes } from '../../constant/styles';
import {
  collection,
  query,
  onSnapshot,
  orderBy,
  limit,
} from 'firebase/firestore';
import { db } from '../../firebase';
import LoadingComp from '../../components/General/LoadingComp';
import { useNavigation } from '@react-navigation/native';

const ChatScreen = () => {
  const navigation = useNavigation();

  const [loading, setLoading] = useState(true);

  const [chatList, setChatList] = useState([]);

  useEffect(() => {
    const chatromsRef = collection(db, 'Chatrooms');
    const q = query(chatromsRef);

    const unsubscribe = onSnapshot(q, (snapshot) => {
      snapshot.docChanges().forEach((change) => {
        if (change.type === 'added') {
          const message = { ...change.doc.data(), id: change.doc.id };

          for (let i = 0; i < chatList.length; i++) {
            if (chatList[i].id === message.id) {
              return;
            }
          }

          setChatList((chatList) => [message, ...chatList]);
        }
        if (change.type === 'modified') {
          console.log('Modified city: ', change.doc.data());
        }
        if (change.type === 'removed') {
          console.log('Removed city: ', change.doc.data());
        }
      });

      setLoading(false);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  function doctors() {
    const renderItem = ({ item }) => {
      return (
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={() =>
            navigation.navigate('Message', {
              name: item.name,
              clientID: item.clientID,
            })
          }>
          <View
            style={{
              marginHorizontal: Sizes.fixPadding * 2.0,
              marginTop: Sizes.fixPadding * 2.0,
            }}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <View style={styles.imageContainerStyle}>
                  <Image
                    source={{
                      uri: item.photoURL,
                    }}
                    style={{
                      width: 80.0,
                      height: 80.0,
                      borderRadius: Sizes.fixPadding * 4.0,
                    }}
                    resizeMode='contain'
                  />
                </View>
                <View style={{ marginLeft: Sizes.fixPadding }}>
                  <View style={{ flexDirection: 'row' }}>
                    <Text style={{ ...Fonts.black16Bold }}>{item.name}</Text>
                    {item.isActive == true ? (
                      <View
                        style={{
                          width: Sizes.fixPadding,
                          height: Sizes.fixPadding,
                          borderRadius: Sizes.fixPadding - 5.0,
                          backgroundColor: Colors.primary,
                          marginLeft: Sizes.fixPadding - 5.0,
                        }}></View>
                    ) : null}
                  </View>
                  <Text style={{ ...Fonts.gray14Regular }}>{item.email}</Text>
                </View>
              </View>
              <Text style={{ ...Fonts.gray14Regular }}>{item.time}</Text>
            </View>
            <View
              style={{
                height: 0.5,
                backgroundColor: Colors.lightGray,
                marginTop: Sizes.fixPadding * 2.0,
              }}
            />
          </View>
        </TouchableOpacity>
      );
    };
    return (
      <FlatList
        data={chatList}
        keyExtractor={(item) => `${item.id}`}
        renderItem={renderItem}
      />
    );
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      <StatusBar translucent={false} backgroundColor={Colors.primary} />
      <View style={styles.headerContainerStyle}>
        <Text
          style={{
            ...Fonts.black20Bold,
            marginHorizontal: Sizes.fixPadding * 2.0,
          }}>
          Chats
        </Text>
      </View>
      {doctors()}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  imageContainerStyle: {
    width: 80.0,
    height: 80.0,
    borderRadius: Sizes.fixPadding * 4.0,
    borderColor: '#B3BCFC',
    borderWidth: 1.0,
    overflow: 'hidden',
  },
  headerContainerStyle: {
    height: 55.0,
    width: '100%',
    justifyContent: 'center',
    borderBottomColor: Colors.lightGray,
    borderBottomWidth: 1.0,
  },
});

ChatScreen.navigationOptions = {
  title: 'Chats',
};

export default ChatScreen;
