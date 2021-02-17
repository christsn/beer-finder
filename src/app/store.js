import { configureStore } from '@reduxjs/toolkit';
import { beersReducer } from '../features/beers/beersSlice';
import { loginReducer } from '../features/login/loginSlice'

export default configureStore({
  reducer: {
    login: loginReducer,
    beers: beersReducer,
  },
});
