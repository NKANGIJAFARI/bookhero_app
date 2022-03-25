//Create a user in firestore
import { doc, setDoc } from 'firebase/firestore';
import { serverTimestamp } from '@firebase/firestore';
import { db } from '../firebase';

const createUserInDB = async (userData) => {
  // Add a new document in collection "cities"
  await setDoc(doc(db, 'Users', userData.id), {
    email: userData.email,
    name: userData.name,
    photoUrl: userData.photoUrl ? userData.photoUrl : 'no image',
    phoneNumber: userData.phoneNumber ? userData.phoneNumber : '0000000000',
    userID: userData.id,
    timeStamp: serverTimestamp(),
  });
};

export default createUserInDB;
