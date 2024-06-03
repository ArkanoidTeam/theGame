import userRequest from './userRequest'

export default function getUserData() {
  return userRequest()
    .then((data: unknown) => {
      const userData = data as Record<string, unknown>
      return userData.data
    })
    .catch(err => {
      throw err
    })
}
