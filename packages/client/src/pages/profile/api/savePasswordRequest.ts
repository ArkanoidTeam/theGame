import YandexApiUsers from '../../../api/YandexApiUsers'

export default function savePasswordRequest(
  oldPassword: string,
  newPassword: string
) {
  const request = new YandexApiUsers()
  const body = JSON.stringify({ oldPassword, newPassword })
  return request
    .password(body)
    .then(data => data)
    .catch(err => {
      throw err
    })
}
