import YandexApiUsers from '../../../api/YandexApiUsers'

interface IUserData {
  first_name: string
  second_name: string
  display_name: string
  login: string
  email: string
  phone: string
}
export default function saveUserData(userData: IUserData) {
  const request = new YandexApiUsers()
  const body = JSON.stringify(userData)
  return request
    .profile(body)
    .then(data => data)
    .catch(err => {
      throw err
    })
}
