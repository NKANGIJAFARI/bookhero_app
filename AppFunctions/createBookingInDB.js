//Create a user in firestore
import { addDoc, collection } from 'firebase/firestore';
import { serverTimestamp } from '@firebase/firestore';
import { db } from '../firebase';

const createBookingInDB = async (props) => {
  const uploadData = await addDoc(collection(db, 'Bookings'), {
    ...props,
    assignedTo: 'none',
    assignedToName: 'none',
    created: serverTimestamp(),
    Updated: serverTimestamp(),
  });

  const successDetails = { uploaded: true, id: uploadData.id };

  return successDetails;
};

export default createBookingInDB;
