import { WallSize } from '../constants/game_utils'
import { Ball } from './ball'
import { Paddle } from './paddle'
interface Brick {
  x: number
  y: number
  width: number
  height: number
  color: string
}
export class Drawer {
  private context: CanvasRenderingContext2D
  private canvas: HTMLCanvasElement
  private bricks: Brick[]
  private ball: Ball
  private paddle: Paddle

  constructor(
    context: CanvasRenderingContext2D,
    canvas: HTMLCanvasElement,
    ball: Ball,
    paddle: Paddle,
    bricks: Brick[]
  ) {
    this.canvas = canvas
    this.context = context
    this.bricks = bricks
    this.ball = ball
    this.paddle = paddle
  }

  public draw() {
    this.context.fillStyle = 'white'
    this.context.fillRect(0, 0, this.canvas.width, WallSize)
    this.context.fillRect(0, 0, WallSize, this.canvas.height)
    this.context.fillRect(
      0,
      this.canvas.height - WallSize,
      this.canvas.width,
      this.canvas.height
    )
    this.context.fillRect(
      this.canvas.width - WallSize,
      0,
      WallSize,
      this.canvas.height - WallSize
    )

    this.context.fillStyle = 'lightgrey'
    this.context.fillRect(
      this.ball.x,
      this.ball.y,
      this.ball.width,
      this.ball.height
    )

    this.bricks.forEach(brick => {
      this.context.fillStyle = brick.color
      this.context.fillRect(brick.x, brick.y, brick.width, brick.height)
    })

    this.context.fillStyle = 'red'
    this.context.fillRect(
      this.paddle.x,
      this.paddle.y,
      this.paddle.width,
      this.paddle.height
    )
  }
}
