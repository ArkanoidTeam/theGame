import { APP_API_ENDPOINTS } from '../utils/constants/api'
import { axiosInstance } from './AxiosInstance'
import { APP_API } from '../utils/constants/api'

const headers = {
  'Content-Type': 'application/json',
}

const instance = axiosInstance(APP_API, headers)

export const AppApiForum = {
  getTopics() {
    return instance.get(APP_API_ENDPOINTS.FORUM + '/topics')
  },
}
