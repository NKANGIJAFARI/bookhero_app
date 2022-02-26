import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: {
    displayName: '',
    email: '',
    photoURL: '',
    userID: '',
    authenticated: false,
  },
};

const userSlice = createSlice({
  name: 'userState',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
  },
});

export const { setUser } = userSlice.actions;

export default userSlice.reducer;
