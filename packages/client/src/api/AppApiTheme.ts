import { APP_API, ENDPOINTS } from '../utils/constants/api'
import axios, { AxiosError } from 'axios'
import { AppApiAuth } from './AppApiAuth'

const ACCESS_TOKEN_KEY = 'accessToken'
const getAccessToken = () => localStorage.getItem(ACCESS_TOKEN_KEY)

const headers: { 'Content-Type': string; Authorization?: string } = {
  'Content-Type': 'application/json',
}

export const ThemeApi = {
  async create(data: object) {
    const accessTokenExist = await checkAccessTokenExist()
    if (accessTokenExist) {
      try {
        const accessToken = getAccessToken()
        headers['Authorization'] = `Bearer ${accessToken}`
        const response = await axios.post(APP_API + ENDPOINTS.THEMES, data, {
          headers: { Authorization: `Bearer ${accessToken}` },
        })
        return response
      } catch (err) {
        const error = err as AxiosError
        if (error.response && error.response.status === 401) {
          // Попытка обновить токен при 401 ошибке (неавторизован)
          await AppApiAuth.refreshToken()
          const accessToken = getAccessToken()
          headers['Authorization'] = `Bearer ${accessToken}`
          const response = await axios.post(APP_API + ENDPOINTS.THEMES, data, {
            headers: { Authorization: `Bearer ${accessToken}` },
          })
          return response
        } else {
          throw error
        }
      }
    }
  },

  async getAll() {
    const accessTokenExist = await checkAccessTokenExist()
    if (accessTokenExist) {
      try {
        const accessToken = getAccessToken()
        headers['Authorization'] = `Bearer ${accessToken}`
        const response = await axios.get(APP_API + ENDPOINTS.THEMES, {
          headers: { Authorization: `Bearer ${accessToken}` },
        })
        return response
      } catch (err) {
        const error = err as AxiosError
        if (error.response && error.response.status === 401) {
          // Попытка обновить токен при 401 ошибке (неавторизован)
          await AppApiAuth.refreshToken()
          const accessToken = getAccessToken()
          headers['Authorization'] = `Bearer ${accessToken}`
          const response = await axios.get(APP_API + ENDPOINTS.THEMES, {
            headers: { Authorization: `Bearer ${accessToken}` },
          })
          return response
        } else {
          throw error
        }
      }
    }
  },

  async getById(id: number) {
    const accessTokenExist = await checkAccessTokenExist()
    if (accessTokenExist) {
      try {
        const accessToken = getAccessToken()
        headers['Authorization'] = `Bearer ${accessToken}`
        const response = await axios.get(
          APP_API + `${ENDPOINTS.THEMES}/${id}`,
          {
            headers: { Authorization: `Bearer ${accessToken}` },
          }
        )
        return response
      } catch (err) {
        const error = err as AxiosError
        if (error.response && error.response.status === 401) {
          // Попытка обновить токен при 401 ошибке (неавторизован)
          await AppApiAuth.refreshToken()
          const accessToken = getAccessToken()
          headers['Authorization'] = `Bearer ${accessToken}`
          const response = await axios.get(
            APP_API + `${ENDPOINTS.THEMES}/${id}`,
            {
              headers: { Authorization: `Bearer ${accessToken}` },
            }
          )
          return response
        } else {
          throw error
        }
      }
    }
  },

  async delete(id: number) {
    const accessTokenExist = await checkAccessTokenExist()
    if (accessTokenExist) {
      try {
        const accessToken = getAccessToken()
        headers['Authorization'] = `Bearer ${accessToken}`
        const response = await axios.delete(
          APP_API + `${ENDPOINTS.THEMES}/${id}`,
          {
            headers: { Authorization: `Bearer ${accessToken}` },
          }
        )
        return response
      } catch (err) {
        const error = err as AxiosError
        if (error.response && error.response.status === 401) {
          // Попытка обновить токен при 401 ошибке (неавторизован)
          await AppApiAuth.refreshToken()
          const accessToken = getAccessToken()
          headers['Authorization'] = `Bearer ${accessToken}`
          const response = await axios.delete(
            APP_API + `${ENDPOINTS.THEMES}/${id}`,
            {
              headers: { Authorization: `Bearer ${accessToken}` },
            }
          )
          return response
        } else {
          throw error
        }
      }
    }
  },

  async getUserTheme(userId: number) {
    const accessTokenExist = await checkAccessTokenExist()
    if (accessTokenExist) {
      try {
        const accessToken = getAccessToken()
        headers['Authorization'] = `Bearer ${accessToken}`
        const response = await axios.get(
          APP_API + `${ENDPOINTS.USER_THEME}/${userId}`,
          {
            headers: { Authorization: `Bearer ${accessToken}` },
          }
        )
        return response
      } catch (err) {
        const error = err as AxiosError
        if (error.response && error.response.status === 401) {
          // Попытка обновить токен при 401 ошибке (неавторизован)
          await AppApiAuth.refreshToken()
          const accessToken = getAccessToken()
          headers['Authorization'] = `Bearer ${accessToken}`
          const response = await axios.get(
            APP_API + `${ENDPOINTS.USER_THEME}/${userId}`,
            {
              headers: { Authorization: `Bearer ${accessToken}` },
            }
          )
          return response
        } else {
          throw error
        }
      }
    }
  },

  async updateUserTheme(userId: number, data: object) {
    const accessTokenExist = await checkAccessTokenExist()
    if (accessTokenExist) {
      try {
        const accessToken = getAccessToken()
        headers['Authorization'] = `Bearer ${accessToken}`
        const response = await axios.put(
          APP_API + `${ENDPOINTS.USER_THEME}/${userId}`,
          data,
          {
            headers: { Authorization: `Bearer ${accessToken}` },
          }
        )
        return response
      } catch (err) {
        const error = err as AxiosError
        if (error.response && error.response.status === 401) {
          // Попытка обновить токен при 401 ошибке (неавторизован)
          await AppApiAuth.refreshToken()
          const accessToken = getAccessToken()
          headers['Authorization'] = `Bearer ${accessToken}`
          const response = await axios.put(
            APP_API + `${ENDPOINTS.USER_THEME}/${userId}`,
            data,
            {
              headers: { Authorization: `Bearer ${accessToken}` },
            }
          )
          return response
        } else {
          throw error
        }
      }
    }
  },
}

export const fetchUserTheme = async (userId: number) => {
  try {
    const resp = (await ThemeApi.getUserTheme(userId)) as unknown
    const response = resp as Record<string, Record<string, unknown>>
    return response.data.theme
  } catch (error) {
    console.error('Failed to fetch user theme:', error)
    return 'light'
  }
}

export const saveUserTheme = async (userId: number, themeId: number) => {
  try {
    await ThemeApi.updateUserTheme(userId, { themeId })
  } catch (error) {
    console.error('Failed to save user theme:', error)
  }
}

const checkAccessTokenExist = async () => {
  const accessToken = getAccessToken()
  if (!accessToken) {
    const username = import.meta.env.VITE_APP_API_USER_LOGIN
    const password = import.meta.env.VITE_APP_API_USER_PASSWORD

    if (username && password) {
      try {
        await AppApiAuth.login({ username, password })
        return true
      } catch (err) {
        console.log(err)
        return false
      }
    } else {
      return false
    }
  } else {
    return true
  }
}
