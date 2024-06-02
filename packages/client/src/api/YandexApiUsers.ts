import { ENDPOINTS } from '../utils/constants/api'
import { axiosInstance } from './AxiosInstance'

export const YandexApiUsers = {
  profile(data: string) {
    return axiosInstance.put(ENDPOINTS.PROFILE, data)
  },

  avatar(data: FormData) {
    return axiosInstance.put(ENDPOINTS.AVATAR, data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
  },

  password(data: string) {
    return axiosInstance.put(ENDPOINTS.PASSWORD, data)
  },

  search(data: FormData) {
    return axiosInstance.post(ENDPOINTS.SEARCH, data)
  },
}
