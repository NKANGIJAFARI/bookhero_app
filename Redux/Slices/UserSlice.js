import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: {
    displayName: '',
    email: '',
    photoURL: '',
    uid: '',
    authenticated: false,
  },
};

const userSlice = createSlice({
  name: 'userState',
  initialState,
  reducers: {
    addUserToStore: (state, action) => {
      state.user = action.payload;
    },
  },
});

export const { addUserToStore } = userSlice.actions;

export default userSlice.reducer;
