export const YANDEX_OAUTH_API_URI = 'https://oauth.yandex.ru/authorize?response_type=code'
export const YANDEX_OAUTH_REDIRECT_URI = `${window.location.protocol}//${window.location.host}`
export const BASE_API_URI = 'https://ya-praktikum.tech/api/v2'

export enum ENDPOINTS {
  SIGN_IN = '/auth/signin',
  SIGN_UP = '/auth/signup',
  LOGOUT = '/auth/logout',
  USER = '/auth/user',

  OAUTH_SIGN_IN = '/oauth/yandex',
  OAUTH_GET_SERVICE_ID = '/oauth/yandex/service-id',

  PROFILE = '/user/profile',
  AVATAR = '/user/profile/avatar',
  PASSWORD = '/user/password',
  SEARCH = '/user/search',
}
