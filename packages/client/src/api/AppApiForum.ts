import { APP_API_ENDPOINTS } from '../utils/constants/api'
import axios from 'axios'
import { APP_API } from '../utils/constants/api'
import { AppApiAuth } from './AppApiAuth'

const ACCESS_TOKEN_KEY = 'accessToken'
const getAccessToken = () => localStorage.getItem(ACCESS_TOKEN_KEY)

const headers: { 'Content-Type': string; Authorization?: string } = {
  'Content-Type': 'application/json',
}

// const instance = axiosInstance(APP_API, headers)

export const AppApiForum = {
  async getTopics() {
    const accessTokenExist = await checkAccessTokenExist()
    if (accessTokenExist) {
      try {
        const accessToken = getAccessToken()
        headers['Authorization'] = `Bearer ${accessToken}`
        const response = await axios.get(APP_API_ENDPOINTS.FORUM + '/topics', {
          headers: { Authorization: `Bearer ${accessToken}` },
        })
      } catch (err) {
        console.log(err)
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
