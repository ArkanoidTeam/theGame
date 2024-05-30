export class Ball {
  canvas: HTMLCanvasElement
  x: number
  y: number
  dx: number
  dy: number
  width: number
  height: number
  speed: number

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas
    this.width = 10
    this.height = 10
    this.x = canvas.width / 2 - this.width / 2
    this.y = canvas.height - 40
    this.dx = 0
    this.dy = 0
    this.speed = 2
  }

  update() {
    this.x += this.dx
    this.y += this.dy
  }
}
