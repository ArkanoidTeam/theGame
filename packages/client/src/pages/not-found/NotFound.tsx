import { FC } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@mui/material'
import { StyledBackground, StyledContainer } from './styled'
import { Typography } from '../../components/Typography'

const NotFound: FC = () => {
  const navigate = useNavigate()
  const handleClick = () => {
    navigate('/') // путь к странице, на которую вы хотите перейти
  }
  return (
    <StyledContainer style={{ flexDirection: 'column' }}>
      <Typography
        component="h1"
        variant="h3"
        context="Такой страницы не существует"
      />
      <StyledBackground />

      <Button variant="outlined" size="small" onClick={handleClick}>
        На главную
      </Button>
    </StyledContainer>
  )
}

export default NotFound
