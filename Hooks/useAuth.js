import React, { createContext, useContext, useState, useEffect } from 'react';
import { onAuthStateChanged } from '@firebase/auth';
import { auth } from '../firebase';
import { setUser as addUserToStore } from '../Redux/Slices/UserSlice';
import { useDispatch } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const dispatch = useDispatch();

  const [user, setUser] = useState(null);

  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, async (authUser) => {
      if (authUser) {
        setUser(authUser);
        await AsyncStorage.setItem('isLoggedInBefore', 'true');

        dispatch(
          addUserToStore({
            displayName: authUser.displayName,
            email: authUser.email,
            photoURL: authUser.photoURL,
            userID: authUser.uid,
            authenticated: true,
          }),
        );
      } else {
        setUser(null);
      }
    });

    return () => unSubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user: user }}>
      {children}
    </AuthContext.Provider>
  );
};

export default function useAuth() {
  return useContext(AuthContext);
}
