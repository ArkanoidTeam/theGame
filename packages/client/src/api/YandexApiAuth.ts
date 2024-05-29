import Http from '../utils/Http'
const BASE_API_URI = 'https://ya-praktikum.tech/api/v2'
const AUTH_PATH = '/auth'

const SIGNUP = '/signup'
const SIGNIN = '/signin'
const USER = '/user'
const LOGOUT = '/logout'

export default class YandexApiAuth extends Http {
  options: RequestInit | undefined
  constructor() {
    super(BASE_API_URI + AUTH_PATH)
    this.options = { headers: { 'Content-Type': 'application/json' } }
  }
  signin = (body: BodyInit) => {
    return this.post(SIGNIN, {
      ...this.options,
      credentials: 'include',
      body,
    })
  }
  signup = (body: BodyInit) => {
    return this.post(SIGNUP, {
      ...this.options,
      credentials: 'include',
      body,
    })
  }
  user = () => {
    return this.get(USER, { ...this.options, credentials: 'include' })
  }
  logout = () => {
    return this.post(LOGOUT, {
      ...this.options,
      credentials: 'include',
    })
  }
}
