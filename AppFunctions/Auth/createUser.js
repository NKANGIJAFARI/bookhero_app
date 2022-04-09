import { httpsCallable } from 'firebase/functions';
import { functions } from '../../firebase.js';
import createUserInDB from '../../AppFunctions/createUserInDB.js';

const createUser = async (data) => {
  console.log('createUser', data);
  const createNewUser = httpsCallable(functions, 'createNewUser');
  data.phoneNumber = `+971${data.phoneNumber.replace(/\s+/g, '')}`;
  // data.phoneNumber = '+971614421552';

  try {
    const result = await createNewUser(data);

    const response = result.data;

    console.log('createUser response', response);

    if (response.data.uid) {
      const createdUser = {
        email: response.data.email,
        name: response.data.displayName,
        photoUrl: response.data.photoUrl ? response.data.photoUrl : 'no image',
        phoneNumber: response.data.phoneNumber
          ? response.data.phoneNumber
          : '0000000000',
        uid: response.data.uid,
      };

      const uploadToDatabase = await createUserInDB(createdUser);
      if (uploadToDatabase.status) {
        return { status: true, error: '' };
      }
    } else {
      return { status: false, error: response.data.errorfo.messageIn };
    }
  } catch (error) {
    return { status: false, error: error.message };
  }
};

export default createUser;
