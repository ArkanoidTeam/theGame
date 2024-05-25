import { FC } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@mui/material'

const Arkanoid: FC = () => {
  const navigate = useNavigate()
  const handleClick = () => {
    navigate('/') // путь к странице, на которую вы хотите перейти
  }
  return (
    <>
      <h1>Игра Арканоид</h1>
      <Button onClick={handleClick}>На главную</Button>
    </>
  )
}

export default Arkanoid
