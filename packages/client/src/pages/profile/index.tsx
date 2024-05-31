import { FC, useState, useEffect } from 'react'
import Profile from './Profile'
import getUserData from './api/getUserData'
import CircularProgress from '@mui/material/CircularProgress'

const ProfileHoc: FC = () => {
  const [userData, setUserData] = useState<User | null>(null)
  const [loading, setLoading] = useState(false)

  const fetchData = async () => {
    setLoading(true)
    try {
      const data = (await getUserData()) as User
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
