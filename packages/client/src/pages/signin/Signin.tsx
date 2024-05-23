import { FC } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@mui/material'

const Signin: FC = () => {
  const navigate = useNavigate()
  const handleClick = () => {
    navigate('/') // путь к странице, на которую вы хотите перейти
  }
  return (
    <>
      <h1>Вход</h1>
      <Button variant="outlined" size="small" onClick={handleClick}>
        На главную
      </Button>
    </>
  )
}

export default Signin