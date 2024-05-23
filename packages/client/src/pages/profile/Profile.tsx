import { FC } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@mui/material'

const Profile: FC = () => {
  const navigate = useNavigate()
  const handleClick = () => {
    navigate('/') // путь к странице, на которую вы хотите перейти
  }
  return (
    <>
      <h1>Профиль</h1>
      <Button variant="outlined" size="small" onClick={handleClick}>
        На главную
      </Button>
    </>
  )
}

export default Profile
