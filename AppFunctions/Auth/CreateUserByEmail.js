import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase';
import createUserInDB from '../../AppFunctions/createUserInDB';
import { Alert } from 'react-native';

const createUserByEmail = async (userData) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      userData.email,
      userData.password,
    );

    const user = {
      email: userCredential.user.email,
      name: userData.fullName,
      phoneNumber: userData.phoneNumber.value,
      id: userCredential.user.uid,
    };

    await createUserInDB(user);
  } catch (error) {
    if (error.message.includes('email-already-in-use')) {
      Alert.alert(
        'Email already in use',
        'Please Login or try another email',
        [{ text: 'OK', onPress: () => console.log('OK Pressed') }],
        { cancelable: false },
      );
    } else {
      Alert.alert(`Couldnt login!, Please try again later`);
    }
  }
};

export default createUserByEmail;
