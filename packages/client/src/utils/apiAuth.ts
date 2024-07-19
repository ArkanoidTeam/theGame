import { AppApiAuth } from '../api/AppApiAuth'

const ACCESS_TOKEN_KEY = 'accessToken'
const REFRESH_TOKEN_KEY = 'refreshToken'

// Установка токенов
const setTokens = (accessToken: string, refreshToken: string) => {
  localStorage.setItem(ACCESS_TOKEN_KEY, accessToken)
  localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken)
}

// Получение токенов
const getAccessToken = () => localStorage.getItem(ACCESS_TOKEN_KEY)
const getRefreshToken = () => localStorage.getItem(REFRESH_TOKEN_KEY)

// Удаление токенов
const clearTokens = () => {
  localStorage.removeItem(ACCESS_TOKEN_KEY)
  localStorage.removeItem(REFRESH_TOKEN_KEY)
}

export const checkApiAuth = () => {
  const accessToken = getAccessToken()
  const refreshToken = getRefreshToken()
}

export const apiAuth = async () => {
  const username = import.meta.env.VITE_APP_API_USER_LOGIN
  const password = import.meta.env.VITE_APP_API_USER_PASSWORD

  if (username && password) {
    try {
      const response = await AppApiAuth.login({ username, password })
      const { accessToken, refreshToken } = response.data
      setTokens(accessToken, refreshToken)
      console.log(response)
    } catch (err) {
      console.log(err)
    }
  } else {
    console.log('No user credentials provided by env')
  }
}
