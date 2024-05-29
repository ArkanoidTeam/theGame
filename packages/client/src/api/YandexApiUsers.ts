import Http from '../utils/Http'
const BASE_API_URI = 'https://ya-praktikum.tech/api/v2'
const AUTH_PATH = '/user'

const PROFILE = '/profile'
const AVATAR = '/profile/avatar'
const PASSWORD = '/password'
const SEARCH = '/search'

export default class YandexApiUsers extends Http {
  options: RequestInit | undefined
  constructor() {
    super(BASE_API_URI + AUTH_PATH)
    this.options = { headers: { 'Content-Type': 'application/json' } }
  }
  profile = (body: BodyInit) => {
    return this.put(PROFILE, {
      ...this.options,
      credentials: 'include',
      body,
    })
  }
  avatar = (body: BodyInit) => {
    return this.put(AVATAR, { credentials: 'include', body })
  }
  password = (body: BodyInit) => {
    return this.put(PASSWORD, {
      ...this.options,
      credentials: 'include',
      body,
    })
  }
  search = (body: BodyInit) => {
    return this.post(SEARCH, {
      ...this.options,
      credentials: 'include',
      body,
    })
  }
}
