import React, { useEffect } from 'react';
import { Text, View, SafeAreaView } from 'react-native';
import { Fonts, Sizes } from '../../constant/styles';
import TabBarScreen from '../../components/TabBarScreen';
import { useDispatch, useSelector } from 'react-redux';
import { collection, query, where, onSnapshot } from 'firebase/firestore';
import { setLoading } from '../../Redux/Slices/LoadingSlice';
import { db } from '../../firebase';
import {
  addToActiveBookings,
  addToPastBookings,
  addToCancelledBookings,
  modifyBookings,
  resetBookings,
} from '../../Redux/Slices/BookingsSlice';
import LoadingComp from '../../components/General/LoadingComp';

const ScheduleScreen = () => {
  //Get the global states of the time and date
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.UserState);

  const { startDate, endDate } = useSelector(
    (state) => state.bookingFilterState,
  );

  const { loadingState } = useSelector((state) => state.loadingState);

  // As the screen is loading, we are fetching the data from firebase

  //Convert date to timestamps
  var start = new Date(startDate);
  var end = new Date(endDate);

  useEffect(() => {
    //First reset all the bookings available in the state
    dispatch(resetBookings());

    dispatch(
      setLoading({
        isLoading: true,
        loadingMessage: 'loadding...',
        type: '',
      }),
    );

    //Create a query to get the booking data
    let BookingsQuery;

    if (user.isAdmin) {
      BookingsQuery = query(
        collection(db, 'Bookings'),
        where('created', '>', start),
        where('created', '<', end),
      );
    } else {
      BookingsQuery = query(
        collection(db, 'Bookings'),
        where('created', '>=', start),
        where('created', '<=', end),
        where('assignedTo', '==', user.uid),
      );
    }

    // console.log('BookingsQuery', BookingsQuery);
    //For the query, get the data and store it THE GLOBAL STATES
    const unsub = onSnapshot(BookingsQuery, (snapshot) => {
      snapshot.docChanges().forEach((change) => {
        const data = change.doc.data();

        const bookingObject = {
          id: change.doc.id,
          date: data.selectedDate,
          time: data.selectedSlot,
          type: data.service,
          name: data.patientName,
          phone: data.contactPhone,
          contactEmail: data.contactEmail,
          slotStatus: data.slotStatus,
          details: data.details,
          dob: data.patientDOB,
          address: data.patientAddress,
          service: data.service,
          paymentStatus: data.Paid,
          gender: data.patientGender,
        };

        if (change.type === 'added') {
          dispatchBookingToState(bookingObject);
        } else if (change.type === 'modified') {
          //Lets first send the modificatiojn to the reducers to check if
          //That booking Id is anywhere and get removed, then continue with dispatching it
          //to the right place that it should be
          dispatch(modifyBookings(bookingObject));

          dispatchBookingToState(bookingObject);
        } else if (change.type === 'removed') {
          dispatchBookingToState(bookingObject);
        }
      });
    });

    const dispatchBookingToState = (booking) => {
      if (booking.slotStatus === 'Active') {
        dispatch(addToActiveBookings(booking));
      } else if (booking.slotStatus === 'Past') {
        dispatch(addToPastBookings(booking));
      } else if (booking.slotStatus === 'Cancelled') {
        dispatch(addToCancelledBookings(booking));
      }
    };

    dispatch(
      setLoading({
        isLoading: false,
        loadingMessage: 'loadding...',
        type: '',
      }),
    );

    return unsub;
  }, []);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      {loadingState.isLoading ? (
        <View style={{ flex: 1 }}>
          <LoadingComp type={'placeholder'} />
          <LoadingComp type={'placeholder'} />
          <LoadingComp type={'placeholder'} />
          <LoadingComp type={'placeholder'} />
          <LoadingComp type={'placeholder'} />
          <LoadingComp type={'placeholder'} />
        </View>
      ) : (
        <>
          <View style={{ height: 55.0, justifyContent: 'center' }}>
            <Text
              style={{
                ...Fonts.black20Bold,
                marginHorizontal: Sizes.fixPadding * 2.0,
              }}>
              Appointments
            </Text>
          </View>
          <TabBarScreen />
        </>
      )}
    </SafeAreaView>
  );
};

ScheduleScreen.navigationOptions = {
  title: 'Appointments',
  headerTitleStyle: {
    ...Fonts.white20Bold,
    marginLeft: -Sizes.fixPadding * 2.0,
  },
  headerStyle: {
    backgroundColor: 'white',
    elevation: 0,
  },
};

export default ScheduleScreen;
