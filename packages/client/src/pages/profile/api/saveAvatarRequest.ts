import { YandexApiUsers } from '../../../api/YandexApiUsers'

export default function saveAvatarRequest(file: FormData) {
  return YandexApiUsers.avatar(file)
    .then(data => data)
    .catch(err => {
      throw err
    })
}
