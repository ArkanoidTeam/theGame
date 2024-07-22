import User from './models/User'
export const apiUserInit = async () => {
  try {
    const { APP_API_USER_LOGIN, APP_API_USER_PASSWORD } = process.env
    if (!APP_API_USER_LOGIN || !APP_API_USER_PASSWORD) {
      console.log('No api user credentials provided')
      return
    }
    await User.create({
      username: APP_API_USER_LOGIN,
      password: APP_API_USER_PASSWORD,
    })
    console.log('Api user created successfully')
  } catch (err) {
    const error = err as Record<string, Record<string, unknown>>
    const message = error?.original?.detail
      ? (error?.original?.detail as string)
      : null
    if (message && message.match('already exists')) {
      console.log('Api user already exists')
    } else {
      console.log(error.message)
    }
  }
}
