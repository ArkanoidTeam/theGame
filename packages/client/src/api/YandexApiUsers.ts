import { ENDPOINTS } from '../utils/constants/api'
import { axiosInstance } from './AxiosInstance'
import { BASE_API_URI } from '../utils/constants/api'

const headers = {
  'Content-Type': 'application/json',
}

const instance = axiosInstance(BASE_API_URI, headers, true)

export const YandexApiUsers = {
  profile(data: string) {
    return instance.put(ENDPOINTS.PROFILE, data)
  },

  avatar(data: FormData) {
    return instance.put(ENDPOINTS.AVATAR, data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
  },

  password(data: string) {
    return instance.put(ENDPOINTS.PASSWORD, data)
  },

  search(data: FormData) {
    return instance.post(ENDPOINTS.SEARCH, data)
  },
}
