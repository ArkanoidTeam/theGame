import Http from '../utils/Http'
const BASE_API_URI = 'https://ya-praktikum.tech/api/v2'
const AUTH_PATH = '/auth'

enum ENDPOINTS {
  SIGNUP = '/signup',
  SIGIN = '/signin',
  USER = '/user',
  LOGOUT = '/logout',
}

export default class YandexApiAuth extends Http {
  options: RequestInit | undefined
  constructor() {
    super(BASE_API_URI + AUTH_PATH)
    this.options = { headers: { 'Content-Type': 'application/json' } }
  }
  signin = (body: BodyInit) => {
    return this.post(ENDPOINTS.SIGIN, {
      ...this.options,
      credentials: 'include',
      body,
    })
  }
  signup = (body: BodyInit) => {
    return this.post(ENDPOINTS.SIGNUP, {
      ...this.options,
      credentials: 'include',
      body,
    })
  }
  user = () => {
    return this.get(ENDPOINTS.USER, { ...this.options, credentials: 'include' })
  }
  logout = () => {
    return this.post(ENDPOINTS.LOGOUT, {
      ...this.options,
      credentials: 'include',
    })
  }
}
