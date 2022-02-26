import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  alertProps: { show: false, title: '', message: '', type: '' },
};

const alertStateSlice = createSlice({
  name: 'alertStateManager',
  initialState,
  reducers: {
    setAlertProps: (state, action) => {
      state.alertProps = action.payload;
    },
  },
});

export const { setAlertProps } = alertStateSlice.actions;

export default alertStateSlice.reducer;
