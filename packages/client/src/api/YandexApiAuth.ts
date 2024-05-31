import { END_POINTS } from '../utils/constants/api'
import { axiosInstance } from './AxiosInstance'

export const YandexApiAuth = {
  signin(data: SignInData) {
    return axiosInstance.post(END_POINTS.SIGN_IN, data)
  },

  signup(data: SignupData) {
    return axiosInstance.post(END_POINTS.SIGN_UP, data)
  },

  logout() {
    return axiosInstance.post(END_POINTS.LOGOUT)
  },

  user() {
    return axiosInstance.get(END_POINTS.USER)
  },
}
