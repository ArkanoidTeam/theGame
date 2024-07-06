import { ENDPOINTS } from '../utils/constants/api'
import { axiosInstance } from './AxiosInstance'
import { BASE_API_URI } from '../utils/constants/api'

const headers = {
  'Content-Type': 'application/json',
}

const instance = axiosInstance(BASE_API_URI, headers, true)

export const YandexApiAuth = {
  signin(data: SignInData) {
    return instance.post(ENDPOINTS.SIGN_IN, data)
  },

  signup(data: SignupData) {
    return instance.post(ENDPOINTS.SIGN_UP, data)
  },

  logout() {
    return instance.post(ENDPOINTS.LOGOUT)
  },

  user() {
    return instance.get<User>(ENDPOINTS.USER)
  },
}
