import { FC, useState } from 'react'
import Profile from './Profile'

export const fields = {
  login: { label: 'Логин', placeholder: 'Логин', type: 'text' },
  email: { label: 'Почта', placeholder: 'Почта', type: 'email' },
  first_name: { label: 'Имя', placeholder: 'Имя', type: 'text' },
  second_name: { label: 'Фамилия', placeholder: 'Фамилия', type: 'text' },
  display_name: {
    label: 'Имя в чате',
    placeholder: 'Имя в чате',
    type: 'text',
  },
  phone: { label: 'Телефон', placeholder: '+7 (000) 000-00-00', type: 'tel' },
  new_password: {
    label: 'Новый пароль',
    placeholder: 'Новый пароль',
    type: 'password',
  },
  new_password_again: {
    label: 'Новый пароль еще раз',
    placeholder: 'Новый пароль еще раз',
    type: 'password',
  },
  old_password: {
    label: 'Старый пароль',
    placeholder: 'Старый пароль',
    type: 'password',
  },
}

const mockUserData: User = {
  login: 'mockUser',
  password: 'mockPassword',
  email: 'mockUser@some-domain.com',
  first_name: 'Иван',
  second_name: 'Иванов',
  display_name: 'dominator_xxx',
  phone: '+7 (123) 456-78-90',
  avatar: null,
}

const ProfileHoc: FC = () => {
  const [userData, setUserData] = useState(mockUserData)

  return <Profile propUserData={userData} />
}

export default ProfileHoc
