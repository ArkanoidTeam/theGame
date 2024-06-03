import { YandexApiAuth } from '../../../api/YandexApiAuth'

export default function userRequest(): Promise<unknown> {
  return YandexApiAuth.user()
    .then(data => data)
    .catch(err => {
      throw err
    })
}
