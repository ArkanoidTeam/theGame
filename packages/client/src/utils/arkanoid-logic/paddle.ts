import { PaddleParams, WallSize } from '../constants/game_utils'
export class Paddle {
  canvas: HTMLCanvasElement
  x: number
  y: number
  width: number
  height: number
  dx: number
  speed: number
  color: string

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas
    this.width = PaddleParams.width
    this.height = PaddleParams.height
    this.x = canvas.width / 2 - this.width / 2
    this.y = canvas.height - WallSize - this.height
    this.dx = 0
    this.speed = PaddleParams.speed
    this.color = PaddleParams.color
  }

  restore() {
    this.width = 100
    this.height = 10
    this.x = this.canvas.width / 2 - this.width / 2
    this.y = this.canvas.height - WallSize - this.height
    this.dx = 0
  }

  update() {
    this.x += this.dx
  }

  activateBonus(name: 'width' | 'speed', value: number, time: number) {
    this[name] = this[name] * value
    setTimeout(() => (this[name] = PaddleParams[name]), time)
  }

  activatePointerLock() {
    if (this.canvas.requestPointerLock) {
      this.canvas.requestPointerLock()
    } else {
      console.warn('Pointer Lock API is not supported by this browser.')
    }
  }

  deactivatePointerLock() {
    if (document.exitPointerLock) {
      document.exitPointerLock()
    } else {
      console.warn('Pointer Lock API is not supported by this browser.')
    }
  }

  handleMouseMove = (event: MouseEvent) => {
    if (document.pointerLockElement === this.canvas) {
      this.x += event.movementX
      // Ограничение движения платформы границами канваса
      this.x = Math.max(
        WallSize,
        Math.min(this.x, this.canvas.width - this.width - WallSize)
      )
    }
  }

  handleMouseClick = () => {
    if (document.pointerLockElement !== this.canvas) {
      this.activatePointerLock()
    }
  }

  addPointerLockEventListeners() {
    this.canvas.addEventListener('click', this.handleMouseClick)
    document.addEventListener('mousemove', this.handleMouseMove)
  }

  removePointerLockEventListeners() {
    this.canvas.removeEventListener('click', this.handleMouseClick)
    document.removeEventListener('mousemove', this.handleMouseMove)
  }
}
