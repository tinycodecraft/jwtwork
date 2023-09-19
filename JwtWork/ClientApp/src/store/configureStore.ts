import authReducer from './authSlice';
import formReducer from './formSlice';
import weatherReducer from './weatherSlice';
import { configureStore } from '@reduxjs/toolkit'
import {createLogger } from 'redux-logger'

const logger = createLogger()

export const store = configureStore({
  reducer: {
    auth: authReducer,
    form: formReducer,
    weather: weatherReducer
  },
  middleware: (getDefaultMiddleware)=> getDefaultMiddleware().concat(logger)
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;

// Inferred type: {auth: AuthState, form: FormState, weather: WeatherState}
export type AppDispatch = typeof store.dispatch;