import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase';

const signInWithEmail = async (userData) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      userData.email,
      userData.password,
    );

    return 'loggedIn';
  } catch (error) {
    return 'Incorrect Email or Password, Please try again';
  }
};

export default signInWithEmail;
