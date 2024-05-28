import { FC, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@mui/material'
import { Container } from './styled'
import { level1 } from '../../utils/constants/levels'
import {
  brickGap,
  brickHeight,
  brickWidth,
  colorMap,
  wallSize,
} from '../../utils/constants/game_utils'
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

const Arkanoid: FC = () => {
  const navigate = useNavigate()
  const handleClick = () => {
    navigate('/') // путь к странице, на которую вы хотите перейти
  }

  const bricks: Brick[] = [] // Declare the type of bricks explicitly

  const canvasRef = useRef<HTMLCanvasElement>(null)
  useEffect(() => {
    const canvas = canvasRef.current as HTMLCanvasElement
    if (!canvas) {
      console.error('Canvas element not found')
      return
    }

    const context = canvas.getContext('2d') as CanvasRenderingContext2D
    // создадим уровень так: обработаем весь массив level1
    // и те места, которые обозначены каким-либо цветом, поместим в игровой массив.
    // там же будем хранить координаты начала каждого кирпича и его цвет

    // пока у нас есть необработанные элементы в массиве с уровнем — обрабатываем их
    for (let row = 0; row < level1.length; row++) {
      for (let col = 0; col < level1[row].length; col++) {
        // находим цвет кирпича
        const colorCode = level1[row][col]

        // создаём новый элемент игрового массива — с координатами кирпича, цветом, шириной и высотой кирпича
        bricks.push({
          x: wallSize + (brickWidth + brickGap) * col,
          y: wallSize + (brickHeight + brickGap) * row,
          color: colorMap[colorCode],
          width: brickWidth,
          height: brickHeight,
        })
      }
    }

    // платформа, которой управляет игрок
    const paddle = {
      // ставим её внизу по центру поля
      x: canvas.width / 2 - brickWidth / 2,
      y: 440,
      // делаем её размером с кирпич
      width: brickWidth,
      height: brickHeight,

      // пока платформа никуда не движется, поэтому направление движения равно нулю
      dx: 0,
    }

    // шарик, который отскакивает от платформы и уничтожает кирпичи
    const ball = {
      // стартовые координаты
      x: 130,
      y: 260,
      // высота и ширина (для простоты это будет квадратный шарик)
      width: 5,
      height: 5,

      // скорость шарика по обеим координатам
      speed: 2,

      // на старте шарик пока никуда не смещается
      dx: 0,
      dy: 0,
    }

    // проверка на пересечение объектов
    // взяли отсюда: https://developer.mozilla.org/en-US/docs/Games/Techniques/2D_collision_detection
    function collides(obj1: CollidableObject, obj2: CollidableObject) {
      return (
        obj1.x < obj2.x + obj2.width &&
        obj1.x + obj1.width > obj2.x &&
        obj1.y < obj2.y + obj2.height &&
        obj1.y + obj1.height > obj2.y
      )
    }

    // главный цикл игры
    function loop() {
      // на каждом кадре — очищаем поле и рисуем всё заново
      requestAnimationFrame(loop)
      context.clearRect(0, 0, canvas.width, canvas.height)

      // двигаем платформу с нужной скоростью
      paddle.x += paddle.dx

      // при этом смотрим, чтобы она не уехала за стены
      if (paddle.x < wallSize) {
        paddle.x = wallSize
      } else if (paddle.x + brickWidth > canvas.width - wallSize) {
        paddle.x = canvas.width - wallSize - brickWidth
      }

      // шарик тоже двигается со своей скоростью
      ball.x += ball.dx
      ball.y += ball.dy

      // и его тоже нужно постоянно проверять, чтобы он не улетел за границы стен
      // смотрим левую и правую стенки
      if (ball.x < wallSize) {
        ball.x = wallSize
        ball.dx *= -1
      } else if (ball.x + ball.width > canvas.width - wallSize) {
        ball.x = canvas.width - wallSize - ball.width
        ball.dx *= -1
      }
      // проверяем верхнюю границу
      if (ball.y < wallSize) {
        ball.y = wallSize
        ball.dy *= -1
      }

      // перезагружаем шарик, если он улетел вниз, за край игрового поля
      if (ball.y > canvas.height) {
        ball.x = 130
        ball.y = 260
        ball.dx = 0
        ball.dy = 0
      }

      // проверяем, коснулся ли шарик платформы, которой управляет игрок. Если коснулся — меняем направление движения шарика по оси Y на противоположное
      if (collides(ball, paddle)) {
        ball.dy *= -1

        // сдвигаем шарик выше платформы, чтобы на следующем кадре это снова не засчиталось за столкновение
        ball.y = paddle.y - ball.height
      }

      // проверяем, коснулся ли шарик цветного кирпича
      // если коснулся — меняем направление движения шарика в зависимости от стенки касания
      // для этого в цикле проверяем каждый кирпич на касание
      for (let i = 0; i < bricks.length; i++) {
        // берём очередной кирпич
        const brick = bricks[i]

        // если было касание
        if (collides(ball, brick)) {
          // убираем кирпич из массива
          bricks.splice(i, 1)

          // если шарик коснулся кирпича сверху или снизу — меняем направление движения шарика по оси Y
          if (
            ball.y + ball.height - ball.speed <= brick.y ||
            ball.y >= brick.y + brick.height - ball.speed
          ) {
            ball.dy *= -1
          }
          // в противном случае меняем направление движения шарика по оси X
          else {
            ball.dx *= -1
          }
          // как нашли касание — сразу выходим из цикла проверки
          break
        }
      }

      // рисуем стены
      context.fillStyle = 'lightgrey'
      context.fillRect(0, 0, canvas.width, wallSize)
      context.fillRect(0, 0, wallSize, canvas.height)
      context.fillRect(canvas.width - wallSize, 0, wallSize, canvas.height)

      // если шарик в движении — рисуем его
      if (ball.dx || ball.dy) {
        context.fillRect(ball.x, ball.y, ball.width, ball.height)
      }

      // рисуем кирпичи
      bricks.forEach(function (brick: Brick) {
        context.fillStyle = brick.color
        context.fillRect(brick.x, brick.y, brick.width, brick.height)
      })

      // рисуем платформу
      context.fillStyle = 'cyan'
      context.fillRect(paddle.x, paddle.y, paddle.width, paddle.height)
    }

    document.addEventListener('keydown', function (e) {
      // arrow left
      if (e.key === 'ArrowLeft') {
        paddle.dx = -3
      }
      // arrow right
      else if (e.key === 'ArrowRight') {
        paddle.dx = 3
      }

      // handle spacebar
      // if the ball is not launched, launch it from the starting point, from the top downwards
      if (ball.dx === 0 && ball.dy === 0 && e.key === ' ') {
        ball.dx = ball.speed
        ball.dy = ball.speed
      }
    })

    // stop the paddle as soon as the player stops pressing the arrow keys
    document.addEventListener('keyup', function (e) {
      if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
        paddle.dx = 0
      }
    })

    // запускаем игру
    requestAnimationFrame(loop)
  }, [])
  return (
    <Container>
      <canvas width="400" height="500" id="game" ref={canvasRef} />
    </Container>
  )
}

export default Arkanoid
