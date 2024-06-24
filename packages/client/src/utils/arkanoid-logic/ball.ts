import { BallParams } from '../constants/game_utils'

export class Ball {
  canvas: HTMLCanvasElement
  x: number
  y: number
  dx: number
  dy: number
  width: number
  height: number
  speed: number
  color: string
  power: number

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas
    this.width = BallParams.size
    this.height = BallParams.size
    this.x = canvas.width / 2 - this.width / 2
    this.y = canvas.height - this.height
    this.dx = 0
    this.dy = 0
    this.speed = BallParams.speed
    this.color = BallParams.color
    this.power = BallParams.power
  }

  update() {
    this.x += this.dx
    this.y += this.dy
  }

  activateBonus(name: 'power', value: number, time: number) {
    this[name] = this[name] * value
    setTimeout(() => (this[name] = BallParams[name]), time)
  }
}
