import { Iterable } from 'immutable';
import {
  configureStore,
  createSerializableStateInvariantMiddleware,
  isPlain,
} from '@reduxjs/toolkit';
import userStateReducer from './Slices/UserSlice';
import loadingStateReducer from './Slices/LoadingSlice';
import AlertStateReducer from './Slices/AlertSlice';
import usersStateReducer from './Slices/UsersSlice';

// Augment middleware to consider Immutable.JS iterables serializable
const isSerializable = (value) => Iterable.isIterable(value) || isPlain(value);

const getEntries = (value) =>
  Iterable.isIterable(value) ? value.entries() : Object.entries(value);

const serializableMiddleware = createSerializableStateInvariantMiddleware({
  isSerializable,
  getEntries,
});

export default configureStore({
  reducer: {
    UserState: userStateReducer,
    UsersState: usersStateReducer,
    AlertState: AlertStateReducer,
    loadingState: loadingStateReducer,
  },
  middleware: [serializableMiddleware],
});
