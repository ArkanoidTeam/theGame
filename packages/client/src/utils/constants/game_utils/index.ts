export const brickProps: { [key: string]: Record<string, string | number> } = {
  I: { color: 'grey', durability: Infinity },
  R: { color: 'red', durability: 4 },
  O: { color: 'orange', durability: 3 },
  G: { color: 'green', durability: 2 },
  Y: { color: 'yellow', durability: 1 },
}
export const brickScoresMap: { [key: string]: number } = {
  R: 40,
  O: 30,
  G: 20,
  Y: 10,
}
// делаем зазор в 2 пикселя между кирпичами, чтобы отделить их друг от друга
export const BrickGap = 10
// размеры каждого кирпича
export const BrickWidth = 25
export const BrickHeight = 12

export const WallSize = 10
