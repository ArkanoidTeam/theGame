import React, { FC, useState } from 'react'
import { Button, DialogActions } from '@mui/material'
import {
  Header,
  Footer,
  FooterButtonsContainer,
  StyledContainer,
  StyledWrapper,
  PageContainer,
  MainContent,
  VerticalDivider,
} from './styled'
import { useNavigate } from 'react-router-dom'
import { Typography } from '../../components/Typography'
import GameOverDialog from './GameOverDialog'
import GameWinDialog from './GameWinDialog'
import { Modal } from '../../components'

interface LevelProps {
  levelNumber: number
}

const Level: FC<LevelProps> = ({ levelNumber }) => {
  return <Typography context={`Уровень: ${levelNumber.toString()}`} />
}

interface ScoreProps {
  scoreValue: number
}

const Score: FC<ScoreProps> = ({ scoreValue }) => {
  return <Typography context={`Уровень: ${scoreValue.toString()}`} />
}

interface UserNameProps {
  userName: string
}

const UserName: FC<UserNameProps> = ({ userName }) => {
  return <Typography component="div" context={userName} />
}

const Arkanoid: FC = () => {
  const navigate = useNavigate()
  const [isOpen, setOpen] = useState(true)
  const [isStart, setStart] = useState(false)

  const initialLevel = 1 // Заглушка для номера уровня
  const initialScore = 100500 // Заглушка для значения очков
  const userName = 'user_name' // Заглушка для пользователя

  const handleStart = () => {
    setOpen(false)
    setStart(true)
  }

  const handleCancel = () => {
    setOpen(false)
    navigate('/')
  }

  return (
    <PageContainer>
      <Header>
        <Level levelNumber={initialLevel} />
        <Score scoreValue={initialScore} />
        <UserName userName={userName} />
      </Header>
      <MainContent>
        <StyledContainer component="main" maxWidth="md">
          <StyledWrapper />
        </StyledContainer>
      </MainContent>
      <Footer>
        <FooterButtonsContainer>
          <Button variant="text" className="logout">
            Начать заново
          </Button>
          <VerticalDivider />
          <Button
            variant="text"
            className="logout"
            onClick={() => setStart(!isStart)}>
            {isStart ? 'Стоп' : 'Старт'}
          </Button>
          <VerticalDivider />
          <Button
            variant="text"
            className="logout"
            onClick={() => navigate('/')}>
            Выйти
          </Button>
        </FooterButtonsContainer>
      </Footer>
      <Modal
        open={isOpen}
        onClose={handleCancel}
        title="Правила игры"
        content="Краткое описание правил игры..."
        footerButtons={
          <DialogActions>
            <Button variant="contained" onClick={handleStart} autoFocus>
              К игре
            </Button>
            <Button onClick={handleCancel}>Отмена</Button>
          </DialogActions>
        }
      />
      <GameOverDialog />
      <GameWinDialog />
    </PageContainer>
  )
}

export default Arkanoid
