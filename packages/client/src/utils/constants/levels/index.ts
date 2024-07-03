import { Value } from 'sass'

export type Bonus = {
  entity: string
  property: string
  value: number
  time?: number
}
interface Levels {
  [key: number]: Record<string, string | Bonus | null>[][]
}

const bonuses = {
  paddle: [
    {
      entity: 'paddle',
      property: 'width',
      value: 2,
      time: 5000,
    },
    {
      entity: 'paddle',
      property: 'speed',
      value: 2,
      time: 5000,
    },
  ],
  ball: [
    {
      entity: 'ball',
      property: 'power',
      value: 2,
      time: 10000,
    },
    {
      entity: 'ball',
      property: 'speed',
      value: 1.2,
      time: 2000,
    },
  ],
  game: [
    {
      entity: 'game',
      property: 'lifesCount',
      value: 1,
    },
  ],
  brick: [
    {
      entity: 'brick',
      property: 'score',
      value: 2,
      time: 5000,
    },
  ],
}

const level1 = [
  [],
  [],
  [],
  [
    { brickCode: 'G', brickBonus: null },
    { brickCode: 'Y', brickBonus: null },
    { brickCode: 'R', brickBonus: null },
    { brickCode: 'G', brickBonus: null },
    { brickCode: 'O', brickBonus: bonuses.ball[0] },
    { brickCode: 'R', brickBonus: null },
    { brickCode: 'G', brickBonus: null },
    { brickCode: 'R', brickBonus: null },
    { brickCode: 'Y', brickBonus: null },
    { brickCode: 'G', brickBonus: bonuses.game[0] },
  ],
  [
    { brickCode: 'Y', brickBonus: null },
    { brickCode: 'O', brickBonus: null },
    { brickCode: 'O', brickBonus: bonuses.brick[0] },
    { brickCode: 'Y', brickBonus: null },
    { brickCode: 'O', brickBonus: null },
    { brickCode: 'Y', brickBonus: null },
    { brickCode: 'Y', brickBonus: bonuses.ball[0] },
    { brickCode: 'G', brickBonus: null },
    { brickCode: 'Y', brickBonus: null },
    { brickCode: 'G', brickBonus: null },
  ],

  [
    { brickCode: 'G', brickBonus: bonuses.paddle[0] },
    { brickCode: 'Y', brickBonus: null },
    { brickCode: 'O', brickBonus: null },
    { brickCode: 'G', brickBonus: null },
    { brickCode: 'O', brickBonus: bonuses.game[0] },
    { brickCode: 'Y', brickBonus: null },
    { brickCode: 'G', brickBonus: null },
    { brickCode: 'R', brickBonus: null },
    { brickCode: 'R', brickBonus: null },
    { brickCode: 'O', brickBonus: bonuses.ball[0] },
  ],
  [
    { brickCode: 'I', brickBonus: null },
    { brickCode: 'R', brickBonus: null },
    { brickCode: 'O', brickBonus: bonuses.game[0] },
    { brickCode: 'I', brickBonus: null },
    { brickCode: 'O', brickBonus: null },
    { brickCode: 'Y', brickBonus: null },
    { brickCode: 'R', brickBonus: bonuses.ball[0] },
    { brickCode: 'G', brickBonus: null },
    { brickCode: 'G', brickBonus: null },
    { brickCode: 'G', brickBonus: null },
  ],
  [
    { brickCode: 'R', brickBonus: bonuses.ball[0] },
    { brickCode: 'Y', brickBonus: null },
    { brickCode: 'R', brickBonus: null },
    { brickCode: 'G', brickBonus: bonuses.game[0] },
    { brickCode: 'R', brickBonus: null },
    { brickCode: 'O', brickBonus: bonuses.paddle[0] },
    { brickCode: 'G', brickBonus: null },
    { brickCode: 'O', brickBonus: bonuses.brick[0] },
    { brickCode: 'Y', brickBonus: null },
    { brickCode: 'R', brickBonus: null },
  ],
  [
    { brickCode: 'G', brickBonus: null },
    { brickCode: 'Y', brickBonus: null },
    { brickCode: 'O', brickBonus: bonuses.brick[0] },
    { brickCode: 'I', brickBonus: null },
    { brickCode: 'O', brickBonus: bonuses.paddle[0] },
    { brickCode: 'Y', brickBonus: null },
    { brickCode: 'R', brickBonus: bonuses.ball[0] },
    { brickCode: 'G', brickBonus: null },
    { brickCode: 'Y', brickBonus: bonuses.game[0] },
    { brickCode: 'O', brickBonus: null },
  ],
  [
    { brickCode: 'G', brickBonus: bonuses.ball[0] },
    { brickCode: 'G', brickBonus: null },
    { brickCode: 'G', brickBonus: null },
    { brickCode: 'R', brickBonus: bonuses.paddle[0] },
    { brickCode: 'G', brickBonus: null },
    { brickCode: 'G', brickBonus: null },
    { brickCode: 'G', brickBonus: bonuses.paddle[1] },
    { brickCode: 'G', brickBonus: null },
    { brickCode: 'G', brickBonus: null },
    { brickCode: 'G', brickBonus: bonuses.brick[0] },
  ],
  [],
  [],
  [],
  [],
  [],
]
const level2 = [[], [], [], [], [], [], [], [], [], [], [], [], [], []]

export const levels: Levels = {
  1: level1,
  2: level2,
} as const
