import { configureStore } from '@reduxjs/toolkit'
import userReducer from './features/userSlice'
import settingsReducer from './features/settingsSlice'


export default configureStore({
 reducer:{
  counter: userReducer,
  settings: settingsReducer,
 }
});