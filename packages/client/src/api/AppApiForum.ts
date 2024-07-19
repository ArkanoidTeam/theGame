import { APP_API_ENDPOINTS } from '../utils/constants/api'
import { axiosInstance } from './AxiosInstance'
import { APP_API } from '../utils/constants/api'

const headers = {
  'Content-Type': 'application/json',
}

const instance = axiosInstance(APP_API, headers)

export const AppApiForum = {
  getThemes() {
    return instance.get<ForumThemeVm[]>(APP_API_ENDPOINTS.THEMES)
  },

  createTheme(data: ForumThemeDto) {
    return instance.post(APP_API_ENDPOINTS.THEMES, data)
  },

  getTheme(id: number) {
    return instance.get<ForumThemeVm>(`${APP_API_ENDPOINTS.THEMES}/${id}`)
  },

  createMessage(data: ForumMessageDto) {
    return instance.post(APP_API_ENDPOINTS.MESSAGES, data)
  },
}
