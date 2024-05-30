import { FC, useEffect, useRef, useState } from 'react'
import { Button } from '@mui/material'
import { Game } from '../../utils/arkanoid-logic/game'
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
import { Dialog } from '../../components'
import { Typography } from '../../components/Typography'

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
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current as HTMLCanvasElement
    if (!canvas) {
      console.error('Canvas element not found')
      return
    }
    const context = canvas.getContext('2d') as CanvasRenderingContext2D
    const newGame = new Game(canvas, context)
    newGame.init()
  }, [])
  return (
    <PageContainer>
      <Header>
        <Level levelNumber={initialLevel} />
        <Score scoreValue={initialScore} />
        <UserName userName={userName} />
      </Header>
      <MainContent>
        <StyledContainer component="main" maxWidth="md">
          <canvas width="400" height="500" id="game" ref={canvasRef} />
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
      <Dialog
        isOpen={isOpen}
        onClose={handleCancel}
        onConfirm={handleStart}
        title="Правила игры"
        content="Краткое описание правил игры..."
      />
    </PageContainer>
  )
}

export default Arkanoid
