import { FC } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@mui/material'

const Unavailable: FC = () => {
  const navigate = useNavigate()
  const handleClick = () => {
    navigate('/') // путь к странице, на которую вы хотите перейти
  }
  return (
    <>
      <h1>Error 500, уже чиним!</h1>
      <Button onClick={handleClick}>На главную</Button>
    </>
  )
}

export default Unavailable
