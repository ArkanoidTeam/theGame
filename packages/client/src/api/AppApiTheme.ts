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

  delete(id: number) {
    return instance.delete(`${ENDPOINTS.THEMES}/${id}`)
  },

  getUserTheme(userId: number) {
    return instance.get(`${ENDPOINTS.USER_THEME}/${userId}`)
  },

  updateUserTheme(userId: number, data: object) {
    return instance.put(`${ENDPOINTS.USER_THEME}/${userId}`, data)
  },
}

export const fetchUserTheme = async (userId: number) => {
  console.log('aaa')
  try {
    const response = await ThemeApi.getUserTheme(userId)
    return response.data.theme
  } catch (error) {
    console.error('Failed to fetch user theme:', error)
    return 'light'
  }
}

export const saveUserTheme = async (userId: number, theme: number) => {
  try {
    await ThemeApi.updateUserTheme(userId, { theme })
  } catch (error) {
    console.error('Failed to save user theme:', error)
  }
}
