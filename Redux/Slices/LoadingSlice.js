import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  loadingState: { isLoading: false, loadingMessage: 'loadding...', type: '' },
  errorState: { isError: false, errorMessage: '' },
};

const loadingSlice = createSlice({
  name: 'loadingState',
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.loadingState = action.payload;
    },
    setError: (state, action) => {
      state.errorState = action.payload;
    },
  },
});

export const { setLoading, setError } = loadingSlice.actions;

export default loadingSlice.reducer;
