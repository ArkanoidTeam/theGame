import { configureStore, combineReducers } from '@reduxjs/toolkit'
import authReducer from './auth'
// store

enum ReducerName {
  Auth = 'auth',
}

const rootReducer = combineReducers({
  [ReducerName.Auth]: authReducer,
})

const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware => getDefaultMiddleware(),
})

export type RootState = ReturnType<typeof rootReducer>
export type AppDispatch = typeof store.dispatch

export default store
