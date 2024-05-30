export class Paddle {
  canvas: HTMLCanvasElement
  x: number
  y: number
  width: number
  height: number
  dx: number

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas
    this.width = 100
    this.height = 10
    this.x = canvas.width / 2 - this.width / 2
    this.y = canvas.height - this.height
    this.dx = 0
  }

  update() {
    this.x += this.dx
  }
}
