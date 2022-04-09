import { httpsCallable } from 'firebase/functions';
import { functions } from '../../firebase.js';
import createUserInDB from '../../AppFunctions/createUserInDB.js';

const makeUserAdmin = async (userID) => {
  const makeAdmin = httpsCallable(functions, 'makeAdmin');

  try {
    const result = await makeAdmin({ userID });

    const response = result.data;

    // const uploadToDatabase = await createUserInDB(response.data);
  } catch (error) {
    return { status: false, error: error.message };
  }
};

export default makeUserAdmin;
