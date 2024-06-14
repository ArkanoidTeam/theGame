import { BrickParams, WallSize } from '../constants/game_utils'
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

    this.context.beginPath()
    this.context.fillStyle = this.ball.color
    this.drawRoundedRect(
      this.ball.x,
      this.ball.y,
      this.ball.width,
      this.ball.height,
      this.ball.width / 2
    )
    this.context.fill()
    this.context.closePath()

    this.bricks.forEach(brick => {
      this.context.beginPath()
      this.context.fillStyle = brick.color
      this.drawRoundedRect(
        brick.x,
        brick.y,
        brick.width,
        brick.height,
        BrickParams.borderRadius
      )
      this.context.fill()
      this.context.closePath()
    })

    this.context.beginPath()
    this.context.fillStyle = this.paddle.color
    this.drawRoundedRect(
      this.paddle.x,
      this.paddle.y,
      this.paddle.width,
      this.paddle.height,
      this.paddle.height / 2
    )
    this.context.fill()
    this.context.closePath()
  }

  private drawRoundedRect(
    x: number,
    y: number,
    width: number,
    height: number,
    radius: number
  ) {
    this.context.beginPath()
    this.context.moveTo(x + radius, y)
    this.context.arcTo(x + width, y, x + width, y + height, radius)
    this.context.arcTo(x + width, y + height, x, y + height, radius)
    this.context.arcTo(x, y + height, x, y, radius)
    this.context.arcTo(x, y, x + width, y, radius)
    this.context.closePath()
    this.context.fill()
  }
}
