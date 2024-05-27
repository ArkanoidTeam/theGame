import { FC } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@mui/material'
import { Typography } from '../../components/Typography'
import { StyledBackground, StyledContainer } from './styled'

const Unavailable: FC = () => {
  const navigate = useNavigate()
  const handleClick = () => {
    navigate('/') // путь к странице, на которую вы хотите перейти
  }
  return (
    <StyledContainer style={{ flexDirection: 'column' }}>
      <Typography
        component="h1"
        variant="h3"
        context="Ошибка сервера, уже чиним!"
      />
      <StyledBackground />

      <p>Кажется, что то с сервером...</p>

      <Button variant="outlined" size="small" onClick={handleClick}>
        На главную
      </Button>
    </StyledContainer>
  )
}

export default Unavailable
