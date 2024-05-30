import { FC, useState, useEffect } from 'react'
import Profile from './Profile'
import getUserData from './api/getUserData'
import CircularProgress from '@mui/material/CircularProgress'

// const mockUserData: User = {
//   login: 'mockUser',
//   password: 'mockPassword',
//   email: 'mockUser@some-domain.com',
//   first_name: 'Иван',
//   second_name: 'Иванов',
//   display_name: 'dominator_xxx',
//   phone: '+7 (123) 456-78-90',
//   avatar: null,
// }

const ProfileHoc: FC = () => {
  const [userData, setUserData] = useState<User | null>(null)
  const [loading, setLoading] = useState(false)

  const fetchData = async () => {
    setLoading(true)
    try {
      const data = (await getUserData('mockUser', 'mockPassword')) as User
      if (data.id) {
        setUserData(data)
      }
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  const onDataChanged = () => {
    fetchData()
  }

  return loading || !userData ? (
    <CircularProgress disableShrink />
  ) : (
    <Profile propUserData={userData} onDataChanged={onDataChanged} />
  )
}

export default ProfileHoc
