import { ENDPOINTS } from '../utils/constants/api'
import { axiosInstance } from './AxiosInstance'
import { BASE_API_URI } from '../utils/constants/api'

const headers = {
  'Content-Type': 'application/json',
}

const instance = axiosInstance(BASE_API_URI, headers, true)

export const ThemeApi = {
  create(data: object) {
    return instance.post(ENDPOINTS.THEMES, data)
  },

  getAll() {
    return instance.get(ENDPOINTS.THEMES)
  },

  getById(id: number) {
    return instance.get(`${ENDPOINTS.THEMES}/${id}`)
  },

  update(id: number, data: object) {
    return instance.put(`${ENDPOINTS.THEMES}/${id}`, data)
  },

  delete(id: number) {
    return instance.delete(`${ENDPOINTS.THEMES}/${id}`)
  },

  getUserTheme() {
    return instance.get(ENDPOINTS.USER_THEME)
  },
}
