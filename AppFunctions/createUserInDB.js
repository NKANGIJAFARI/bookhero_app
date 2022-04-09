//Create a user in firestore
import { doc, setDoc } from 'firebase/firestore';
import { serverTimestamp } from '@firebase/firestore';
import { db } from '../firebase';

const createUserInDB = async (userData) => {
  try {
    // Add a new document in collection "cities"
    await setDoc(doc(db, 'staffs', userData.uid), {
      email: userData.email,
      displayName: userData.displayName
        ? userData.displayName
        : 'No name specified',
      photoUrl: userData.photoUrl ? userData.photoUrl : 'no image',
      phoneNumber: userData.phoneNumber ? userData.phoneNumber : '0000000000',
      userID: userData.uid,
      emailVerified: userData.emailVerified ? userData.emailVerified : false,
      timeStamp: serverTimestamp(),
    });

    return { status: true, error: '' };
  } catch (error) {
    console.log(error);
  }
};

export default createUserInDB;
