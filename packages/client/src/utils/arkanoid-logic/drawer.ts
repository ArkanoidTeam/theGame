import { BrickParams, WallSize } from '../constants/game_utils'
import { Ball } from './ball'
import { Paddle } from './paddle'
import { Brick } from './brick'
import { Tooltip } from './tooltip'
import { Bonus } from '../constants/levels'
export class Drawer {
  private context: CanvasRenderingContext2D
  private canvas: HTMLCanvasElement
  private bricks: Brick[]
  private ball: Ball
  private paddle: Paddle
  private tooltips: Tooltip[]

  constructor(
    context: CanvasRenderingContext2D,
    canvas: HTMLCanvasElement,
    ball: Ball,
    paddle: Paddle,
    bricks: Brick[],
    tooltips: Tooltip[]
  ) {
    this.canvas = canvas
    this.context = context
    this.bricks = bricks
    this.ball = ball
    this.paddle = paddle
    this.tooltips = tooltips
  }

  public draw(brickWidthComputed: number) {
    // Рисование подсказок
    this.context.font = '14px Arial'
    this.context.fillStyle = 'black'
    this.tooltips.forEach(tooltip => {
      tooltip.draw(this.context)
    })

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
    this.context.fillStyle = this.ball.power > 1 ? 'red' : this.ball.color
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
      if (!brick.visible) {
        this.context.globalAlpha = 0 // Прозрачность для невидимых кирпичей
      } else {
        this.context.globalAlpha = 1 // Полная непрозрачность для видимых
      }
      this.drawRoundedRect(
        brick.x,
        brick.y,
        brick.width,
        brick.height,
        BrickParams.borderRadius
      )
      this.context.fill()
      this.context.closePath()
      // Рисование иконок бонусов, если они есть
      if (brick.bonus) {
        this.drawBonusIcon(brick.x, brick.y, brick.bonus, brickWidthComputed)
      }
    })

    // Сброс глобальной прозрачности после отрисовки кирпичей
    this.context.globalAlpha = 1

    this.context.beginPath()
    this.context.fillStyle = this.paddle.speed > 4 ? 'blue' : this.paddle.color
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

  private drawBonusIcon(
    x: number,
    y: number,
    bonus: Bonus,
    brickWidthComputed: number
  ) {
    const size = 16 // Размер иконки
    let icon = ''

    // Определение иконки в зависимости от типа бонуса
    if (bonus.entity === 'paddle' && bonus.property === 'width') {
      icon = '➡️' // Иконка для увеличения платформы
    } else if (bonus.entity === 'ball' && bonus.property === 'power') {
      icon = '💪' // Иконка для увеличения силы шарика
    } else if (bonus.entity === 'paddle' && bonus.property === 'speed') {
      icon = '🚀' // Иконка для увеличения скорости платформы
    } else if (bonus.entity === 'game' && bonus.property === 'lifesCount') {
      icon = '❤️' // Иконка для увеличения жизней
    } else if (bonus.entity === 'brick' && bonus.property === 'score') {
      icon = '💰' // Иконка для увеличения жизней
    }

    if (icon) {
      this.context.font = `${size}px Arial`
      this.context.textAlign = 'center'
      this.context.textBaseline = 'middle'
      this.context.fillText(
        icon,
        x + brickWidthComputed / 2,
        y + 1 + BrickParams.height / 2
      )
    }
  }
}
