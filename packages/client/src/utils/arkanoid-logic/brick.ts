import { brickProps } from '../constants/game_utils'

export class Brick {
  x: number
  y: number
  width: number
  height: number
  scoreVal: number
  private _color: string
  private _durability: number // Прочность
  private _brickCode: string

  constructor(props: Record<string, string | number>) {
    const { x, y, width, height, brickCode } = props
    this.x = x as number
    this.y = y as number
    this.width = width as number
    this.height = height as number

    this._brickCode = brickCode as string
    this._color = brickProps[this._brickCode].color as string
    this._durability = brickProps[this._brickCode].durability as number
    this.scoreVal = this._durability * 10
  }
  get color() {
    return this._color
  }
  get durability() {
    return this._durability
  }
  set durability(value: number) {
    this._durability = value
    if (this._durability > 0) {
      const newBrickKey = Object.entries(brickProps).find(
        ([key, value]) => value.durability === this._durability
      )
      if (newBrickKey) {
        this._color = brickProps[newBrickKey[0]].color as string
      }
    }
  }
  get brickCode() {
    return this._brickCode
  }
}
