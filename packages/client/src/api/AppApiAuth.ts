import { APP_API_ENDPOINTS } from '../utils/constants/api'
import { axiosInstance } from './AxiosInstance'
import { APP_API } from '../utils/constants/api'

const ACCESS_TOKEN_KEY = 'accessToken'
const REFRESH_TOKEN_KEY = 'refreshToken'

// Установка токенов в localStorage
const setTokens = (accessToken: string, refreshToken: string) => {
  localStorage.setItem(ACCESS_TOKEN_KEY, accessToken)
  localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken)
}

// Получение токенов из localStorage
const getRefreshToken = () => localStorage.getItem(REFRESH_TOKEN_KEY)

const headers = {
  'Content-Type': 'application/json',
}

const instance = axiosInstance(APP_API, headers)

export const AppApiAuth = {
  async register(data: { username: string; password: string }) {
    try {
      const response = await instance.post(
        APP_API_ENDPOINTS.AUTH + '/register',
        data
      )
      return response
    } catch (err) {
      console.log(err)
    }
  },
  async login(data: { username: string; password: string }) {
    try {
      const response = await instance.post(
        APP_API_ENDPOINTS.AUTH + '/login',
        data
      )
      const { accessToken, refreshToken } = response.data
      setTokens(accessToken, refreshToken)
    } catch (err) {
      console.log(err)
      throw new Error('Error occured by user login')
    }
  },
  async refreshToken() {
    const token = getRefreshToken()
    if (!token) throw new Error('No refresh token available')
    try {
      const response = await instance.post(
        APP_API_ENDPOINTS.AUTH + '/refresh-token',
        { token }
      )
      const { accessToken, refreshToken } = response.data
      setTokens(accessToken, refreshToken)
    } catch (err) {
      console.log(err)
      throw new Error('Error occured by refresing token')
    }
  },
}
