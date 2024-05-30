import { FC, useEffect, useRef } from 'react'
import { Container } from './styled'
import { Game } from '../../utils/arkanoid-logic/game'

const Arkanoid: FC = () => {
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
    <Container>
      <canvas width="400" height="500" id="game" ref={canvasRef} />
    </Container>
  )
}

export default Arkanoid
