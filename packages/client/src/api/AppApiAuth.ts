import { APP_API_ENDPOINTS } from '../utils/constants/api'
import { axiosInstance } from './AxiosInstance'
import { APP_API } from '../utils/constants/api'

const headers = {
  'Content-Type': 'application/json',
}

const instance = axiosInstance(APP_API, headers)

export const AppApiAuth = {
  register(data: { username: string; password: string }) {
    return instance.post(APP_API_ENDPOINTS.AUTH + '/register', data)
  },
  login(data: { username: string; password: string }) {
    console.log('data', data)
    return instance.post(APP_API_ENDPOINTS.AUTH + '/login', data)
  },
  refreshToken(data: { token: string }) {
    return instance.post(APP_API_ENDPOINTS.AUTH + '/refresh-token', data)
  },
}
