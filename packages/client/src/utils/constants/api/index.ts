export const BASE_API_URI = 'https://ya-praktikum.tech/api/v2'

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
