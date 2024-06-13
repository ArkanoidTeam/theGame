import { Game } from './game'

jest.mock('./paddle')
jest.mock('./ball')
jest.mock('./drawer')

describe('Game', () => {
  let canvas: HTMLCanvasElement
  let context: CanvasRenderingContext2D
  let game: Game

  beforeEach(() => {
    canvas = document.createElement('canvas')
    context = canvas.getContext('2d') as CanvasRenderingContext2D
    game = new Game(canvas, context, 0, 3)
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('должен инициализироваться с правильными значениями', () => {
    expect(game.canvas).toBe(canvas)
    expect(game.context).toBe(context)
    expect(game.level).toBe(0)
    expect(game.lifesCount).toBe(3)
    expect(game.score).toBe(0)
    expect(game.gameInProgress).toBe(false)
  })

  it('должен корректно подписываться и отписываться от изменения очков', () => {
    const callback = jest.fn()

    game.subscribeToScore(callback)
    game.score = 10
    game.notifyScoreSubscribers()
    expect(callback).toHaveBeenCalledWith(10)

    game.unsubscribeFromScore(callback)
    game.score = 20
    game.notifyScoreSubscribers()
    expect(callback).toHaveBeenCalledTimes(1)
  })

  it('должен корректно подписываться и отписываться от изменения количества жизней', () => {
    const callback = jest.fn()

    game.subscribeToLifesCount(callback)
    game.lifesCount = 2
    game.notifyLifesSubscribers()
    expect(callback).toHaveBeenCalledWith(2)

    game.unsubscribeFromLifesCount(callback)
    game.lifesCount = 1
    game.notifyLifesSubscribers()
    expect(callback).toHaveBeenCalledTimes(1)
  })

  it('должен корректно проверять столкновения', () => {
    const obj1 = { x: 0, y: 0, width: 10, height: 10 }
    const obj2 = { x: 5, y: 5, width: 10, height: 10 }
    const obj3 = { x: 20, y: 20, width: 10, height: 10 }

    expect(game.collides(obj1, obj2)).toBe(true)
    expect(game.collides(obj1, obj3)).toBe(false)
  })

  it('должен корректно добавлять и удалять обработчики событий', () => {
    const addEventListenerSpy = jest.spyOn(document, 'addEventListener')
    const removeEventListenerSpy = jest.spyOn(document, 'removeEventListener')

    game.addEventListeners()
    expect(addEventListenerSpy).toHaveBeenCalledTimes(2)

    game.removeEventListeners()
    expect(removeEventListenerSpy).toHaveBeenCalledTimes(2)

    addEventListenerSpy.mockRestore()
    removeEventListenerSpy.mockRestore()
  })
})
