export class Tooltip {
  x: number
  y: number
  text: string
  duration: number // продолжительность отображения в миллисекундах
  startTime: number // время начала отображения
  active: boolean // флаг активности подсказки

  constructor(x: number, y: number, text: string, duration: number) {
    this.x = x
    this.y = y
    this.text = text
    this.duration = duration
    this.startTime = Date.now()
    this.active = true
  }

  draw(context: CanvasRenderingContext2D) {
    if (Date.now() - this.startTime < this.duration) {
      context.font = '14px Arial'
      context.fillStyle = 'black'
      context.fillText(this.text, this.x, this.y)
    } else {
      this.active = false
    }
  }
}
