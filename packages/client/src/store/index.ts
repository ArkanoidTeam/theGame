import { configureStore, combineReducers } from '@reduxjs/toolkit'
import authReducer from './auth'
import themeReducer from './theme'

enum ReducerName {
  Auth = 'auth',
}

enum ThemeName {
  Theme = 'theme',
}

const rootReducer = combineReducers({
  [ReducerName.Auth]: authReducer,
  [ThemeName.Theme]: themeReducer,
})

const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware => getDefaultMiddleware(),
})

export type RootState = ReturnType<typeof rootReducer>
export type AppDispatch = typeof store.dispatch

export default store
