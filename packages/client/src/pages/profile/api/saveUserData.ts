import { YandexApiUsers } from '../../../api/YandexApiUsers'

export default function saveUserData(userData: ProfileData) {
  const body = JSON.stringify(userData)
  return YandexApiUsers.profile(body)
    .then(data => data)
    .catch(err => {
      throw err
    })
}
