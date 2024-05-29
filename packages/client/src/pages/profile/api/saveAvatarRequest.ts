import YandexApiUsers from '../../../api/YandexApiUsers'

export default function saveAvatarRequest(file: FormData) {
  const request = new YandexApiUsers()
  return request
    .avatar(file)
    .then(data => data)
    .catch(err => {
      throw err
    })
}
