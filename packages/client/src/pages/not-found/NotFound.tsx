import { FC } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@mui/material'

const NotFound: FC = () => {
  const navigate = useNavigate()
  const handleClick = () => {
    navigate('/') // путь к странице, на которую вы хотите перейти
  }
  return (
    <>
      <h1>404 Not Found</h1>
      <Button onClick={handleClick}>На главную</Button>
    </>
  )
}

export default NotFound
