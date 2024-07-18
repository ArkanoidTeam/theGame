import { AppApiAuth } from '../api/AppApiAuth'

// const ACCESS_TOKEN_KEY = 'accessToken';
// const REFRESH_TOKEN_KEY = 'refreshToken';

// Установка токенов
// const setTokens = (accessToken: string, refreshToken: string) => {
//   localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
//   localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
// };

export const apiAuth = () => {
  const username = import.meta.env.VITE_APP_API_USER_LOGIN
  const password = import.meta.env.VITE_APP_API_USER_PASSWORD
  console.log(username)
  console.log(password)

  if (username && password) {
    try {
      const response = AppApiAuth.login({ username, password })
      console.log(response)
    } catch (err) {
      console.log(err)
    }
  } else {
    console.log('No user credentials provided by env')
  }
}
