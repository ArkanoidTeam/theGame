import { END_POINTS } from '../utils/constants/api'
import { axiosInstance } from './AxiosInstance'

export const YandexApiUsers = {
  profile(data: string) {
    return axiosInstance.put(END_POINTS.PROFILE, data)
  },

  avatar(data: FormData) {
    return axiosInstance.put(END_POINTS.AVATAR, data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
  },

  password(data: string) {
    return axiosInstance.put(END_POINTS.PASSWORD, data)
  },

  search(data: FormData) {
    return axiosInstance.post(END_POINTS.SEARCH, data)
  },
}
