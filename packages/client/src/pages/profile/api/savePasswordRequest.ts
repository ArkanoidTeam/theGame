import { YandexApiUsers } from '../../../api/YandexApiUsers'

export default function savePasswordRequest(
  oldPassword: string,
  newPassword: string
) {
  const body = JSON.stringify({ oldPassword, newPassword })
  return YandexApiUsers.password(body)
    .then(data => data)
    .catch(err => {
      throw err
    })
}
