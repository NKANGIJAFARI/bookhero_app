import React from 'react';
import { View, Text, StatusBar, SafeAreaView } from 'react-native';
import ViewAllScreen from '../../components/HomeScreen/ViewAll';
import Test from '../../components/HomeScreen/Test';
import { Colors, Sizes } from '../../constant/styles';

const HomeScreen = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar backgroundColor={Colors.primary} />
      <ViewAllScreen />
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
