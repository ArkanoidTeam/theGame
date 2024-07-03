export const brickProps: { [key: string]: Record<string, string | number> } = {
  I: { color: '#949494', durability: Infinity },
  R: { color: '#FF3E3E', durability: 4 },
  O: { color: '#F28A4F', durability: 3 },
  Y: { color: '#E3E800', durability: 2 },
  G: { color: '#4FC95C', durability: 1 },
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
