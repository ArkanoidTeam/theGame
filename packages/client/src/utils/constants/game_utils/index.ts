export const brickProps: { [key: string]: Record<string, string | number> } = {
  I: { color: '#1d3557', durability: Infinity },
  R: { color: '#e63946', durability: 4 },
  O: { color: '#457b9d', durability: 3 },
  Y: { color: '#a8dadc', durability: 2 },
  G: { color: '#bde0fe', durability: 1 },
}

export const brickScoresMap: { [key: string]: number } = {
  R: 40,
  O: 30,
  Y: 20,
  G: 10,
}

export const WallSize = 10

export const BrickParams = {
  gap: 10,
  width: 50,
  height: 20,
  borderRadius: 5,
}

export const BallParams = {
  size: 16,
  speed: 3,
  color: '#273443',
  power: 1,
}

export const PaddleParams = {
  width: 100,
  height: 10,
  color: '#777777',
  speed: 4,
}
