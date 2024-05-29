import Http from '../utils/Http'
const BASE_API_URI = 'https://ya-praktikum.tech/api/v2'
const AUTH_PATH = '/user'

enum ENDPOINTS {
  PROFILE = '/profile',
  AVATAR = '/profile/avatar',
  PASSWORD = '/password',
  SEARCH = '/search',
}

export default class YandexApiUsers extends Http {
  options: RequestInit | undefined
  constructor() {
    super(BASE_API_URI + AUTH_PATH)
    this.options = { headers: { 'Content-Type': 'application/json' } }
  }
  profile = (body: BodyInit) => {
    return this.put(ENDPOINTS.PROFILE, {
      ...this.options,
      credentials: 'include',
      body,
    })
  }
  avatar = (body: BodyInit) => {
    return this.put(ENDPOINTS.AVATAR, { credentials: 'include', body })
  }
  password = (body: BodyInit) => {
    return this.put(ENDPOINTS.PASSWORD, {
      ...this.options,
      credentials: 'include',
      body,
    })
  }
  search = (body: BodyInit) => {
    return this.post(ENDPOINTS.SEARCH, {
      ...this.options,
      credentials: 'include',
      body,
    })
  }
}
