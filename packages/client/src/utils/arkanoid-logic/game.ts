import {
  BrickGap,
  BrickHeight,
  BrickWidth,
  WallSize,
  colorMap,
} from '../constants/game_utils'
import { level1 } from '../constants/levels'
import { Ball } from './ball'
import { Paddle } from './paddle'
interface Brick {
  x: number
  y: number
  width: number
  height: number
  color: string
}

interface CollidableObject {
  x: number
  y: number
  width: number
  height: number
}
export class Game {
  canvas: HTMLCanvasElement
  context: CanvasRenderingContext2D
  bricks: Brick[]
  paddle: Paddle
  ball: Ball
  level: number

  constructor(canvas: HTMLCanvasElement, context: CanvasRenderingContext2D) {
    this.canvas = canvas
    this.context = context
    this.bricks = []
    this.paddle = new Paddle(canvas)
    this.ball = new Ball(canvas)
    this.level = 1
  }

  init() {
    this.createBricks()
    this.loop()
    this.eventListeners()
  }

  createBricks() {
    for (let row = 0; row < level1.length; row++) {
      for (let col = 0; col < level1[row].length; col++) {
        const colorCode = level1[row][col]

        this.bricks.push({
          x: WallSize + (BrickWidth + BrickGap) * col,
          y: WallSize + (BrickHeight + BrickGap) * row,
          color: colorMap[colorCode],
          width: BrickWidth,
          height: BrickHeight,
        })
      }
    }
  }
  collides(obj1: CollidableObject, obj2: CollidableObject) {
    return (
      obj1.x < obj2.x + obj2.width &&
      obj1.x + obj1.width > obj2.x &&
      obj1.y < obj2.y + obj2.height &&
      obj1.y + obj1.height > obj2.y
    )
  }
  loop() {
    requestAnimationFrame(() => this.loop())
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height)
    if (this.collides(this.ball, this.paddle)) {
      this.ball.dy *= -1

      // сдвигаем шарик выше платформы, чтобы на следующем кадре это снова не засчиталось за столкновение
      this.ball.y = this.paddle.y - this.ball.height

      this.ball.update()
    }

    for (let i = 0; i < this.bricks.length; i++) {
      // берём очередной кирпич
      const brick = this.bricks[i]

      // если было касание
      if (this.collides(this.ball, brick)) {
        // убираем кирпич из массива
        this.bricks.splice(i, 1)

        // если шарик коснулся кирпича сверху или снизу — меняем направление движения шарика по оси Y
        if (
          this.ball.y + this.ball.height - this.ball.speed <= brick.y ||
          this.ball.y >= brick.y + brick.height - this.ball.speed
        ) {
          this.ball.dy *= -1
        }
        // в противном случае меняем направление движения шарика по оси X
        else {
          this.ball.dx *= -1
        }
        // как нашли касание — сразу выходим из цикла проверки
        break
      }
    }
    if (this.ball.y > this.canvas.height) {
      this.ball.x = 130
      this.ball.y = 260
      this.ball.dx = 0
      this.ball.dy = 0
    }
    if (this.ball.x < WallSize) {
      this.ball.x = WallSize
      this.ball.dx *= -1
    } else if (this.ball.x + this.ball.width > this.canvas.width - WallSize) {
      this.ball.x = this.canvas.width - WallSize - this.ball.width
      this.ball.dx *= -1
    }
    // проверяем верхнюю границу
    if (this.ball.y < WallSize) {
      this.ball.y = WallSize
      this.ball.dy *= -1
    }

    if (this.paddle.x < WallSize) {
      this.paddle.x = WallSize
    } else if (this.paddle.x + BrickWidth > this.canvas.width - WallSize) {
      this.paddle.x = this.canvas.width - WallSize - BrickWidth
    }
    this.paddle.update()
    this.ball.update()

    this.draw()
  }

  draw() {
    this.context.fillStyle = 'lightgrey'
    this.context.fillRect(0, 0, this.canvas.width, WallSize)
    this.context.fillRect(0, 0, WallSize, this.canvas.height)
    this.context.fillRect(
      this.canvas.width - WallSize,
      0,
      WallSize,
      this.canvas.height
    )

    if (this.ball.dx || this.ball.dy) {
      this.context.fillRect(
        this.ball.x,
        this.ball.y,
        this.ball.width,
        this.ball.height
      )
    }

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
  eventListeners() {
    document.addEventListener('keydown', e => {
      if (['ArrowLeft', 'ArrowRight'].includes(e.key)) {
        e.preventDefault()
      }

      if (e.key === 'ArrowLeft') {
        this.paddle.dx = -3
      } else if (e.key === 'ArrowRight') {
        this.paddle.dx = 3
      }

      if (e.key === ' ') {
        if (this.ball.dx === 0 && this.ball.dy === 0) {
          this.ball.dx = this.ball.speed
          this.ball.dy = this.ball.speed
          this.paddle.update()
        }
      }
    })

    document.addEventListener('keyup', e => {
      if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
        this.paddle.dx = 0
      }
    })
  }
}
