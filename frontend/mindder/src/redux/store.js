import { configureStore } from '@reduxjs/toolkit'
import { rootReducer } from './reducers';
// import {tokenSlice} from './Auth';

export const store = configureStore({
  reducer:rootReducer
  });

// export const userAction = userStateSlice.actions;
// export const tokenAction = tokenSlice.actions;

export default store;