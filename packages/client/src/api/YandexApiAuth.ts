import { ENDPOINTS } from '../utils/constants/api'
import { axiosInstance } from './AxiosInstance'

export const YandexApiAuth = {
  signin(data: SignInData) {
    return axiosInstance.post(ENDPOINTS.SIGN_IN, data)
  },

  signup(data: SignupData) {
    return axiosInstance.post(ENDPOINTS.SIGN_UP, data)
  },

  logout() {
    return axiosInstance.post(ENDPOINTS.LOGOUT)
  },

  user() {
    return axiosInstance.get<User>(ENDPOINTS.USER)
  },
}
