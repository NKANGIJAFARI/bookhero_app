import React from 'react';
import {
  Text,
  View,
  FlatList,
  TouchableHighlight,
  Image,
  StyleSheet,
} from 'react-native';
import { Fonts, Colors, Sizes } from '../../constant/styles';
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';

const ViewAllScreen = () => {
  const navigation = useNavigation();
  const { user } = useSelector((state) => state.UserState);

  const specialistsList = [
    {
      id: '1',
      name: user.isAdmin ? 'Bookings' : 'My Bookings',
      image: require('../../assets/images/icons/patient.png'),
      screen: 'Booking Sort',
    },
    {
      id: '2',
      name: 'Slots Availability',
      image: require('../../assets/images/icons/pediatrician.png'),
      screen: 'Slots Availability',
    },

    {
      id: '3',
      name: 'Users',
      image: require('../../assets/images/icons/stethoscope.png'),
      screen: 'Users',
    },

    {
      id: '4',
      name: 'Manage Services',
      image: require('../../assets/images/icons/stethoscope.png'),
      screen: 'Services',
    },
  ];

  const renderItem = ({ item }) => {
    //Get the user object here

    const handlePress = () => {
      // dispatch(setAppointmentDetails({ service: item.name }));
      navigation.navigate(item.screen);
    };

    if (item.name === 'Users' && user.isAdmin === false) {
      return null;
    }

    if (item.name === 'Slots Availability' && user.isAdmin === false) {
      return null;
    }

    if (item.name === 'Manage Services' && user.isAdmin === false) {
      return null;
    }

    return (
      <TouchableHighlight
        underlayColor='white'
        activeOpacity={1}
        style={{ flex: 1 }}
        onPress={() => handlePress()}>
        <View style={styles.specialistStyle}>
          <Image
            source={item.image}
            resizeMode='contain'
            style={{ height: 80.0, width: 80.0 }}
          />
          <Text style={styles.specialistTextStyle}>{item.name}</Text>
        </View>
      </TouchableHighlight>
    );
  };

  const specialities = () => {
    return (
      <View
        style={{
          backgroundColor: '#FAF9F7',
          flex: 1,
          paddingTop: Sizes.fixPadding,
        }}>
        <FlatList
          data={specialistsList}
          keyExtractor={(item) => `${item.id}`}
          numColumns={2}
          renderItem={renderItem}
          contentContainerStyle={{ paddingHorizontal: Sizes.fixPadding }}
        />
      </View>
    );
  };

  return <View style={{ flex: 1 }}>{specialities()}</View>;
};

const styles = StyleSheet.create({
  headerSearchStyle: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: Sizes.fixPadding,
    borderColor: '#E0E0E0',
    borderWidth: 1,
    paddingHorizontal: Sizes.fixPadding,
    alignItems: 'center',
    paddingVertical: Sizes.fixPadding,
    marginHorizontal: Sizes.fixPadding * 2.0,
  },
  specialistStyle: {
    height: 170.0,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    borderColor: Colors.lightGray,
    borderWidth: 1.0,
    marginHorizontal: 10.0,
    marginVertical: Sizes.fixPadding,
    borderRadius: Sizes.fixPadding,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: Sizes.fixPadding,
    elevation: 5.0,
  },
  headerStyle: {
    backgroundColor: 'white',
    paddingTop: Sizes.fixPadding + 5.0,
    paddingBottom: Sizes.fixPadding,
  },
  headerTitleContainerStyle: {
    flexDirection: 'row',
    paddingHorizontal: Sizes.fixPadding * 2.0,
    marginBottom: Sizes.fixPadding + 10.0,
  },
  specialistTextStyle: {
    ...Fonts.black16Bold,
    marginTop: Sizes.fixPadding,
    marginHorizontal: Sizes.fixPadding,
    textAlign: 'center',
  },
});

// ViewAllScreen.navigationOptions = () => {
//   return {
//     header: () => null,
//   };
// };

export default ViewAllScreen;
