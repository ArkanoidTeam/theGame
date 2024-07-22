import { AppApiAuth } from '../api/AppApiAuth'

export const apiAuth = async () => {
  const username = import.meta.env.VITE_APP_API_USER_LOGIN
  const password = import.meta.env.VITE_APP_API_USER_PASSWORD

  if (username && password) {
    try {
      await AppApiAuth.login({ username, password })
    } catch (err) {
      console.log(err)
    }
  } else {
    console.log('No user credentials provided by env')
  }
}
