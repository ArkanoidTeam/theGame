import { BrickParams, WallSize } from '../constants/game_utils'
import { levels, type Bonus } from '../constants/levels'
import { Ball } from './ball'
import { Drawer } from './drawer'
import { Paddle } from './paddle'
import { Brick } from './brick'
import { Tooltip } from './tooltip'

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
  brickWidthComputed: number
  gameInProgress: boolean
  score: number
  // Множитель очков, умножает выбитые очки если активен бонус увеличения очков
  scoreMultiplier = 1
  scoreSubscribers = new Set<(score: number) => void>()
  lifeCountSubsribers = new Set<(lifesCount: number) => void>()
  lifesCount: number
  _lifesCount: number
  private animationFrameId: number | null = null
  tooltips: Tooltip[] = [] // Массив для хранения активных подсказок

  constructor(
    canvas: HTMLCanvasElement,
    context: CanvasRenderingContext2D,
    initiallevel: number,
    lifesCount: number
  ) {
    this.canvas = canvas

    this.brickWidthComputed =
      (this.canvas.width - WallSize * 2 - BrickParams.gap * 9) / 10

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
      this.bricks,
      this.tooltips
    )
    this.gameInProgress = false
    this.score = 0
    this._lifesCount = lifesCount
    this.lifesCount = this._lifesCount

    // Установка размера канваса при инициализации
    this.resizeCanvas()

    // Добавляем обработчик события изменения размера окна
    window.addEventListener('resize', () => this.resizeCanvas())
  }

  addTooltip(x: number, y: number, text: string) {
    this.tooltips.push(new Tooltip(x, y, text, 2000)) // Продолжительность отображения 2 секунды
  }

  removeInactiveTooltips() {
    this.tooltips = this.tooltips.filter(tooltip => tooltip.active)
  }

  resizeCanvas() {
    // Подгоняем канвас под размеры родительского контейнера
    const parent = this.canvas.parentElement
    if (parent) {
      const style = getComputedStyle(parent)
      const paddingLeft = parseFloat(style.paddingLeft)
      const paddingRight = parseFloat(style.paddingRight)
      const paddingTop = parseFloat(style.paddingTop)
      const paddingBottom = parseFloat(style.paddingBottom)

      const width = parent.clientWidth - paddingLeft - paddingRight
      const height = parent.clientHeight - paddingTop - paddingBottom

      this.canvas.width = width - 1
      this.canvas.height = height - 1
      this.brickWidthComputed =
        (this.canvas.width - WallSize * 2 - BrickParams.gap * 9) / 10

      // Пересчёт всех игровых объектов
      this.updateGameObjects()
    }
  }

  updateGameObjects() {
    // Пересчитываем размеры и позиции игровых объектов на канвасе
    this.updateBricks()
    this.paddle.restore()
    this.returnBallToPlatfom()
  }

  /**
   * Подписки на события игры
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
    // Отменяем предыдущий анимационный кадр
    if (this.animationFrameId !== null) {
      cancelAnimationFrame(this.animationFrameId)
      this.animationFrameId = null
    }

    this.destroy()
    this.bricks = []
    this.paddle = new Paddle(this.canvas)
    this.ball = new Ball(this.canvas)
    this.drawer = new Drawer(
      this.context,
      this.canvas,
      this.ball,
      this.paddle,
      this.bricks,
      this.tooltips
    )
    this.gameInProgress = false
    this.score = 0
    this.scoreMultiplier = 1
    this.lifesCount = this._lifesCount
    this.scoreSubscribers = new Set<(score: number) => void>()
    this.lifeCountSubsribers = new Set<(lifesCount: number) => void>()
    this.init()
  }

  init() {
    this.createBricks(this.brickWidthComputed)
    this.loop()
    this.addEventListeners()
  }

  destroy() {
    this.removeEventListeners()
  }

  createBricks(brickWidthComputed: number) {
    const currentLevel = levels[this.level]
    for (let row = 0; row < currentLevel.length; row++) {
      for (let col = 0; col < currentLevel[row].length; col++) {
        const brickCode = currentLevel[row][col].brickCode as string
        const brickBonus = currentLevel[row][col].brickBonus as Bonus
        this.bricks.push(
          new Brick({
            x: WallSize + (brickWidthComputed + BrickParams.gap) * col,
            y: WallSize + (BrickParams.height + BrickParams.gap) * row,
            width: brickWidthComputed,
            height: BrickParams.height,
            brickCode,
            brickBonus,
          })
        )
      }
    }
  }

  updateBricks() {
    // Пересчёт позиций и размеров всех кирпичей при ресайзе
    const currentLevel = levels[this.level]
    let brickIndex = 0

    for (let row = 0; row < currentLevel.length; row++) {
      for (let col = 0; col < currentLevel[row].length; col++) {
        const brick = this.bricks[brickIndex]
        if (brick) {
          brick.x = WallSize + (this.brickWidthComputed + BrickParams.gap) * col
          brick.y = WallSize + (BrickParams.height + BrickParams.gap) * row
          brick.width = this.brickWidthComputed
          brick.height = BrickParams.height
        }
        brickIndex++
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
    // Запоминаем идентификатор анимационного кадра
    this.animationFrameId = requestAnimationFrame(() => this.loop())
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

      if (brick.visible) {
        // если было касание
        if (this.collides(this.ball, brick)) {
          // Уменьшаем прочность кирпича при столкновении
          brick.durability -= this.ball.power

          // Удаляем кирпич из массива, если его прочность достигла нуля
          if (brick.durability <= 0) {
            // Делаем шарик невидимым
            brick.visible = false
            // Обрабатываем бонусы если есть
            if (brick.bonus) {
              console.log(brick.bonus)
              const { entity, property, value, time } = brick.bonus
              if (entity === 'brick') {
                if (property === 'score') {
                  this.scoreMultiplier *= value
                  setTimeout(() => {
                    this.scoreMultiplier = 1
                  }, time)
                }
              }
              if (entity === 'paddle') {
                this.paddle.activateBonus(
                  property as 'width' | 'speed',
                  value,
                  time as number
                )
              }
              if (brick.bonus.entity === 'ball') {
                if (property === 'speed') {
                  // Запоминаем предыдущие значения
                  const dx = this.ball.dx
                  const dy = this.ball.dy
                  this.ball.dx *= value
                  this.ball.dy *= value
                  setTimeout(() => {
                    // Возвращаем предыдущие значения
                    this.ball.dx = dx
                    this.ball.dy = dy
                  }, time)
                }
                this.ball.activateBonus(
                  property as 'power',
                  value,
                  time as number
                )
              }
              if (brick.bonus.entity === 'game') {
                if (property === 'lifesCount') {
                  this.lifesCount += value
                  this.notifyLifesSubscribers()
                }
              }
            }
            const score = this.bricks[i].scoreVal * this.scoreMultiplier
            // Увеличиваем очки и оповещаем слушателей
            this.score += score
            // Добавляем подсказку с количеством очков
            this.addTooltip(brick.x, brick.y, `+${score}`)
            this.notifyScoreSubscribers()
          }

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
    }
    // Выход шарика за пределы поля
    if (this.ball.y > this.canvas.height) {
      this.gameInProgress = false
      this.returnBallToPlatfom()
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
      if (!this.gameInProgress) {
        this.returnBallToPlatfom()
      }
    } else if (
      this.paddle.x + this.paddle.width >=
      this.canvas.width - WallSize
    ) {
      this.paddle.x = this.canvas.width - WallSize - this.paddle.width - 1
      if (!this.gameInProgress) {
        this.returnBallToPlatfom()
      }
    }
    this.paddle.update()
    this.ball.update()

    this.draw()
  }
  // Возвращаем шарик на платформу
  returnBallToPlatfom() {
    this.ball.x = this.paddle.x + this.paddle.width / 2 - this.ball.width / 2
    this.ball.y = this.paddle.y - this.paddle.height - 1
    this.ball.dx = 0
    this.ball.dy = 0
  }

  draw() {
    this.drawer.draw()
  }

  keydownListener = (e: KeyboardEvent) => {
    const { key } = e

    if (['ArrowLeft', 'ArrowRight'].includes(key)) {
      e.preventDefault()
    }

    if (this.lifesCount > 0) {
      if (key === 'ArrowLeft') {
        this.paddle.dx = -this.paddle.speed
        // Если игра остановлена, то при движении платформы обновляем положение мячика
        if (!this.gameInProgress) {
          this.ball.dx = -this.paddle.speed
        }
      } else if (key === 'ArrowRight') {
        this.paddle.dx = this.paddle.speed
        // Если игра остановлена, то при движении платформы обновляем положение мячика
        if (!this.gameInProgress) {
          this.ball.dx = this.paddle.speed
        }
      }
      if (key === ' ') {
        if (this.ball.dx === 0 && this.ball.dy === 0) {
          // При нажатии пробела нужно убедитсья что мячик на платформе
          if (!this.gameInProgress) {
            this.returnBallToPlatfom()
            this.gameInProgress = true
          }
          this.ball.dx = this.ball.speed
          this.ball.dy = this.ball.speed
          this.paddle.update()
        }
      }
    }
  }

  keyupListener = (e: KeyboardEvent) => {
    const { key } = e
    if (key === 'ArrowLeft' || key === 'ArrowRight') {
      this.paddle.dx = 0
      if (!this.gameInProgress) {
        this.ball.dx = 0
        this.returnBallToPlatfom()
      }
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
