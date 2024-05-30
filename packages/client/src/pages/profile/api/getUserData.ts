import signinRequest from './signinRequest'
import userRequest from './userRequest'

/**
 * Временная функция-заглушка для получения данных пользователя из API
 * Пробует запросить данные по пользователю, если пользователь разлогинен вернется ошибки,
 * в этом случае будет попытка залогиниться
 * @param login
 * @param password
 * @returns
 */

export default function getUserData(login: string, password: string) {
  return userRequest()
    .then((data: unknown) => {
      const userData = data as Record<string, unknown>
      if (userData.reason && userData.reason === 'Cookie is not valid') {
        return signinRequest(login, password).then(() => userRequest())
      }
      return userData
    })
    .catch(err => {
      throw err
    })
}
