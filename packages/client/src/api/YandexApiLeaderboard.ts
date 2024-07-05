import { ENDPOINTS } from '../utils/constants/api'
import { axiosInstance } from './AxiosInstance'

export const YandexApiLeaderboard = {
  leaderboard(data: LeaderboardData) {
    return axiosInstance.post(ENDPOINTS.LEADERBOARD, data)
  },

  leaderboardAll(data: LeaderboardALLData) {
    return axiosInstance.post(ENDPOINTS.LEADERBOARDALL, data)
  },
}
