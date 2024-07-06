import { ENDPOINTS } from '../utils/constants/api'
import { axiosInstance } from './AxiosInstance'
import { BASE_API_URI } from '../utils/constants/api'

const headers = {
  'Content-Type': 'application/json',
}

const instance = axiosInstance(BASE_API_URI, headers, true)

export const YandexApiLeaderboard = {
  leaderboard(data: LeaderboardData) {
    return instance.post(ENDPOINTS.LEADERBOARD, data)
  },

  leaderboardAll(data: LeaderboardALLData) {
    return instance.post(ENDPOINTS.LEADERBOARDALL, data)
  },
}
