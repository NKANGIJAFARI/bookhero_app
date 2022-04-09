import React, { createContext, useContext, useState, useEffect } from 'react';
import { onAuthStateChanged } from '@firebase/auth';
import { auth } from '../firebase';
import { addUserToStore } from '../Redux/Slices/UserSlice';
import { useDispatch } from 'react-redux';

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const dispatch = useDispatch();

  const [user, setUser] = useState(null);

  useEffect(
    () =>
      onAuthStateChanged(auth, (authUser) => {
        if (authUser) {
          auth.currentUser.getIdTokenResult().then((idToken) => {
            const userObject = {
              displayName: authUser.displayName,
              email: authUser.email,
              photoURL: authUser.photoURL,
              uid: authUser.uid,
              authenticated: true,
              isAdmin: idToken.claims?.admin ? true : false,
            };

            setUser(userObject);
            dispatch(addUserToStore(userObject));
          });
          // console.log(auth.currentUser.getIdToken(true));

          // console.log(authUser);
        } else {
          setUser(null);
          console.log('user logged out');
        }
      }),
    [],
  );

  return (
    <AuthContext.Provider value={{ user: user }}>
      {children}
    </AuthContext.Provider>
  );
};

export default function useAuth() {
  return useContext(AuthContext);
}
