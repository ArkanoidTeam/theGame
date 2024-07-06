import { ENDPOINTS, YANDEX_OAUTH_REDIRECT_URI } from '../utils/constants/api'
import { axiosInstance } from './AxiosInstance'
import { BASE_API_URI } from '../utils/constants/api'

const headers = {
  'Content-Type': 'application/json',
}

const instance = axiosInstance(BASE_API_URI, headers, true)

export const YandexApiOAuth = {
  signin(data: OAuthSignInData) {
    return instance.post(ENDPOINTS.OAUTH_SIGN_IN, data)
  },

  getServiceId() {
    return instance.get<OAuthServiceIdData>(
      `${ENDPOINTS.OAUTH_GET_SERVICE_ID}?redirect_uri=${YANDEX_OAUTH_REDIRECT_URI}`
    )
  },
}
