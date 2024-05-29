import YandexApiAuth from '../../../api/YandexApiAuth'

export default function userRequest(): Promise<unknown> {
  const request = new YandexApiAuth()
  return request
    .user()
    .then(data => data)
    .catch(err => {
      throw err
    })
}
