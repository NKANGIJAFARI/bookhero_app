import { signOut } from '@firebase/auth';
import { auth } from '../../firebase';

//The logout functionality, this is a function that is called when the user clicks the logout button
const logOut = async () => {
  signOut(auth)
    .then(() => {
      console.log('logged out');
    })
    .catch((error) => console.log(error))
    .finally(() => {
      console.log('logged out');
    });
};

export default logOut;
