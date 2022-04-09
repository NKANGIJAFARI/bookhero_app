import { StyleSheet, Text, View, TouchableOpacity, Alert } from 'react-native';
import React from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors, Sizes, Fonts } from '../../constant/styles';
import { doc, setDoc, getDoc, updateDoc, arrayUnion } from 'firebase/firestore';
import { db } from '../../firebase';

import services from '../../Utils/services';

const ServiceScreen = () => {
  const handleUpdateServices = async () => {
    console.log('aLL IS UPLOADED');
    Alert.alert('Already Uploaded', 'You cant upload now');
    // try {
    //   for (let i = 0; i < services.length; i++) {
    //     console.log('service', services[i].name);
    //     const serviceRef = doc(db, 'Services', services[i].name);
    //     await setDoc(serviceRef, services[i]);
    //   }
    // } catch (error) {
    //   console.log(error);
    // }
  };

  return (
    <View>
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={() => handleUpdateServices()}
        style={{
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <LinearGradient
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          colors={[Colors.primary, 'rgba(25,118,210,0.5)']}
          style={{
            paddingVertical: Sizes.fixPadding + 5.0,
            borderRadius: Sizes.fixPadding * 3.0,
            alignItems: 'center',
            width: '80%',
            justifyContent: 'center',
            marginTop: Sizes.fixPadding * 3.0,
            marginTop: Sizes.fixPadding * 2.0,
          }}>
          <Text style={{ ...Fonts.white16Regular }}>
            Sign In To Your Account
          </Text>
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );
};

export default ServiceScreen;

const styles = StyleSheet.create({});
