import {
  BrickGap,
  BrickHeight,
  BrickWidth,
  WallSize,
  colorMap,
  brickScoresMap,
} from '../constants/game_utils'
import { levels } from '../constants/levels'
import { Ball } from './ball'
import { Drawer } from './drawer'
import { Paddle } from './paddle'
interface Brick {
  x: number
  y: number
  width: number
  height: number
  scoreVal: number
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
  drawer: Drawer
  BrickWidthComputed: number
  gameInProgress: boolean
  score: number
  scoreSubscribers = new Set<(score: number) => void>()
  lifeCountSubsribers = new Set<(lifesCount: number) => void>()
  lifesCount: number
  _lifesCount: number

  constructor(
    canvas: HTMLCanvasElement,
    context: CanvasRenderingContext2D,
    initiallevel: number,
    lifesCount: number
  ) {
    this.canvas = canvas

    this.BrickWidthComputed =
      (this.canvas.width - WallSize * 2 - BrickGap * 9) / 10

    this.context = context
    this.bricks = []
    this.paddle = new Paddle(canvas)
    this.ball = new Ball(canvas)
    this.level = initiallevel
    this.drawer = new Drawer(
      this.context,
      this.canvas,
      this.ball,
      this.paddle,
      this.bricks
    )
    this.gameInProgress = false
    this.score = 0
    this._lifesCount = lifesCount
    this.lifesCount = this._lifesCount
  }
  /**
   * Пописки на события игры
   */

  // Очки
  subscribeToScore(callback: (score: number) => void) {
    this.scoreSubscribers.add(callback)
  }

  unsubscribeFromScore(callback: (score: number) => void) {
    this.scoreSubscribers.delete(callback)
  }

  notifyScoreSubscribers() {
    this.scoreSubscribers.forEach(callback => callback(this.score))
  }
  // Жизни
  subscribeToLifesCount(callback: (lifesCount: number) => void) {
    this.lifeCountSubsribers.add(callback)
  }

  unsubscribeFromLifesCount(callback: (lifesCount: number) => void) {
    this.lifeCountSubsribers.delete(callback)
  }

  notifyLifesSubscribers() {
    this.lifeCountSubsribers.forEach(callback => callback(this.lifesCount))
  }

  // ---------------------------------------------

  restart() {
    this.destroy()
    this.bricks = []
    this.paddle = new Paddle(this.canvas)
    this.ball = new Ball(this.canvas)
    this.drawer = new Drawer(
      this.context,
      this.canvas,
      this.ball,
      this.paddle,
      this.bricks
    )
    this.gameInProgress = false
    this.score = 0
    this.lifesCount = this._lifesCount
    this.scoreSubscribers = new Set<(score: number) => void>()
    this.lifeCountSubsribers = new Set<(lifesCount: number) => void>()
    this.init()
  }

  init() {
    this.createBricks(this.BrickWidthComputed)
    this.loop()
    this.addEventListeners()
  }

  destroy() {
    this.removeEventListeners()
  }

  createBricks(BrickWidthComputed: number) {
    const currentLevel = levels[this.level]
    for (let row = 0; row < currentLevel.length; row++) {
      for (let col = 0; col < currentLevel[row].length; col++) {
        const colorCode = currentLevel[row][col]
        const brickCode = currentLevel[row][col]

        this.bricks.push({
          x: WallSize + (BrickWidthComputed + BrickGap) * col,
          y: WallSize + (BrickHeight + BrickGap) * row,
          color: colorMap[colorCode],
          width: BrickWidthComputed,
          scoreVal: brickScoresMap[brickCode],
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
        this.score += this.bricks[i].scoreVal
        this.notifyScoreSubscribers()

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
    // Выход шарика за пределы поля
    if (this.ball.y > this.canvas.height) {
      this.gameInProgress = false
      this.geturnBallToPlatfom()
      this.lifesCount--
      this.notifyLifesSubscribers()
    }
    // Проверяем боковые границы
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
    // Обарабатываем столкновение платфоры с боковыми границами
    if (this.paddle.x < WallSize) {
      this.paddle.x = WallSize
    } else if (
      this.paddle.x + this.paddle.width >=
      this.canvas.width - WallSize
    ) {
      this.paddle.x = this.canvas.width - WallSize - this.paddle.width
    }
    this.paddle.update()
    this.ball.update()

    this.draw()
  }
  // Возвращаем шарик на платформу
  geturnBallToPlatfom() {
    this.ball.x = this.paddle.x + this.paddle.dx + this.paddle.width / 2
    this.ball.y = this.paddle.y - this.paddle.height - 1
    this.ball.dx = 0
    this.ball.dy = 0
  }

  draw() {
    this.drawer.draw()
  }

  keydownListener = (e: KeyboardEvent) => {
    if (['ArrowLeft', 'ArrowRight'].includes(e.key)) {
      e.preventDefault()
    }

    if (e.key === 'ArrowLeft') {
      this.paddle.dx = -3
      // Если игра остановлена, то при движении платформы обновляем положение мячика
      if (!this.gameInProgress) {
        this.geturnBallToPlatfom()
      }
    } else if (e.key === 'ArrowRight') {
      this.paddle.dx = 3
      // Если игра остановлена, то при движении платформы обновляем положение мячика
      if (!this.gameInProgress) {
        this.geturnBallToPlatfom()
      }
    }

    if (e.key === ' ') {
      if (this.ball.dx === 0 && this.ball.dy === 0) {
        // При нажатии пробела нужно убедитсья что мячик на платформе
        if (!this.gameInProgress) {
          this.geturnBallToPlatfom()
          this.gameInProgress = true
        }
        this.ball.dx = this.ball.speed
        this.ball.dy = this.ball.speed
        this.paddle.update()
      }
    }
  }

  keyupListener = (e: KeyboardEvent) => {
    if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
      this.paddle.dx = 0
    }
  }

  addEventListeners() {
    document.addEventListener('keydown', this.keydownListener)
    document.addEventListener('keyup', this.keyupListener)
  }
  removeEventListeners() {
    document.removeEventListener('keydown', this.keydownListener)
    document.removeEventListener('keyup', this.keyupListener)
  }
}
