import authReducer from './authSlice'
import formReducer from './formSlice'
import weatherReducer from './weatherSlice'
import { configureStore, combineReducers } from '@reduxjs/toolkit'

import { createLogger } from 'redux-logger'
import sessionStorage from 'redux-persist/es/storage/session'
import { persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist'
import persistStore from 'redux-persist/es/persistStore'
import autoMergeLevel2 from 'redux-persist/es/stateReconciler/autoMergeLevel2'


const logger = createLogger()

const persistConfig = {
  key: 'root',
  storage: sessionStorage,
  whitelist: ['auth'],
  stateReconciler: autoMergeLevel2,
  
}

const rootReducer = combineReducers({
  auth: authReducer,
  form: formReducer,
  weather: weatherReducer,
})
const persistedReducer = persistReducer<ReturnType<typeof rootReducer>>(persistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(logger),
})

export const persistor = persistStore(store)
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>

// Inferred type: {auth: AuthState, form: FormState, weather: WeatherState}
export type AppDispatch = typeof store.dispatch
