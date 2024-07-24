import { APP_API_ENDPOINTS } from '../utils/constants/api'
import axios, { AxiosError } from 'axios'
import { APP_API } from '../utils/constants/api'
import { AppApiAuth } from './AppApiAuth'

const ACCESS_TOKEN_KEY = 'accessToken'
const getAccessToken = () => localStorage.getItem(ACCESS_TOKEN_KEY)

const headers: { 'Content-Type': string; Authorization?: string } = {
  'Content-Type': 'application/json',
}

export const AppApiForum = {
  async getThemes() {
    const accessTokenExist = await checkAccessTokenExist()
    if (accessTokenExist) {
      try {
        const accessToken = getAccessToken()
        headers['Authorization'] = `Bearer ${accessToken}`
        const response = await axios.get(APP_API + APP_API_ENDPOINTS.THEMES, {
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
          const response = await axios.get(APP_API + APP_API_ENDPOINTS.THEMES, {
            headers: { Authorization: `Bearer ${accessToken}` },
          })
          return response
        } else {
          throw error
        }
      }
    }
  },

  async createTheme(data: ForumThemeDto) {
    const accessTokenExist = await checkAccessTokenExist()
    if (accessTokenExist) {
      try {
        const accessToken = getAccessToken()
        headers['Authorization'] = `Bearer ${accessToken}`
        const response = await axios.post(
          APP_API + APP_API_ENDPOINTS.THEMES,
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
          const response = await axios.post(
            APP_API + APP_API_ENDPOINTS.THEMES,
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

  async getTheme(id: number) {
    const accessTokenExist = await checkAccessTokenExist()
    if (accessTokenExist) {
      try {
        const accessToken = getAccessToken()
        headers['Authorization'] = `Bearer ${accessToken}`
        const response = await axios.get(
          APP_API + `${APP_API_ENDPOINTS.THEMES}/${id}`,
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
            APP_API + `${APP_API_ENDPOINTS.THEMES}/${id}`,
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

  async createMessage(data: ForumMessageDto) {
    const accessTokenExist = await checkAccessTokenExist()
    if (accessTokenExist) {
      try {
        const accessToken = getAccessToken()
        headers['Authorization'] = `Bearer ${accessToken}`
        const response = await axios.post(
          APP_API + APP_API_ENDPOINTS.MESSAGES,
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
          const response = await axios.post(
            APP_API + APP_API_ENDPOINTS.MESSAGES,
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
