type User = {
  [key: string]: string | number | null
  id: number
  login: string
  password: string
  email: string
  first_name: string
  second_name: string
  display_name: string
  phone: string
  avatar: string | null
}

type SignupData = {
  first_name: string
  second_name: string
  login: string
  email: string
  password: string
  password_repeat: string
  phone: string
}

type SignInData = {
  login: string
  password: string
}

type ProfileData = {
  first_name: string
  second_name: string
  display_name: string
  login: string
  email: string
  phone: string
}
