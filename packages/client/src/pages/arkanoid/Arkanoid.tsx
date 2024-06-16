import { FC, useEffect, useRef, useState } from 'react'
import { Button, DialogActions } from '@mui/material'
import { Game } from '../../utils/arkanoid-logic/game'
import {
  FooterButtonsContainer,
  VerticalDivider,
  GameContainer,
  CanvasWrapper,
} from './styled'
import { useNavigate } from 'react-router-dom'
import { Header, Footer, Page, Modal, GameDialog } from '../../components'
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
  return <Typography context={`Очки: ${scoreValue.toString()}`} />
}

interface LifesScoreProps {
  lifesCount: number
}

const Lifes: FC<LifesScoreProps> = ({ lifesCount }) => {
  return <Typography context={`Жизни: ${lifesCount.toString()}`} />
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
  const [endGameModalOpen, setEndGameModalOpen] = useState(false)
  const [score, setScore] = useState(0)
  const [lifesCount, setLifesCount] = useState(3)
  const [gameInstance, setGameInstance] = useState<Game | null>(null)

  const initialLevel = 1 // Заглушка для номера уровня
  // const initialScore = 0 // Заглушка для значения очков
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

  const handleScoreChange = (score: number) => {
    setScore(score)
  }

  const handleLifesCountChange = (lifesCount: number) => {
    setLifesCount(lifesCount)
    if (lifesCount === 0) {
      handleGameEnd()
    }
  }

  const onGameRestart = () => {
    setScore(0)
    setLifesCount(3)
    if (gameInstance) {
      gameInstance.restart()
      gameInstance.subscribeToScore(handleScoreChange)
      gameInstance.subscribeToLifesCount(handleLifesCountChange)
    }
    setEndGameModalOpen(false)
  }

  const handleGameEnd = () => {
    setEndGameModalOpen(true)
  }

  useEffect(() => {
    const canvas = canvasRef.current as HTMLCanvasElement
    if (!canvas) {
      console.error('Canvas element not found')
      return
    }
    const context = canvas.getContext('2d') as CanvasRenderingContext2D
    const game = new Game(canvas, context, initialLevel, lifesCount)
    game.subscribeToScore(handleScoreChange)
    game.subscribeToLifesCount(handleLifesCountChange)
    game.init()
    setGameInstance(game)

    return () => {
      game.unsubscribeFromScore(handleScoreChange)
      game.unsubscribeFromLifesCount(handleLifesCountChange)
      game.destroy()
    }
  }, [])
  return (
    <Page>
      <Header isFill={true} justifyContent="space-between">
        <Level levelNumber={initialLevel} />
        <Score scoreValue={score} />
        <Lifes lifesCount={lifesCount} />
        <UserName userName={userName} />
      </Header>
      <GameContainer>
        <CanvasWrapper>
          <canvas id="game" ref={canvasRef} />
        </CanvasWrapper>
      </GameContainer>
      <Footer isFill={true}>
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
        footerButtons={
          <DialogActions>
            <Button variant="contained" onClick={handleStart} autoFocus>
              К игре
            </Button>
            <Button onClick={handleCancel}>Отмена</Button>
          </DialogActions>
        }>
        Краткое описание правил игры...
      </Modal>
      <GameDialog
        isOpen={endGameModalOpen}
        onClose={() => setEndGameModalOpen(false)}
        onRestart={onGameRestart}
      />
    </Page>
  )
}

export default Arkanoid
