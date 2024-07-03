import { ENDPOINTS, YANDEX_OAUTH_REDIRECT_URI } from '../utils/constants/api'
import { axiosInstance } from './AxiosInstance'

export const YandexApiOAuth = {
  signin(data: OAuthSignInData) {
    return axiosInstance.post(ENDPOINTS.OAUTH_SIGN_IN, data)
  },

  getServiceId() {
    return axiosInstance.get<OAuthServiceIdData>(`${ENDPOINTS.OAUTH_GET_SERVICE_ID}?redirect_uri=${YANDEX_OAUTH_REDIRECT_URI}`)
  },
}
