import { createSlice } from '@reduxjs/toolkit'
import { RootState } from '..'

interface IUser {
  name: string
  email?: string
}

interface IAuthState {
  isAuth: boolean
  accessToken?: string | null
  user: IUser
}

const initialState: IAuthState = {
  isAuth: false,
  accessToken: null,
  user: { name: '', email: '' },
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (
      state: IAuthState,
      action: { payload: IAuthState; type: string }
    ) => {
      state.isAuth = action.payload.isAuth
      state.user = action.payload.user
      state.accessToken = action.payload.accessToken
    },
    logout: (state: IAuthState) => {
      ;(state.isAuth = false),
        (state.accessToken = null),
        (state.user = { name: '', email: '' })
    },
  },
})

export const { logout, login } = authSlice.actions
export const getAuthStatus = (state: RootState) => state.auth.isAuth
export const getAccessToken = (state: RootState) => state.auth.accessToken
export const getUserInfo = (state: RootState) => state.auth.user

export default authSlice.reducer
