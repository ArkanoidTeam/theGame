import YandexApiAuth from '../../../api/YandexApiAuth'

export default function signinRequest(login: string, password: string) {
  const request = new YandexApiAuth()
  const body = JSON.stringify({ login, password })
  return request
    .signin(body)
    .then(data => data)
    .catch(err => {
      throw err
    })
}
