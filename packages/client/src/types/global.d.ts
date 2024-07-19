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
  login: string
  email: string
  phone: string
}

type ChangePasswordData = {
  oldPassword: string
  newPassword: string
  newPasswordAgain: string
}

type OAuthServiceIdData = {
  service_id: string
}

type OAuthSignInData = {
  code: string
  redirect_uri: string
}

type LeaderboardData = {
  data: {
    scoreArkanoidTeam: number
    userName: string
    userAvatar: string
  }
  ratingFieldName: string
  teamName: string
}
type LeaderboardALLData = {
  ratingFieldName: string
  cursor: number
  limit: number
}

type Player = {
  userName: string
  userAvatar: string
  scoreArkanoidTeam: number
}

type ForumThemeVm = {
  id: number
  title: string
  text: string
  user_login: string
  createdAt: string
  updatedAt: string
  answers_count: number
  messages?: ForumMessageVm[]
}

type ForumThemeDto = {
  title: string
  text: string
  user_login: string
}

type ForumMessageVm = {
  id: number
  topic_id: number
  title: string
  text: string
  user_login: string
  createdAt: string
  updatedAt: string
}

type ForumMessageDto = {
  topic_id: number
  parent_id: number | null
  text: string
  user_login: string
}
