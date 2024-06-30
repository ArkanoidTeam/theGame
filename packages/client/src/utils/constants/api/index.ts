export const BASE_API_URI = 'https://ya-praktikum.tech/api/v2'
export const APP_API =
  (import.meta.env.SERVER_URI || 'http://localhost') +
  ':' +
  (import.meta.env.SERVER_PORT || '3001') +
  '/api'

export enum ENDPOINTS {
  SIGN_IN = '/auth/signin',
  SIGN_UP = '/auth/signup',
  LOGOUT = '/auth/logout',
  USER = '/auth/user',

  PROFILE = '/user/profile',
  AVATAR = '/user/profile/avatar',
  PASSWORD = '/user/password',
  SEARCH = '/user/search',
}

export enum APP_API_ENDPOINTS {
  FORUM = '/forum',
}
