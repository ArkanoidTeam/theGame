export const YANDEX_OAUTH_API_URI =
  'https://oauth.yandex.ru/authorize?response_type=code'
export const YANDEX_OAUTH_REDIRECT_URI = new URL(import.meta.url).origin
export const BASE_API_URI = 'https://ya-praktikum.tech/api/v2'
export const APP_API =
  (import.meta.env.SERVER_URI || 'http://localhost') +
  ':' +
  (import.meta.env.SERVER_PORT || '3001') +
  '/api'
// const url = new URL(import.meta.url).origin

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

  LEADERBOARD = '/leaderboard',
  LEADERBOARDALL = '/leaderboard/all',
}

export enum APP_API_ENDPOINTS {
  FORUM = '/forum',
}
