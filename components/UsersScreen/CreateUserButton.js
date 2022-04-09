import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Sizes, Fonts, Colors } from '../../constant/styles';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';

const CreateUserButton = () => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity onPress={() => navigation.navigate('Create User')}>
      <LinearGradient
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 4 }}
        colors={[Colors.primary, 'rgba(25,118,210,0.5)']}
        style={{
          paddingVertical: Sizes.fixPadding + 2.0,
          borderRadius: Sizes.fixPadding * 3.0,
          alignItems: 'center',
          justifyContent: 'center',
          width: 150,
          // marginTop: Sizes.fixPadding * 3.0,
          // marginBottom: Sizes.fixPadding * 3.0,
        }}>
        <Text style={{ ...Fonts.white16Regular }}>Create Users</Text>
      </LinearGradient>
    </TouchableOpacity>
  );
};

export default CreateUserButton;

// const styles = StyleSheet.create({});
